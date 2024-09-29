import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils';
import { addReadableBook } from '@/request/user';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, {
	FC,
	HTMLProps,
	PropsWithChildren,
	ReactNode,
	memo,
} from 'react';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import { getPrevNextBookByChapter } from '@/request/book';
import { Comments } from './Comments';
import { cookies } from 'next/headers';
import { ChapterSearch } from '@/app/api/book/search/route';

interface Props {
	children?: ReactNode | undefined;
	className?: HTMLProps<HTMLElement>['className'];
	book: ChapterSearch;
}

const NavigationWrapper: FC<Props> = async ({ children, className, book }) => {
	const [prev, next] = await getPrevNextBookByChapter(book.chapter);

	const userId =
		cookies().get('user') && JSON.parse(cookies().get('user')!.value).id;
	if (userId) {
		addReadableBook(
			cookies().get('user') && JSON.parse(cookies().get('user')!.value).id,
			String(book.id)
		);
	}

	return (
		<div className='relative w-full flex'>
			{prev && (
				<Link
					path={'page/' + prev.title}
					title={
						<ArrowLeft
							className='hover:stroke-primary'
							width={48}
							height={48}
						/>
					}
					className='hidden h-18  w-18 md:block fixed -translate-y-[24px] top-1/2 '
				/>
			)}
			<div
				className={cn('py-4 px-[22px] md:px-[48px] w-full h-min', className)}
			>
				{children}
				<div className='hidden w-full h-full md:block'>
					<Comments chapter_id={book.id} comments={book.comments} />
				</div>

				<div className='w-full block md:hidden h-full'>
					<div className='w-full flex flex-wrap  gap-4 justify-between'>
						{prev && (
							<Button>
								<Link
									path={'page/' + prev.title}
									title={
										<div className='flex text-primary-foreground'>
											<ArrowLeft
												className='fill-black'
												width={15}
												height={15}
											/>
											{prev.title}
										</div>
									}
								/>
							</Button>
						)}

						{next && (
							<Button>
								<Link
									path={'page/' + next.title}
									title={
										<div className='flex text-primary-foreground'>
											{next.title}
											<ArrowRight
												className='fill-black'
												width={15}
												height={15}
											/>
										</div>
									}
								/>
							</Button>
						)}
					</div>

					<div className='block pb-4 w-full h-full'>
						<Comments chapter_id={book.id} comments={book.comments} />
					</div>
				</div>
			</div>
			{next && (
				<Link
					path={'page/' + next.title}
					title={
						<ArrowRight
							className='hover:stroke-primary'
							width={48}
							height={48}
						/>
					}
					className='hidden   h-18 w-18 md:block fixed -translate-y-[24px] right-0 top-1/2'
				/>
			)}
		</div>
	);
};
NavigationWrapper.displayName = 'NavigationWrapper';

export { NavigationWrapper };
