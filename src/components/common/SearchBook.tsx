'use client';

import React, {
	ChangeEvent,
	HTMLProps,
	memo,
	useEffect,
	useState,
} from 'react';
import { Input } from '../ui/input';
import { Loader, Search } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Link } from './Link';
import { BookChapterSearh } from '@/app/api/book/search/route';
import { useDebounce } from 'use-debounce';
import { getBookSearch } from '@/request/book';

interface Props {
	className?: HTMLProps<HTMLElement>['className'];
	action?: (search: string) => void;
	baseUrl?: string;
}

const SearchBook = memo(({ className, action, baseUrl = 'page/' }: Props) => {
	const [search, setSearch] = useState('');
	const [books, setBooks] = useState<BookChapterSearh>([]);
	const [debounceValue] = useDebounce(search, 1000);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		if (debounceValue.length > 0) {
			setLoading(true);
			getBookSearch(debounceValue, controller)
				.then(result => {
					setBooks(result);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setBooks([]);
		}

		return () => controller.abort();
	}, [debounceValue]);

	const handleInputSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSearch = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		search: string
	) => {
		if (!action) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		action(search);
	};

	return (
		<article
			className={`${className} relative px-2 h-9 w-full border-[1px] bg-background rounded-sm`}
		>
			<div className='flex relative items-center p-[1px] gap-2'>
				<Search width={18} height={18} />
				<Input
					className='search-book outline-none border-none z-30 py-1 px-2 h-8'
					value={search}
					placeholder='Введите название главы'
					onChange={handleInputSearch}
				/>
				{loading && (
					<Loader className='scale-90 stroke-primary animate-spin-slow spin-in spin-out-180 z-[110]' />
				)}
			</div>
			<ul
				autoFocus
				className={`${
					books.length == 0 ? 'hidden' : 'border-t-0 animate-dropdawn'
				} absolute  top-8  z-100 left-0 h-auto bg-background border-[1px] -translate-x-[1px] overflow-auto box-content w-full max-h-[40vh]`}
			>
				<Separator className='' />
				{books.map(book => (
					<li
						key={book.id}
						className='h-min flex justify-center li__content item-center p-1 min-h-min'
					>
						<Link
							attributes={{
								onClick: e => handleSearch(e, book.title),
							}}
							path={baseUrl + book.title}
							title={book.title}
							className='w-full h-full text-left'
						/>
					</li>
				))}
			</ul>
		</article>
	);
});

SearchBook.displayName = 'SearchBook';

export { SearchBook };
