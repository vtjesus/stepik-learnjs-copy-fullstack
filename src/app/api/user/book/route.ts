import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { Chapter, User, UserBook } from '@/drizzle/schema';
import { revalidateTag } from 'next/cache';
import { complateTask } from '../../helper/complateTask';

export async function POST(req: NextRequest) {
	// const { user_id, chapter_id } = await req.json();

	const user_id = req.nextUrl.searchParams.get('user_id');
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр user_id',
		});
	}

	if (!chapter_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр chapter_id',
		});
	}

	console.log(
		'Прочитаная глава - пользователь - ',
		user_id,
		', глава - ',
		chapter_id
	);

	const findUserBook = (
		await db.query.Chapter.findFirst({
			where: eq(Chapter.id, parseInt(chapter_id)),
			with: {
				userBooks: true,
			},
		})
	)?.userBooks.find(el => el.user_id == +user_id);

	if (findUserBook) {
		console.log('Существующая глава, ', +chapter_id);
		try {
			const res = await complateTask(+user_id, +chapter_id);
			if (res) {
				console.log(`Пользователь ${user_id} выполнил задание ${+chapter_id}`);
			}
		} catch (error) {
			if (typeof error == 'string') {
				console.log(error);
			} else if (error instanceof Error) {
				console.log(error.message);
			}
		}
		return NextResponse.json({ type: 'info', message: 'Глава уже добавлена' });
	}

	const newPost = await db
		.insert(UserBook)
		.values({
			chapter_id: +chapter_id,
			user_id: +user_id,
		})
		.returning();

	try {
		const res = await complateTask(+user_id, +chapter_id);
		if (res) {
			console.log(`Пользователь ${user_id} выполнил задание ${+chapter_id}`);
		}
	} catch (error) {
		if (typeof error == 'string') {
			console.log(error);
		} else if (error instanceof Error) {
			console.log(error.message);
		}
	}
	revalidateTag('analitic');

	return NextResponse.json(newPost[0].id);
}

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Не пришел идентификатор пользователя',
		});
	}

	// const pages = await getReadableBook(user_id, repo);

	const userFind = await db.query.User.findFirst({
		where: eq(User.id, +user_id),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			data: 'Пользователь не найдет',
		});
	}

	const readable_page = await db.query.UserBook.findMany({
		where: eq(UserBook.user_id, +user_id),
	});
	return NextResponse.json(readable_page);
}
