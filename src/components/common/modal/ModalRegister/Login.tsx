'use client';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getUserQuestion, login } from '@/request/user';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const Login = () => {
	const [name, setName] = useState('');
	const [question, setQuestion] = useState('');
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const handleName = async () => {
		setLoading(true);
		getUserQuestion(name)
			.then(data => {
				if (typeof data == 'object') {
					if ('type' in data && data.type == 'error') {
						toast({
							title: data.message,
						});
						return;
					}
				}

				setQuestion(data);
			})
			.catch(e => {
				toast({
					title: 'Что-то пошло не так',
					description: e,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleLogin = async () => {
		login(name, keyword)
			.then(data => {
				if (typeof data == 'object') {
					if ('type' in data && 'message' in data) {
						toast({
							title: data.message,
						});
						if (data.type == 'success') {
							router.refresh();
						}
						return;
					}
				}
			})
			.catch(e => {
				toast({
					title: 'Что-то пошло не так',
					description: e,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className=''>
				<Label htmlFor='link1'>Ваше имя</Label>
				<Input
					id='link1'
					value={name}
					autoFocus
					onChange={e => setName(e.target.value)}
				/>
			</div>
			{question.length > 0 ? (
				<>
					<div className=''>
						<Label htmlFor='link2'>Введите пароль</Label>
						<Input
							id='link2'
							value={keyword}
							type='password'
							autoFocus
							onChange={e => setKeyword(e.target.value)}
						/>
					</div>
					<DialogFooter className='sm:justify-between justify-start flex  gap-2'>
						<DialogClose onClick={handleLogin}>
							{loading ? (
								<Loader className='scale-90 stroke-primary animate-spin-slow spin-in spin-out-180 z-[110]' />
							) : (
								<div>Войти</div>
							)}
						</DialogClose>
					</DialogFooter>
				</>
			) : (
				<div className='sm:justify-between justify-start flex  gap-2'>
					{loading ? (
						<Loader className='scale-90 stroke-primary animate-spin-slow spin-in spin-out-180 z-[110]' />
					) : (
						<Button type='button' onClick={handleName} variant='secondary'>
							Проверить
						</Button>
					)}
				</div>
			)}
		</>
	);
};
