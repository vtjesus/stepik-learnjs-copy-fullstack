'use server';
import { SocketListenerChapter } from '@/components/common/socket/SocketListenerChapter';
import { Aside } from '@/components/pages/book/Aside';
import { Comments } from '@/components/pages/book/Comments';
import { Content } from '@/components/pages/book/Content';
import { Crumbls } from '@/components/pages/book/Crumbls';
import { NavigationWrapper } from '@/components/pages/book/NavigationWrapper';
import { Work } from '@/components/pages/book/Work';
import { Button } from '@/components/ui/button';
import { getChapterByTitle } from '@/request/book';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';

interface Props {
	params: {
		book: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const title = decodeURIComponent(params.book.replaceAll('_', ' '));

	const book = await getChapterByTitle(title);

	if (!book) {
		redirect('/');
	}

	return {
		title: book.title,
		description: book.content.slice(0, 50),
		openGraph: {
			url: `https://book-styde.vercel.app/page/${params.book}`,
			title: book.title,
			description: book.content.slice(0, 50),
			siteName: 'book-styde',
		},
	};
}

export default async function Book({ params }: Props) {
	const title = decodeURIComponent(params.book.replaceAll('_', ' '));

	const book = await getChapterByTitle(title);

	if (!book) {
		redirect('/');
	}

	return (
		<div className=''>
			<div className='flex relative'>
				<SocketListenerChapter channel={book.id} variant='chapter' />

				<Aside chapter={book.title} className='overflow-y-auto' />
				<NavigationWrapper
					book={book}
					className='md:w-[82vw] bg-background/60 md:max-w-[82vw] w-full md:border-l-[1px] flex flex-col items-center'
				>
					<Crumbls book={book} />
					<div className='flex justify-between items-center my-4 '>
						{/* <Button className='w-8 h-8 bg-background'>
							<ArrowLeft className='fill-foreground' width={14} height={14} />
						</Button> */}
						<h1 className='text-4xl text-center'>{book.title}</h1>
						{/* <div className='w-8'></div> */}
					</div>
					<Content book={book} />
					{'works' in book && <Work works={book.works} />}
				</NavigationWrapper>
			</div>
		</div>
	);
}
