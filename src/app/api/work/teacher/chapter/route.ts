import { NextRequest, NextResponse } from 'next/server';
import { UserType, db } from '../../../../../drizzle/db';
import { getUser } from '../../../../../lib/authGuardServer';
import { TeacherChapter, User } from '../../../../../drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { authMiddlewareAdmin } from '@/lib/middleware';
import { revalidateTag } from 'next/cache';
import { STUDENT_WITHOUT_GROUP } from '@/types/const/const';
import { isCompletedTask } from '@/app/api/helper/verifyHelper';

export async function GET(req: NextRequest) {}

export type TeacherChapterPostDTO = {
	student_id?: number;
	chapter_id: number;
	group?: string;
	students?: number[];
	description?: string;
	teacher_id: number;
};

export async function POST(req: NextRequest) {
	const {
		student_id,
		chapter_id,
		group,
		students,
		description,
		teacher_id,
	}: TeacherChapterPostDTO = await req.json();

	const user = await db.query.User.findFirst({
		where: and(eq(User.id, teacher_id), eq(User.role, 'admin')),
	});

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не авторизованы',
		});
	}

	try {
		revalidateTag('workTeacher');
		revalidateTag('workStudent');
		const reducer = (acc: Promise<any>[], id: number) => {
			isCompletedTask(id, chapter_id).then(data => {
				acc.push(
					db.insert(TeacherChapter).values({
						teacher_id: user.id,
						chapter_id: chapter_id,
						student_id: id,
						completed: data,
						description,
					})
				);
			});
			return acc;
		};
		if (group) {
			if (group == STUDENT_WITHOUT_GROUP) {
				group == null;
			}
			const students = await db.query.User.findMany({
				where: eq(User.group, group),
			});

			await Promise.all(
				students.map(s => s.id).reduce<Promise<any>[]>(reducer, [])
			);

			return NextResponse.json({
				type: 'success',
				message: 'Группе дано задание',
			});
		} else if (students) {
			await Promise.all(students.reduce<Promise<any>[]>(reducer, []));

			return NextResponse.json({
				type: 'success',
				message: 'Студентом дано задание',
			});
		} else if (student_id) {
			await db.insert(TeacherChapter).values({
				teacher_id: user.id,
				chapter_id: chapter_id,
				student_id: student_id,
				completed: await isCompletedTask(user.id, chapter_id),
				description,
			});

			return NextResponse.json({
				type: 'success',
				message: 'Студенту дано задание',
			});
		}
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}

export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
