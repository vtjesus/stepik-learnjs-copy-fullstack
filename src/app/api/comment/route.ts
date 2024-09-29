import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import {
	db,
	CommentType,
	UserType,
	LikesCommentType,
	FeedbackCommentType,
} from '@/drizzle/db';
import { Comment, LikesComment, User } from '@/drizzle/schema';
import { and, desc, eq } from 'drizzle-orm';

export type CommentChapter = CommentType & {
	user: UserType | null;
	likesComments: LikesCommentType[];
	feedbackComments: FeedbackCommentType[];
};

export async function GET(req: NextRequest) {
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');

	if (!chapter_id) {
		return NextResponse.json([]);
	}

	const comments = await db.query.Comment.findMany({
		where: eq(Comment.chapter_id, +chapter_id),
		with: {
			user: true,
			likesComments: true,
			feedbackComments: true,
		},
		orderBy: [desc(Comment.created_at)],
	});

	return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
	const { comment, chapter_id } = await req.json();

	try {
		await db.insert(Comment).values({
			content: comment.content,
			user_id: +comment.user_id,
			chapter_id: +chapter_id,
		});
		revalidateTag('chapter');
		revalidateTag('comment');
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}

	revalidateTag('analitic');
	revalidateTag('comment');
	return NextResponse.json(null);
}

export async function PUT(req: NextRequest) {
	const { comment } = await req.json();
	const user: typeof User =
		cookies().has('user') && JSON.parse(cookies().get('user')!.value);

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не вошли',
		});
	}

	const commentFind: any = await db.query.Comment.findFirst({
		where: eq(Comment.id, +comment.id),
		with: {
			user: true,
			likesComments: true,
		},
	});

	if (!commentFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Комментарий не найден',
		});
	}

	const likes = commentFind.likesComments;
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

	await db.delete(Comment).where(eq(Comment.id, +comment_id));

	return NextResponse.json({
		type: 'message',
		message: 'Параметр book_id не пришёл',
	});
}
