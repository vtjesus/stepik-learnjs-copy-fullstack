import { getCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
	ChapterType,
	CommentType,
	UserBookType,
	UserType,
	UserWorkType,
	WorkType,
	db,
} from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { User } from '@/drizzle/schema';
import { getUser, setUserCookies } from '@/lib/authGuardServer';
import { hash, genSalt } from 'bcrypt';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
	const user: typeof User.$inferInsert = await req.json();

	const userFind = await db.query.User.findFirst({
		where: eq(User.name, user.name),
	}).catch(error => {
		return NextResponse.json({ type: 'error', data: error });
	});

	if (userFind) {
		return NextResponse.json({ type: 'error', message: 'User will created' });
	}
	const salt = await genSalt(5);
	const hashPassword = await hash(user.key_word, salt);

	try {
		const newUser = await db
			.insert(User)
			.values({
				...user,
				question: '',
				key_word: hashPassword,
			})
			.returning();

		setUserCookies(newUser[0]);

		return NextResponse.json({ type: 'success', data: newUser });
	} catch (error) {
		return NextResponse.json({ type: 'error', data: error });
	}
}

export async function PUT(req: NextRequest) {
	const { user_id, user } = await req.json();
	const userCookies = getUser('user_private');
	if (userCookies && user_id != userCookies.id) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не вошли в аккаунт',
		});
	}

	const userFind = await db.query.User.findFirst({
		where: eq(User.id, user_id),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	const userUpdated = await db
		.update(User)
		.set({
			...user,
		})
		.where(eq(User.id, userFind.id))
		.returning();
	setUserCookies(userUpdated[0]);

	revalidateTag('analitic');

	return NextResponse.json(userUpdated);
}

export async function DELETE(req: NextRequest) {
	const { user_id } = await req.json();
	const userCookies = getUser('user_private');
	if (
		userCookies &&
		(user_id != userCookies.id || userCookies.role == 'admin')
	) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не вошли в аккаунт',
		});
	}
	// const user_idx = await removeUser(user_id);

	const userFind = await db.query.User.findFirst({
		where: eq(User.id, user_id),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}
	await db.delete(User).where(eq(User.id, userFind.id));
	return NextResponse.json({ type: 'successfully', message: 'User deleted' });
}

export type UserAll =
	| (UserType & {
			comment: (Comment & { chapter: ChapterType | null })[];
			UserBook: (UserBookType & { chapter: ChapterType | null })[];
			UserWork: (UserWorkType & { work: WorkType | null })[];
	  })
	| undefined;

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Параметр не пришёл',
		});
	}
	const userFind = await db.query.User.findFirst({
		where: eq(User.id, +user_id),
		with: {
			comments: {
				with: {
					chapter: true,
				},
			},
			userBooks: {
				with: {
					chapter: true,
				},
			},
			userWorks: {
				with: {
					work: true,
				},
			},
		},
	});
	if (!userFind) {
		return NextResponse.json({ type: 'error', data: 'Пользователь не найден' });
	}
	return NextResponse.json(userFind);
}
