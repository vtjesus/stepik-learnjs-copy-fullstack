import { Link } from '@/components/common/Link';
import { getChapters } from '@/request/book';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { chaptersGroupByBook } from '@/lib/bookUtils';

type Props = {
	accardion?: boolean;
};

export const BookNavigation = async ({ accardion }: Props) => {
	const books = await getChapters();

	const group = chaptersGroupByBook(books);

	return (
		<>
			<article className='my-4 hidden md:block'>
				{group.map((book, i) => (
					<div className='mb-3' key={book.title}>
						<div className='p-0 flex h-min border-b-[1px] border-foreground items-end gap-2'>
							<h3 className='text-nowrap'>{book.title}</h3>
						</div>
						<ul className='grid grid-cols-2 lg:grid-cols-3 gap-2 my-2'>
							{book.chapters.map((part, j) => (
								<li className='min-w-[175px] li__content' key={part.chapter}>
									<Link
										path={'page/' + part.title}
										title={
											<span>
												<span className='w-10 inline-block'>
													{i + 1 + '.' + (j + 1) + ': '}
												</span>
												<span>{part.title}</span>
											</span>
										}
									/>
								</li>
							))}
						</ul>
					</div>
				))}
			</article>
			<article>
				<Accordion type='multiple' className='w-full block md:hidden'>
					{group.map((book, i) => (
						<AccordionItem key={book.title} value={book.title}>
							<AccordionTrigger className='p-0 '>
								<h3 className=''>{book.title}</h3>
							</AccordionTrigger>
							<AccordionContent>
								<ul className='grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 gap-2'>
									{book.chapters.map((part, j) => (
										<li className='min-w-[175px]' key={part.id}>
											<Link
												path={'page/' + part.title}
												title={
													<span>
														<span className='w-4'>
															{i + 1 + '.' + (j + 1) + ': '}
														</span>
														<span>{part.title}</span>
													</span>
												}
											/>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</article>
		</>
	);
};
