import { AnaliticResolve } from '@/app/api/user/analitic/route';
import React, { HTMLProps } from 'react';

type Props = {
	resolve: AnaliticResolve;
	className?: HTMLProps<HTMLDivElement>['className'];
};

export const Resolve = ({ resolve, className }: Props) => {
	return (
		<div className={`${className} flex flex-col gap-2 justify-around w-full`}>
			{resolve.resolve.map(wr => (
				<div key={wr.book} className='w-full'>
					<div className='flex justify-between'>
						<div>{wr.book}</div>
						<div>
							{wr.resolve} / {wr.all}
						</div>
					</div>
					<div className='w-full h-[7px] bg-background rounded-sm flex items-center'>
						<div
							className='bg-primary rounded-sm'
							style={{
								width: `${(wr.resolve / wr.all) * 100}%`,
								height: '7px',
							}}
						></div>
					</div>
				</div>
			))}
		</div>
	);
};
