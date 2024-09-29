import React, { FC } from 'react';

type Props = {
	radius?: number;
	x: number;
	y: number;
};

const Focus: FC<Props> = ({ x, y, radius }: Props) => {
	return (
		<div
			className={`top-[${y}px] left-[${x}px] w-[${(radius ?? 180) / 2}px] h-[${
				(radius ?? 180) / 2
			}px] bg-radial-gradient rounded absolute opacity-40 bg-primary`}
		></div>
	);
};

Focus.displayName = 'Focus';

export { Focus };
