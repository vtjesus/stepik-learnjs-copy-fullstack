'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { closeDialog } from '@/lib/dialogs';
import { login } from '@/request/user';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DialogKeyword({ onClose }: { onClose: () => void }) {
	const user: User = JSON.parse(getCookie('user')!);
	const [keyword, setKeyword] = useState('');
	const {} = useRouter();
	const pathname = usePathname();

	const { has, get } = useSearchParams();
	const [open, setOpen] = useState(false);

	const handleKeywork = async () => {
		const response: { type: string; data: string } = await login(
			user.name,
			keyword
		);
		if (response.type == 'succesfully') {
			onClose();
		}
	};

	return (
		<Dialog defaultOpen={true} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Подтвердите аккаунт</DialogTitle>
					<DialogDescription>{user.question}</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Label htmlFor='link' className='sr-only'>
							Ключевое слово
						</Label>
						<Input
							id='link'
							value={keyword}
							onChange={e => setKeyword(e.target.value)}
						/>
					</div>
					<Button onClick={handleKeywork} size='sm' className='px-3'>
						<span className='sr-only'>Copy</span>
					</Button>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Отмена
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
