import { db } from '@/drizzle/db';
import { Teacher, User } from '@/drizzle/schema';
import { STUDENT_WITHOUT_GROUP } from '@/types/const/const';
import { eq, isNull } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const teacher_id = req.nextUrl.searchParams.get('teacher_id');

	if (!teacher_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр teacher_id',
		});
	}

	const students = await db.query.Teacher.findMany({
		where: (teacher, { eq }) => eq(teacher.teacher_id, +teacher_id),
	});

	return NextResponse.json(students);
}

export type WorkTeacherStudentDTO = {
	student_id?: number;
	group?: string;
	students?: number[];
	teacher_id: number;
};

export async function POST(req: NextRequest) {
	const { teacher_id, group, student_id, students }: WorkTeacherStudentDTO =
		await req.json();

	if (!teacher_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр teacher_id',
		});
	}

	try {
		if (group) {
			let sqlQuery = eq(User.group, group);
			if (group == STUDENT_WITHOUT_GROUP) {
				sqlQuery = isNull(User.group);
			}
			(
				await db.query.User.findMany({
					where: sqlQuery,
				})
			).forEach(async user => {
				await db.insert(Teacher).values({
					student_id: user.id,
					teacher_id,
				});
			});
			return NextResponse.json({
				type: ' success',
				message: `Группа ${group} успешно добавлена`,
			});
		}
		if (students) {
			students.forEach(async userId => {
				await db.insert(Teacher).values({
					student_id: userId,
					teacher_id,
				});
			});
			return NextResponse.json({
				type: ' success',
				message: 'Студенты успешно добавлены',
			});
		}
		if (student_id) {
			await db.insert(Teacher).values({
				student_id,
				teacher_id,
			});
			return NextResponse.json({
				type: ' success',
				message: 'Студент успешно добавлен',
			});
		}

		return NextResponse.json({
			type: 'error',
			message: 'Не пришли параметры',
		});
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}
