import { ChapterType, TeacherChapterType, UserType, db } from '@/drizzle/db';
import { Teacher, TeacherChapter, User } from '@/drizzle/schema';
import { authMiddleware } from '@/lib/middleware';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export type WorkStudentResponse = UserType & {
	teacherChapters: (TeacherChapterType & {
		chapter: ChapterType | null;
	})[];
};

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

	if (user.role != 'user') {
		return NextResponse.json({
			type: 'error',
			message: 'У вас недостаточно прав',
		});
	}

	try {
		const chapters = await db.query.TeacherChapter.findMany({
			where: eq(TeacherChapter.student_id, user.id),
			with: {
				teacher: true,
				student: {
					with: {
						teacherChapters: {
							with: {
								chapter: true,
							},
						},
					},
				},
			},
		});

		const teachers: WorkStudentResponse[] = [];

		chapters.forEach(chap => {
			const teacher: any = chap.teacher;
			teacher.teacherChapters = chap.student.teacherChapters.filter(
				tChap => tChap.teacher_id == user.id
			);
			teachers.push(teacher);
		});

		return NextResponse.json(teachers);
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}
