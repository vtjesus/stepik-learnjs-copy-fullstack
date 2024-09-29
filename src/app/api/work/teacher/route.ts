import { NextRequest, NextResponse } from 'next/server';
import {
	ChapterType,
	TeacherChapterType,
	UserType,
	db,
} from '../../../../drizzle/db';
import { getUser } from '../../../../lib/authGuardServer';
import { Teacher, User } from '../../../../drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { authMiddlewareAdmin } from '@/lib/middleware';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { STUDENT_WITHOUT_GROUP } from '@/types/const/const';

export type UserTeacherChapter = UserType & {
	teacherStudentChapters: (TeacherChapterType & {
		chapter: ChapterType | null;
	})[];
};

export type WorkTeacherResponse = Record<string, UserTeacherChapter[]>;

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр user_id',
		});
	}

	const user = await db.query.User.findFirst({
		where: eq(User.id, +user_id),
	});

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователя не существует',
		});
	}

	if (user.role != 'admin') {
		return NextResponse.json({
			type: 'error',
			message: 'У вас недостаточно прав',
		});
	}

	try {
		const students = (
			await db.query.Teacher.findMany({
				where: eq(Teacher.teacher_id, user.id),
				with: {
					student: {
						with: {
							teacherStudentChapters: {
								with: {
									chapter: true,
								},
							},
						},
					},
				},
			})
		).map(student => student.student);

		const groupStudentsByGroup = students.reduce<WorkTeacherResponse>(
			(acc, el) => {
				if (!el.group && acc[STUDENT_WITHOUT_GROUP]) {
					acc[STUDENT_WITHOUT_GROUP].push(el);
				} else if (!acc[STUDENT_WITHOUT_GROUP]) {
					acc[STUDENT_WITHOUT_GROUP] = [el];
				}
				if (el.group) {
					if (acc[el.group]) {
						acc[el.group].push(el);
					} else {
						acc[el.group] = [el];
					}
				}
				return acc;
			},
			{}
		);

		return NextResponse.json(groupStudentsByGroup);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				type: 'error',
				message: error.message,
			});
		} else {
			return NextResponse.json({
				type: 'error',
				message: error,
			});
		}
	}
}

export type TeacherUserPostDTO = { student_id: number };
export async function POST(req: NextRequest) {
	const { student_id, teacher_id } = await req.json();

	try {
		await db.insert(Teacher).values({
			student_id,
			teacher_id,
		});
		return NextResponse.json({
			type: 'success',
			message: 'Студент зачислен к вам',
		});
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {
	const { student_id } = await req.json();
	const user = authMiddlewareAdmin() as UserType;

	try {
		await db
			.delete(Teacher)
			.where(
				and(eq(Teacher.student_id, student_id), eq(Teacher.teacher_id, user.id))
			);
		return NextResponse.json({
			type: 'success',
			message: 'Студент отчислен от вас',
		});
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}
