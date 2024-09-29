import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { User } from '@/drizzle/schema';
import { compare } from 'bcrypt';
import { setUserCookies } from '@/lib/authGuardServer';

export async function POST(req: NextRequest) {
	const { name, keyword } = await req.json();

	const userFind = await db.query.User.findFirst({
		where: eq(User.name, name),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	const isCompare = await compare(keyword, userFind.key_word);

	if (!isCompare) {
		return NextResponse.json({
			type: 'error',
			message: 'Пароль не подходит. Попробуйте ещё раз!',
		});
	}

	setUserCookies(userFind);
	return NextResponse.json({
		type: 'success',
		message: 'Верификация прошла успешно',
	});
}

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');

	if (!name) {
		return NextResponse.json({
			type: 'error',
			message: 'Параметр не пришёл',
		});
	}

	const userFind = await db.query.User.findFirst({
		where: eq(User.name, name),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	return NextResponse.json(userFind.question);
}
