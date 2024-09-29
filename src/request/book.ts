import { BookChapterSearh, ChapterSearch } from '@/app/api/book/search/route';
import { ChapterType } from '@/drizzle/db';
import { revalidateTag } from 'next/cache';

export const getChapters = async (): Promise<ChapterType[]> => {
	const request = await fetch(process.env.NEXT_PUBLIC_URL_SITE + '/api/book');
	return request.json();
};

export const returnDataOrThrowError = async (response: Response) => {
	const res = await response.json();
	if (typeof res == 'object' && 'type' in res && res['type'] == 'error') {
		throw Error(res['message']);
	} else {
		return res;
	}
};

export const getBookSearch = async (
	search: string,
	controller: AbortController
): Promise<BookChapterSearh> => {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search`,
		{
			method: 'PUT',
			body: JSON.stringify({
				search: search,
			}),
			signal: controller.signal,
		}
	);
	return request.json();
};

export const getChapterByTitle = async (
	title: string
): Promise<ChapterSearch> => {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search`,
		{
			method: 'POST',
			body: JSON.stringify({
				title: title,
			}),
			next: {
				tags: ['chapter'],
			},
		}
	);
	return request.json();
};

export const getPrevNextBookByChapter = async (chapter: number) => {
	revalidateTag('analitic');
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search?chapter=${chapter}`
	);
	return request.json();
};

export const updateBookContent = async (id: number, content: string) => {
	const request = await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/`, {
		method: 'POST',
		body: JSON.stringify({ id, content }),
	});
	return request.json();
};
