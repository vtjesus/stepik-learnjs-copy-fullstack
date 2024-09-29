import { db } from '@/drizzle/db';
import { TeacherChapter } from '@/drizzle/schema';
import { revalidateTag } from 'next/cache';

export const complateTask = async (userId: number, chapterId: number) => {
	const teacherChapter = await db.query.TeacherChapter.findFirst({
		where: (tC, { eq, and }) =>
			and(eq(tC.student_id, userId), eq(tC.chapter_id, chapterId)),
		with: {
			chapter: {
				with: {
					works: true,
				},
			},
			student: {
				with: {
					userBooks: true,
					userWorks: true,
				},
			},
		},
	});

	if (!teacherChapter) {
		throw Error('Для вас нет такого задания');
	}

	if (teacherChapter.completed) {
		return true;
	}

	const user = teacherChapter.student;
	const chapter = teacherChapter.chapter;

	if (!user || !chapter) {
		throw Error('Страницы или пользователя не существует');
	}

	const isBookComplete = user.userBooks.find(
		book => book.chapter_id == chapter.id
	);

	const isWorkComplete = user.userWorks.length == chapter.works.length;

	const isComplete = isBookComplete && isWorkComplete;

	if (!isComplete) {
		return false;
	}
	await db.update(TeacherChapter).set({
		completed: true,
	});

	revalidateTag('workTeacher');
	revalidateTag('workStudent');

	return true;
};
