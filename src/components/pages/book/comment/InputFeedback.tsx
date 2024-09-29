'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookie } from 'cookies-next';
import React, { FC, memo, useRef, useState } from 'react';
import { storeComment, storeFeedback } from '@/request/comment';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFetch } from '@/hooks/useFetch';
import { ButtonLoader } from '@/components/common/ButtonLoader';
import { getTextFromRef } from '@/lib/text';

type Props = {
	commentId?: number;
	feedbackId?: number;
	handle?: () => any;
};

export const InputFeedback = ({
	commentId,
	feedbackId,
	handle = () => {},
}: Props) => {
	const user = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const { loading, action } = useFetch<void>({
		promise: () => handleSendComment(),
	});
	const editableDiv = useRef<HTMLDivElement>(null);
	const { refresh } = useRouter();
	const handleSendComment = async () => {
		await storeFeedback({
			comment_id: commentId,
			content: getTextFromRef(editableDiv),
			feedback_id: feedbackId,
			user_id: user.id,
		});
		handle();
		refresh();
	};

	return (
		<>
			{user && (
				<div className='flex w-full gap-2 mb-4'>
					<Avatar>
						<AvatarImage
							src={`https://ui-avatars.com/api/?name=${user.name}`}
						/>
						<AvatarFallback>{user.name}</AvatarFallback>
					</Avatar>
					<div className='w-full'>
						<div
							id='comment'
							autoFocus
							contentEditable={true}
							className={`w-full text-sm h-min resize border-0 border-b-2  p-0 min-h-6  outline-none focus-visible:ring-0  rounded-none border-primary`}
							ref={editableDiv}
						></div>

						<div className='flex mt-2 justify-end items-center gap-1'>
							<Button variant={'destructive'} onClick={handle}>
								Отмена
							</Button>
							<ButtonLoader
								loading={loading}
								variant={'secondary'}
								onClick={action}
							>
								Ответить
							</ButtonLoader>
							{/* TODO - Добавить возможность пикать стткеры, библиотека  */}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
