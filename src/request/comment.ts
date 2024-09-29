import { FeedbackPostDTO } from '@/app/api/comment/feedback/route';
import { CommentChapter } from '@/app/api/comment/route';
import { revalidateTag } from 'next/cache';

export const getCommentsByChapterId = async (
	chapter_id: number
): Promise<CommentChapter[]> => {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment?chapter_id=${chapter_id}`,
		{
			next: { tags: ['comment'] },
		}
	);
	return data.json();
};

export const storeComment = async (comment: any): Promise<CommentChapter> => {
	const responce = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment`,
		{
			body: JSON.stringify(comment),
			method: 'POST',
		}
	);
	return responce.json();
};

export const storeFeedback = async (feedback: FeedbackPostDTO) => {
	const responce = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment/feedback`,
		{
			body: JSON.stringify(feedback),
			method: 'POST',
		}
	);
	return responce.json();
};

export const getFeedbackComment = async (
	commentId?: number,
	feedbackId?: number
) => {
	const responce = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment/feedback?comment_id=${
			commentId ? commentId : ''
		}&feedback_id=${feedbackId ? feedbackId : ''}`,
		{
			next: {
				tags: ['feedback'],
			},
		}
	);
	return responce.json();
};

export const likeComment = async (comment: any) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment`, {
		body: JSON.stringify(comment),
		method: 'PUT',
	});
};

export const deleteComment = async (id: number) => {
	revalidateTag('comment');
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/comment?id=${id}`, {
		method: 'DELETE',
	});
};
