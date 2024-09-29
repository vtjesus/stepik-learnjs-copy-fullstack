import { getDayOfYear, getDaysFromYear } from '@/lib/time';
import { NextRequest, NextResponse } from 'next/server';
import { CommentChapter } from '../../comment/route';
import {
	ChapterType,
	LikesCommentType,
	UserBookType,
	UserType,
	UserWorkType,
	WorkType,
	db,
} from '@/drizzle/db';
import { Chapter, User } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

type UserIncludes =
	| (UserType & {
			comments: (CommentChapter & { chapter: ChapterType | null } & {
				likesComments: LikesCommentType[];
			})[];
			userBooks: (UserBookType & { chapter: ChapterType | null })[];
			userWorks: (UserWorkType & {
				work: (WorkType & { chapter: ChapterType | null }) | null;
			})[];
	  })
	| null;

export type AnaliticResolve = {
	resolve: {
		book: string;
		resolve: number;
		all: number;
	}[];
	all: number;
	current: number;
};

export type ActiveDay = {
	day: number;
	visit: number;
};

export type AnaliticVisit = {
	[year: string]: {
		all: number;
		activeDay: ActiveDay[];
	};
};

type Analitic = {
	analitic: {
		work: AnaliticResolve;
		chapter: AnaliticResolve;
		visiting: AnaliticVisit;
	};
};

export type UserAnalitic = UserIncludes & Analitic;

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Не пришёл параметр user_id',
		});
	}

	const userFind = await db.query.User.findFirst({
		where: eq(User.id, +user_id),
		with: {
			comments: {
				with: {
					chapter: true,
					likesComments: true,
				},
			},
			userBooks: {
				with: {
					chapter: true,
				},
			},
			userWorks: {
				with: {
					work: {
						with: {
							chapter: true,
						},
					},
				},
			},
		},
	});

	if (!userFind) {
		return NextResponse.json({ type: 'error', data: 'пользователь не найден' });
	}

	const visit: {
		[year: number]: { [key: string]: { day: number; visit: number } };
	} = {};

	userFind.comments.forEach((com: any) => {
		const day = getDayOfYear(com.updated_at);
		const year = new Date(com.updated_at.toString()).getFullYear();
		if (!visit[year]) {
			visit[year] = {};
		}
		if (visit[year][day]) {
			visit[year][day].visit = visit[year][day].visit + 1;
		} else {
			visit[year][day] = { day: day, visit: 1 };
		}
	});

	userFind.userBooks.forEach((com: any) => {
		const day = getDayOfYear(com.updated_at);
		const year = new Date(com.updated_at.toString()).getFullYear();
		if (!visit[year]) {
			visit[year] = {};
		}
		if (visit[year][day]) {
			visit[year][day].visit = visit[year][day].visit + 1;
		} else {
			visit[year][day] = { day: day, visit: 1 };
		}
	});

	userFind.userWorks.forEach((com: any) => {
		const day = getDayOfYear(com.updated_at);
		const year = new Date(com.updated_at.toString()).getFullYear();
		if (!visit[year]) {
			visit[year] = {};
		}
		if (visit[year][day]) {
			visit[year][day].visit = visit[year][day].visit + 1;
		} else {
			visit[year][day] = { day: day, visit: 1 };
		}
	});

	const HTML = 'HTML';
	const CSS = 'CSS';
	const JS = 'JS';

	const HTMLC = await db.query.Chapter.findMany({
		where: eq(Chapter.book, HTML),
		with: {
			works: true,
		},
	});
	const CSSC = await db.query.Chapter.findMany({
		where: eq(Chapter.book, CSS),
		with: {
			works: true,
		},
	});
	const JSC = await db.query.Chapter.findMany({
		where: eq(Chapter.book, JS),
		with: {
			works: true,
		},
	});

	// _____
	const HTMLChapter = HTMLC.length;
	const CSSChapter = CSSC.length;
	const JSChapter = JSC.length;

	const HTMLWork = HTMLC.reduce<number>(
		(acc, el) => (acc += el.works.length),
		0
	);
	const CSSWork = CSSC.reduce<number>((acc, el) => (acc += el.works.length), 0);
	const JSWork = JSC.reduce<number>((acc, el) => (acc += el.works.length), 0);

	const allBook = 3;
	const allCWork = HTMLWork + CSSWork + JSWork;

	const countChapter = HTMLChapter + CSSChapter + JSChapter;
	const countBook = 3;
	const countWork = HTMLWork + CSSWork + JSWork;

	const UserChapter = userFind.userBooks;
	const UserWork = userFind.userWorks;

	const currentChapter = UserChapter.length;
	const currentWork = UserWork.length;

	const HTMLChapterRead = UserChapter.filter(
		(chap: any) => chap.chapter?.book == HTML
	).length;
	const CSSChapterRead = UserChapter.filter(
		(chap: any) => chap.chapter?.book == CSS
	).length;
	const JSChapterRead = UserChapter.filter(
		(chap: any) => chap.chapter?.book == JS
	).length;

	const HTMLWorkResolve = UserWork.filter(
		(chap: any) => chap.work?.chapter?.book == HTML
	).length;
	const CSSWorkResolve = UserWork.filter(
		(chap: any) => chap.work?.chapter?.book == CSS
	).length;
	const JSWorkResolve = UserWork.filter(
		(chap: any) => chap.work?.chapter?.book == JS
	).length;

	const visiting = Object.entries(visit).reduce<AnaliticVisit>((acc, el) => {
		const year = el[0];
		acc[year] = {
			activeDay: Object.values(el[1]),
			all: getDaysFromYear(+year),
		};
		return acc;
	}, {});

	const analitic: Analitic = {
		analitic: {
			chapter: {
				resolve: [
					{
						book: 'HTML',
						resolve: HTMLChapterRead,
						all: HTMLChapter,
					},
					{
						book: 'CSS',
						resolve: CSSChapterRead,
						all: CSSChapter,
					},
					{
						book: 'JS',
						resolve: JSChapterRead,
						all: JSChapter,
					},
				],
				all: countChapter,
				current: currentChapter,
			},
			work: {
				resolve: [
					{
						book: 'HTML',
						resolve: HTMLWorkResolve,
						all: HTMLWork,
					},
					{
						book: 'CSS',
						resolve: CSSWorkResolve,
						all: CSSWork,
					},
					{
						book: 'JS',
						resolve: JSWorkResolve,
						all: JSWork,
					},
				],
				all: countWork,
				current: currentWork,
			},
			// visiting: {
			// 	activeDay: Object.values(visit),
			// 	all: getDaysFromYear(new Date().getFullYear()),
			// },
			visiting: visiting,
		},
	};

	return NextResponse.json(Object.assign(userFind, analitic));
}
