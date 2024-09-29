'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();
	const { toast } = useToast();
	useEffect(() => {
		toast({
			title: 'Название ошибки: ' + error.name,
			description: 'Описание ошибки: ' + error.message,
			variant: 'destructive',
		});
	}, [toast, error.name, error.message]);

	return (
		<div className='flex justify-center absolute top-0 left-0 items-center w-screen h-[calc(100vh-48px)]'>
			<div className='border-[1px] bg-secondary rounded-md p-4'>
				<h3>Что-то пошло не так.</h3>
				<p>
					Произошла ошибка сервера. В будущем это будет исправлено.
					<br /> Пожалуйства, нажмите на ссылку чтобы вернуться назад или
					повторить попытку
				</p>
				<div className='flex justify-between'>
					<Button onClick={() => router.back()}>Вернуться назад</Button>
					<Button onClick={() => router.refresh()}>Повторить попытку</Button>
				</div>
			</div>
		</div>
	);
}
