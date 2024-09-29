'use client';
import React, { FC, memo, useState } from 'react';
import { likeComment } from '@/request/comment';
import { HeartIcon, ThumbsDown, ThumbsUp } from 'lucide-react';
import { getTimeAgo } from '@/lib/time';
import { CommentChapter } from '@/app/api/comment/route';
import { getUser } from '@/lib/authGuardClient';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { InputFeedback } from './InputFeedback';
import { Button } from '@/components/ui/button';
import { CommentType } from '@/drizzle/db';

interface Props {
	chapter_id: number;
	comment: CommentChapter;
}

const ThumbsComment: FC<Props> = memo(({ chapter_id, comment }) => {
	const user = getUser()!;
	const router = useRouter();
	const [isInput, setIsInput] = useState(false);
	const { toast } = useToast();
	const handleLike = async (com: CommentType) => {
		if (!user) {
			toast({
				title: 'Войдите, чтобы оставлять лайки',
			});
			return;
		}
		await likeComment({
			comment: com,
		});
		// router.refresh();
	};

	const isLike =
		comment.likesComments && user
			? comment.likesComments.some(like => like.user_id == user.id)
			: false;

	return (
		<div className='w-full'>
			<div className='flex gap-2 justify-between md:justify-start w-full items-center'>
				<div className='sm:block hidden md:hidden text-muted-foreground w-2/3 text-sm'>
					{getTimeAgo(comment.created_at)}
				</div>
				<div className='flex justify-start items-center gap-1'>
					<HeartIcon
						onClick={() => handleLike(comment)}
						width={16}
						height={16}
						className={`${isLike && 'fill-primary stroke-primary'}`}
					/>
					<div>{comment.likesComments ? comment.likesComments.length : 0}</div>
					{user && (
						<div>
							<Button
								className='px-1 py-1 hover:text-foreground text-foreground'
								variant={'link'}
								onClick={() => setIsInput(prev => !prev)}
							>
								Ответить
							</Button>
						</div>
					)}
				</div>
			</div>
			{isInput && (
				<InputFeedback
					handle={() => setIsInput(false)}
					commentId={comment.id}
				/>
			)}
		</div>
	);
});

ThumbsComment.displayName = 'ThumbsComment';

export { ThumbsComment };
