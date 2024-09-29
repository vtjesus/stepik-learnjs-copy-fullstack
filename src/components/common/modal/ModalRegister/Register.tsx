import { Button } from '@/components/ui/button';
import {
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getRandomQuestion } from '@/lib/utils';
import { register } from '@/request/user';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

export const Register = () => {
	const [keyword, setKeyword] = useState('');
	const [name, setName] = useState('');
	const router = useRouter();
	const handleRegister = async () => {
		const response: { type: string; data: string } = await register({
			name,
			key_word: keyword,
		});
		if (response.type == 'success') {
			router.refresh();
			return;
		}
	};
	return (
		<>
			<div className=''>
				<Label htmlFor='link1'>Ваше имя</Label>
				<Input
					id='link1'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>
			<div className=''>
				<Label htmlFor='link2'>Введите пароль</Label>
				<Input
					id='link2'
					value={keyword}
					type='password'
					onChange={e => setKeyword(e.target.value)}
				/>
			</div>
			<DialogFooter className='sm:justify-between justify-start flex  gap-2'>
				<DialogClose asChild>
					<Button type='button' variant='secondary'>
						Отмена
					</Button>
				</DialogClose>
				<Button onClick={handleRegister}>зарегестрироваться</Button>
			</DialogFooter>
		</>
	);
};
