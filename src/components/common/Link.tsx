'use client';
import React, { HTMLProps, ReactNode } from 'react';
import LinkHref from 'next/link';

interface Props {
	path: string;
	title?: string | ReactNode;
	className?: HTMLProps<HTMLElement>['className'];
	attributes?: React.HTMLAttributes<HTMLAnchorElement>;
}

const Link: React.FC<Props> = ({ path, className, title, attributes }) => {
	return (
		<LinkHref
			className={className}
			href={'/' + path.replaceAll(' ', '_')}
			{...attributes}
		>
			{title ?? path}
		</LinkHref>
	);
};

Link.displayName = 'Link';

export { Link };
