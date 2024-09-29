'use client';

interface Props {
	value: boolean;
	onChange: (e: FormEvent<HTMLButtonElement>) => void;
	description?: string;
	children?: ReactNode;
}

import { Checkbox } from '@/components/ui/checkbox';
import { FormEvent, ReactNode } from 'react';

export function CheckboxWithText({
	onChange,
	description,
	value,
	children,
}: Props) {
	return (
		<div className='items-top flex space-x-2'>
			<Checkbox
				id={`${children} ${description}`}
				checked={value}
				onClick={onChange}
			/>
			<div className='grid gap-1.5 leading-none'>
				<label
					htmlFor={`${children} ${description}`}
					className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
				>
					{children}
				</label>
				{description && (
					<p className='text-sm text-pretty -mt-1 mb-0 text-muted-foreground'>
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
