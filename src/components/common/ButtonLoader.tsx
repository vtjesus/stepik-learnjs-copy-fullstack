'use client';

import { ReactNode } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { Loader } from 'lucide-react';

type ButtonLoaderProps = ButtonProps & {
	loading?: boolean;
	children?: ReactNode;
};

export const ButtonLoader = ({
	loading,
	children,
	...attr
}: ButtonLoaderProps) => {
	return (
		<Button {...attr}>
			{loading ? (
				<Loader className='scale-90 animate-spin-slow z-[110]' />
			) : (
				children
			)}
		</Button>
	);
};
