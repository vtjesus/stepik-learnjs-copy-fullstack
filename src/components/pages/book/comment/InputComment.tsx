'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookie } from 'cookies-next';
import React, { FC, memo, useRef, useState } from 'react';
import { storeComment } from '@/request/comment';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFetch } from '@/hooks/useFetch';
import { ButtonLoader } from '@/components/common/ButtonLoader';
import { getTextFromRef } from '@/lib/text';
import { sendMessage } from '@/lib/socket';
import { SOCKET_ACTION_REFRESH } from '@/types/const/const';

interface Props {
	chapter_id: number;
}

export const InputComment: FC<Props> = ({ chapter_id }) => {
	const user = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const [isFocus, setFocus] = useState(false);
	const { loading, action } = useFetch<void>({
		promise: () => handleSendComment(),
	});
	const editableDiv = useRef<HTMLDivElement>(null);
	const handleSendComment = async () => {
		// TODO - сделать перенос строки https://ru.stackoverflow.com/questions/1443694/contenteditable-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D1%82%D0%BE-%D1%87%D1%82%D0%BE-%D0%B2%D0%B8%D0%B6%D1%83

		await storeComment({
			comment: {
				user_id: user!.id,
				content: getTextFromRef(editableDiv),
			},
			chapter_id,
		});
		sendMessage(chapter_id, 'chapter', SOCKET_ACTION_REFRESH);
		handleReject();
	};

	const handleReject = () => {
		setFocus(false);
		editableDiv.current!.innerText = 'Введите комментарий';
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
					<div
						className='w-full'
						onFocus={() => {
							if (!isFocus) editableDiv.current!.innerText = '';
							setFocus(true);
						}}
					>
						<div
							id='comment'
							contentEditable={true}
							className={`w-full text-sm h-min resize border-0 border-b-2  p-0 min-h-6  outline-none focus-visible:ring-0  rounded-none ${
								!isFocus
									? 'border-foreground text-muted-foreground resize-none h-[25px]'
									: 'border-primary'
							}`}
							ref={editableDiv}
						></div>

						{isFocus && (
							<div className='flex mt-2 justify-end items-center gap-1'>
								<Button variant={'destructive'} onClick={handleReject}>
									Отмена
								</Button>
								<ButtonLoader
									loading={loading}
									variant={'secondary'}
									onClick={action}
								>
									Оставить комментарий
								</ButtonLoader>
								{/* TODO - Добавить возможность пикать стткеры, библиотека  */}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
