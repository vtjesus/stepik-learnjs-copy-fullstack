import React, { FC, memo } from 'react';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CalendarDays, CalendarDaysIcon, HomeIcon } from 'lucide-react';
import { formatDate } from '@/lib/time';
import { ChapterSearch } from '@/app/api/book/search/route';

type Props = {
	book: ChapterSearch;
};

const Crumbls: FC<Props> = memo(({ book }) => {
	const isBook = 'book' in book;

	return (
		<div className='flex justify-between remove_stile_a items-center w-full'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className='hover:bg-none'>
						<HomeIcon width={16} height={16} />
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem className='hover:bg-none'>
						<BreadcrumbLink
							className='hover:bg-none'
							href={`/page/${book.title.replaceAll(' ', '_')}`}
						>
							<span className='hover:bg-none'>{book.book}</span>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem className='hover:bg-none'>
						<BreadcrumbPage className='hover:bg-none'>
							<span className='hover:bg-none'>{book.title}</span>
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='text-nowrap flex gap-2'>
				<CalendarDays width={16} height={16} />
				{book.updated_at && <div>{formatDate(book.updated_at.toString())}</div>}
			</div>
		</div>
	);
});

Crumbls.displayName = 'Crumbls';

export { Crumbls };
