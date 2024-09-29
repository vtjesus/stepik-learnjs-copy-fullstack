import { HTMLProps, PropsWithChildren, ReactElement, ReactNode } from 'react';

type Props = {
	resolve: number;
	className?: HTMLProps<HTMLOrSVGElement>['className'];
	children?: ReactNode;
};

export const CircleChar = ({ resolve, className, children }: Props) => {
	return (
		<svg
			version='1.1'
			baseProfile='full'
			viewBox='0 0 100 100'
			strokeLinecap='round'
			className={`${className} origin-center flex justify-center items-center -rotate-90 transform`}
		>
			<circle
				fill='none'
				cx='50px'
				cy='50px'
				r='46'
				strokeWidth='2'
				strokeLinecap='round'
				stroke='currentColor'
				className='text-gray-4  text-background dark:text-dark-gray-4 w-[100px]'
			></circle>
			{children}
			<circle
				fill='none'
				cx='50px'
				cy='50px'
				r='46'
				strokeWidth='5'
				strokeLinecap='round'
				stroke='currentColor'
				className='cursor-pointer text-primary  dark:text-dark-brand-orange drop-shadow-[0_2px_4px_rgba(255,161,22,0.2)]'
				strokeDasharray={`${resolve} 285.5701629819676`}
				strokeDashoffset='0'
				data-difficulty='ALL'
			></circle>
		</svg>
	);
};
