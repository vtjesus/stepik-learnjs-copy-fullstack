'use client';
import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils';
import { HTMLProps, useEffect, useState } from 'react';

interface Props {
	className?: HTMLProps<HTMLElement>['className'];
	chapter: string | number;
}

type headings = {
	id: string;
	text: string;
};

const Aside = ({ className, chapter }: Props) => {
	const [headings, setHeadings] = useState<headings[]>([]);
	const [activeHead, setActiveHead] = useState('');
	const observers: [IntersectionObserver, HTMLHeadingElement][] = [];

	useEffect(() => {
		const h3Element = document.querySelectorAll('h3');
		const headingsArray = Array.from(h3Element).map(heading => {
			heading.id = heading.innerText;
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					setActiveHead(heading.id);
					// document
					// 	.querySelector('.aside-panel-chapter')!
					// 	.querySelector('.aside-scroll-toView')!
					// 	.scrollIntoView({
					// 		behavior: 'smooth',
					// 		block: 'center',
					// 		inline: 'nearest',
					// 	});
				}
			});
			let a = 5;
			a = 1;
			observer.observe(heading);
			heading.style.backgroundClip = 'content-box';
			heading.style.paddingTop = '42px';
			heading.style.marginTop = '-42px';
			observers.push([observer, heading]);
			return {
				id: heading.id,
				text: heading.innerText,
			};
		});
		setHeadings(headingsArray);
		return () => {
			observers.forEach(obs => {
				obs[0].unobserve(obs[1]);
			});
		};
	}, [observers]);

	const handleNavigation = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<aside
			className={cn(
				!chapter && headings.length == 0 && 'hidden',
				'h-full top-[48px] w-full overflow-y-auto sticky py-4 p flex-col items-end hidden md:flex aside-panel-chapter',
				className
			)}
		>
			<div className='w-[95%] h-full'>
				<div className='mb-4'>
					{chapter && (
						<div>
							<h4>Глава</h4>
							<Link path={'page/' + String(chapter)} title={String(chapter)} />
						</div>
					)}
				</div>
				<div className='h-full'>
					<h4 className='mb-3'>Навигация урока</h4>
					{headings.length == 0 ? (
						<div>Нет</div>
					) : (
						<ul className=' text-sm flex flex-col gap-1 '>
							{headings.map(heading => (
								<li className={`w-full `} key={heading.id}>
									<button
										className={`leading-4 w-full text-left text-sm  h-full ${
											activeHead == heading.text &&
											'table-of-contents__link--active'
											// 'text-primary	border-b-[1px] border-primary aside-scroll-toView'
										} table-of-contents__link`}
										onClick={() => handleNavigation(heading.id)}
									>
										{heading.text}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</aside>
	);
};

Aside.displayName = 'Aside';

export { Aside };
