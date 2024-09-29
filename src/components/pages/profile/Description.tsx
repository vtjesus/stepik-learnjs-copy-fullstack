'use client';
import { UserAnalitic } from '@/app/api/user/analitic/route';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateUser } from '@/request/user';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { HTMLProps, useState } from 'react';

type Props = {
	user: UserAnalitic;
	className?: HTMLProps<HTMLOrSVGElement>['className'];
};

export const Description = ({ user, className }: Props) => {
	const userCookies = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const [editing, setEditing] = useState(false);
	const [description, setDescription] = useState(user.description ?? '');
	const router = useRouter();

	const handleEditing = async () => {
		if (editing) {
			// TODO: make edit description available
			await updateUser(userCookies.id, {
				description,
			});
			router.refresh();
			setEditing(false);
		} else {
			setEditing(true);
		}
	};

	return (
		<section className={`${className} `}>
			<h3>Описание</h3>
			<div>
				<div className='mb-2'>
					Роль: {user.role == 'user' ? 'Студент' : 'Преподаватель'}
				</div>
				{user.group && <div className='mb-2'>Группа: {user.group}</div>}
				{editing ? (
					<Textarea
						value={description}
						className='mt-2 h-min'
						placeholder='Введите ваше описание'
						onChange={e => setDescription(e.target.value)}
					/>
				) : (
					user.description && (
						<div>
							Описание: <div className='text-pretty'>{user.description}</div>
						</div>
					)
				)}
			</div>
			{userCookies && user.id == userCookies.id && (
				<Button className='w-full mt-4' onClick={handleEditing}>
					{editing ? 'Сохранить' : 'Изменить'}
				</Button>
			)}
		</section>
	);
};
