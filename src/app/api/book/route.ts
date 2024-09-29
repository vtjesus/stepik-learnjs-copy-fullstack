import { db } from '@/drizzle/db';
import { Chapter } from '@/drizzle/schema';
import { asc, eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const books = await db.query.Chapter.findMany({
		columns: {
			book: true,
			id: true,
			title: true,
			created_at: true,
			updated_at: true,
			chapter: true,
		},
		orderBy: [asc(Chapter.chapter)],
	});
	return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
	const { id, content }: { id: number; content: string } = await req.json();

	try {
		await db
			.update(Chapter)
			.set({
				content,
			})
			.where(eq(Chapter.id, id));
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: 'Произошла ошибка',
		});
	}
	revalidateTag('chapter');
	return NextResponse.json({
		type: 'succesfully',
		message: 'Содержание успешно изменено',
	});
}
