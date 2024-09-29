import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { Comment, FeedbackComment, LikesComment } from '@/drizzle/schema';
import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import type {
	FeedbackCommentType,
	UserType,
	LikesCommentType,
} from '@/drizzle/db';

export type FeedbackChapter = FeedbackCommentType & {
	user: UserType;
	feedbackCommentsd?: FeedbackCommentType[];
};

export async function GET(req: NextRequest) {
	const comment_id = req.nextUrl.searchParams.get('comment_id');
	const feedback_id = req.nextUrl.searchParams.get('feedback_id');

	if (feedback_id && feedback_id != 'undefined') {
		const comments = await db.query.FeedbackComment.findMany({
			where: eq(FeedbackComment.feedback_id, +feedback_id),
			orderBy: [desc(FeedbackComment.created_at)],
			with: {
				user: true,
				feedbackComments: true,
			},
		});

		return NextResponse.json(comments);
	}

	if (comment_id && comment_id != 'undefined') {
		const comments = await db.query.FeedbackComment.findMany({
			where: eq(FeedbackComment.comment_id, +comment_id),
			orderBy: [desc(FeedbackComment.created_at)],
			with: {
				user: true,
				feedbackComments: true,
			},
		});

		return NextResponse.json(comments);
	}

	return NextResponse.json([]);
}

export type FeedbackPostDTO = typeof FeedbackComment.$inferInsert;

export async function POST(req: NextRequest) {
	const { content, feedback_id, comment_id, user_id } = await req.json();

	await db.insert(FeedbackComment).values({
		content,
		comment_id,
		feedback_id,
		user_id,
	});

	revalidateTag('feedback');
	revalidateTag('chapter');

	return NextResponse.json({
		type: 'success',
		message: 'Ответ на комментарий успешно создан',
	});
}

export async function PUT(req: NextRequest) {
	const { comment } = await req.json();
	const user: UserType =
		cookies().has('user') && JSON.parse(cookies().get('user')!.value);

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не вошли',
		});
	}

	const commentFind = await db.query.Comment.findFirst({
		where: eq(Comment.id, comment.id),
		with: {
			likesComments: true,
		},
	});

	if (!commentFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Комментарий не найден',
		});
	}

	const likes: LikesCommentType[] = commentFind.likesComments;
	if (likes && likes.length == 0) {
		await db.insert(LikesComment).values({
			comment_id: +commentFind.id,
			user_id: +user.id,
		});
		revalidateTag('chapter');
		revalidateTag('comment');
		return NextResponse.json({
			type: 'message',
			message: 'Лайк добавлен с комментария',
		});
	}

	if (likes && likes.length > 0) {
		await db
			.delete(LikesComment)
			.where(
				and(eq(LikesComment.id, likes[0].id), eq(LikesComment.user_id, user.id))
			);
		revalidateTag('chapter');
		revalidateTag('comment');

		return NextResponse.json({
			type: 'message',
			message: 'Лайк убран с комментария',
		});
	}

	return NextResponse.json({
		type: 'error',
		message: 'Случилось что-то крайне неожиданное',
	});
}

export async function DELETE(req: NextRequest) {
	const comment_id = req.nextUrl.searchParams.get('id');

	if (!comment_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Параметр book_id не пришёл',
		});
	}

	await db.delete(FeedbackComment).where(eq(FeedbackComment.id, +comment_id));

	return NextResponse.json({
		type: 'message',
		message: 'Параметр book_id не пришёл',
	});
}
