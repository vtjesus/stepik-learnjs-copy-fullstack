'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEffect, useMemo, useState } from 'react';
import { Register } from './ModalRegister/Register';
import { Login } from './ModalRegister/Login';

export function DialogRegister({ onClose }: { onClose: () => void }) {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<Dialog defaultOpen={true} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<div className='flex w-min justify-center items-center'>
					<div className='text-2xl text-primary'>
						{isRegister ? 'Регистрация' : 'Войти'}
					</div>
					<div className='mx-1'>/</div>
					<div
						className=' mr-1 inline underline hover:text-primary'
						onClick={() => setIsRegister(!isRegister)}
					>
						{!isRegister ? 'Регистрация' : 'Войти'}
					</div>
				</div>
				{isRegister ? <Register /> : <Login />}
			</DialogContent>
		</Dialog>
	);
}
