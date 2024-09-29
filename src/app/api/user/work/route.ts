import { db } from '@/drizzle/db';
import { UserWork, Work } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { complateTask } from '../../helper/complateTask';

export async function POST(req: NextRequest) {
	// const { user_id, chapter_id } = await req.json();

	const user_id = req.nextUrl.searchParams.get('user_id');
	const work_id = req.nextUrl.searchParams.get('work_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр user_id',
		});
	}

	if (!work_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр work_id',
		});
	}
	console.log(
		'Решённая задача - пользователь - ',
		user_id,
		', задача - ',
		work_id
	);
	const findUserBook = (
		await db.query.Work.findFirst({
			where: eq(Work.id, parseInt(work_id)),
			with: {
				userWorks: true,
			},
		})
	)?.userWorks.find(el => el.user_id == +user_id);

	console.log('Существующая решённая задача пользователя, ', findUserBook);

	if (findUserBook) {
		try {
			const chapter = (await db.query.Work.findFirst({
				where: (work, { eq }) => eq(work.id, +work_id),
				with: {
					chapter: true,
				},
			}))!.chapter;
			const res = await complateTask(+user_id, chapter.id);
			if (res) {
				console.log(`Пользователь ${user_id} выполнил задание ${chapter.id}`);
			}
		} catch (error) {
			if (typeof error == 'string') {
				console.log(error);
			} else if (error instanceof Error) {
				console.log(error.message);
			}
		}
		return NextResponse.json({
			type: 'info',
			message: 'Задача уже добавлена пользователю',
		});
	}

	const newPost = await db
		.insert(UserWork)
		.values({
			work_id: +work_id,
			user_id: +user_id,
		})
		.returning();

	try {
		const chapter = (await db.query.Work.findFirst({
			where: (work, { eq }) => eq(work.id, +work_id),
			with: {
				chapter: true,
			},
		}))!.chapter;
		const res = await complateTask(+user_id, chapter.id);
		if (res) {
			console.log(`Пользователь ${user_id} выполнил задание ${chapter.id}`);
		}
	} catch (error) {
		if (typeof error == 'string') {
			console.log(error);
		} else if (error instanceof Error) {
			console.log(error.message);
		}
	}

	return NextResponse.json(newPost[0].id);
}
