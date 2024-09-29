'use client';

import { FeedbackChapter } from '@/app/api/comment/feedback/route';
import { ButtonLoader } from '@/components/common/ButtonLoader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getTimeAgo } from '@/lib/time';
import { getFeedbackComment } from '@/request/comment';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { InputFeedback } from './InputFeedback';
import { getUser } from '@/lib/authGuardClient';
import { FeedbackCommentType } from '@/drizzle/db';

type Props = {
	feedbackId?: number;
	commentId?: number;
	feedbacks?: FeedbackChapter[];
};

const FeedbackComment = memo(
	({ commentId, feedbackId, feedbacks: fbs }: Props) => {
		const user = getUser()!;
		const [feedbacks, setFeetbacks] = useState<FeedbackChapter[]>(fbs ?? []);
		const [loading, setLoading] = useState(false);
		const [isShow, setIsShow] = useState(false);
		const [isInput, setIsInput] = useState(false);

		useEffect(() => {
			if (fbs) {
				return;
			}
			setLoading(true);
			getFeedbackComment(commentId, feedbackId)
				.then(data => setFeetbacks(data))
				.finally(() => setLoading(false));
		}, [commentId, feedbackId, fbs]);

		return (
			<section className='flex flex-col gap-1 text-[14px]'>
				{(feedbacks.length > 0 || loading) && (
					<div>
						<ButtonLoader
							onClick={() => setIsShow(!isShow)}
							variant={'ghost'}
							loading={loading}
							className='p-1 m-0 h-min -translate-x-[10px]'
						>
							{isShow ? <ChevronUp /> : <ChevronDown />}
							{isShow ? 'скрыть' : 'показать'}
							<span className='ml-1'>{feedbacks.length}</span>
						</ButtonLoader>
					</div>
				)}
				<div>
					{isShow &&
						feedbacks.map(feed => (
							<div className='gap-2 flex p-2 rounded-sm w-full' key={feed.id}>
								<Avatar>
									<AvatarImage
										src={`https://ui-avatars.feed/api/?name=${feed.user.name}`}
									/>
									<AvatarFallback>{feed.user.name}</AvatarFallback>
								</Avatar>
								<div className='w-full'>
									<div className='flex md:justify-start gap-1 items-center'>
										<div className='flex justify-between text-sm md:justify-normal md:gap-4 items-center'>
											{feed.user.name}
										</div>
										<div className='hidden md:block text-muted-foreground text-xs'>
											{getTimeAgo(feed.created_at)}
										</div>
									</div>
									<div className='text-pretty break-words text-sm'>
										{feed.content}
									</div>
									{user && (
										<div>
											<Button
												className='px-1 py-1 hover:text-foreground text-foreground'
												variant={'link'}
												onClick={() => setIsInput(prev => !prev)}
											>
												Ответить
											</Button>{' '}
											{isInput && (
												<InputFeedback
													handle={() => setIsInput(false)}
													feedbackId={feed.id}
												/>
											)}
										</div>
									)}
									<FeedbackComment feedbackId={feed.id} />
								</div>
							</div>
						))}
				</div>
			</section>
		);
	}
);

FeedbackComment.displayName = 'FeedbackComment';
export { FeedbackComment };
