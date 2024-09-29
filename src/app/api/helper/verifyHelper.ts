import { db } from '@/drizzle/db';

export const isCompletedTask = async (userId: number, chapterId: number) => {
	const user = await db.query.User.findFirst({
		where: (user, { eq }) => eq(user.id, userId),
		with: {
			userBooks: true,
			userWorks: true,
		},
	});

	const chapter = await db.query.Chapter.findFirst({
		where: (chapter, { eq }) => eq(chapter.id, chapterId),
		with: {
			works: true,
		},
	});

	if (!user || !chapter) {
		return false;
	}

	const isBookComplete = !!user?.userBooks.find(book => book.id == chapter.id);

	const isWorkComplete = user.userWorks.length == chapter.works.length;

	return isBookComplete && isWorkComplete;
};
