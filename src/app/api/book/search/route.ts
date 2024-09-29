import { NextRequest, NextResponse } from 'next/server';
import { CommentChapter } from '../../comment/route';
import { ChapterType, WorkType, db } from '@/drizzle/db';
import { eq, ilike, like } from 'drizzle-orm';
import { Chapter, Comment, LikesComment, User, Work } from '@/drizzle/schema';

export type NextPrevChapter = typeof Chapter | null;

export async function GET(req: NextRequest) {
	const chapter = req.nextUrl.searchParams.get('chapter');

	if (!chapter) {
		return NextResponse.json({ type: 'error', message: 'Параметр не пришёл' });
	}

	console.log(`ch-${chapter}; p-${+chapter - 1}; n-${+chapter + 1}`);

	try {
		const prevBook = await db.query.Chapter.findFirst({
			where: eq(Chapter.chapter, +chapter - 1),
		});

		const nextBook = await db.query.Chapter.findFirst({
			where: eq(Chapter.chapter, +chapter + 1),
		});

		return NextResponse.json([prevBook, nextBook]);
	} catch (error) {
		return NextResponse.json({ type: 'error', message: error });
	}
}

export type ChapterSearch = ChapterType & {
	works: WorkType[];
	comments: CommentChapter[];
};

export async function POST(req: NextRequest) {
	const { title } = await req.json();

	console.log(`Поиск части по именя - ${title}`);
	try {
		const chapterFind: ChapterSearch | undefined =
			await db.query.Chapter.findFirst({
				where: ilike(Chapter.title, `%${title}%`),
				with: {
					works: true,
					comments: {
						with: {
							user: true,
							likesComments: true,
							feedbackComments: true,
						},
					},
				},
			});
		if (chapterFind != null) {
			return NextResponse.json(chapterFind);
		}
		return NextResponse.json(null);
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: JSON.stringify(error),
		});
	}
}

export type BookChapterSearh = {
	id: number;
	title: string;
}[];

export async function PUT(req: NextRequest) {
	const { search } = await req.json();
	const chapters = await db.query.Chapter.findMany({
		where: (chapter, { ilike }) => ilike(chapter.title, `%${search}%`),
		columns: {
			id: true,
			title: true,
		},
	});
	return NextResponse.json(chapters);
}
