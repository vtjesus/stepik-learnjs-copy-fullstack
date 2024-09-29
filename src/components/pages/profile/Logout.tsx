'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { logout } from '@/request/user';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Logout = ({ ...attr }: ButtonProps) => {
	const { replace, refresh } = useRouter();

	const handleLogout = async () => {
		await logout();
		refresh();
		replace('/');
	};

	return (
		<Button onClick={handleLogout} {...attr}>
			<span className='mr-1'>Выйти</span> <LogOutIcon width={16} />
		</Button>
	);
};
