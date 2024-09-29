import { ChapterType } from '@/drizzle/db';

export const chaptersGroupByBook = (chapters: any) => {
	const result: {
		title: string;
		chapters: ChapterType[];
	}[] = [
		{ title: 'HTML: Язык Гипертекстовой Разметки', chapters: [] },
		{ title: 'CSS: Таблица Каскадных Стилей', chapters: [] },
		{ title: 'JS: Язык веб-программирования', chapters: [] },
	];

	chapters.forEach((ch: any) => {
		if (ch.book == 'HTML') {
			result[0].chapters.push(ch);
		}
		if (ch.book == 'CSS') {
			result[1].chapters.push(ch);
		}
		if (ch.book == 'JS') {
			result[2].chapters.push(ch);
		}
	});
	return result;
};
