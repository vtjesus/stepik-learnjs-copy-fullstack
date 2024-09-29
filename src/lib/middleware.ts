'use server';
import { UserType } from '@/drizzle/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type UserVariant = 'user' | 'user_private';
type UserRole = 'user' | 'admin';

export const authMiddlewareAdmin = (
	userCookieName: UserVariant = 'user_private'
): UserType | NextResponse => {
	const user: UserType = cookies().has(userCookieName)
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не зарегестрировались',
		});
	}

	if (user.role == 'admin') {
		return NextResponse.json({
			type: 'error',
			message: 'У вас недостаточно прав',
		});
	}

	return user;
};

export const authMiddlewareUser = (
	userCookieName: UserVariant = 'user_private'
): UserType | NextResponse => {
	const user: UserType = cookies().has(userCookieName)
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не зарегестрировались',
		});
	}

	if (user.role == 'admin') {
		return NextResponse.json({
			type: 'error',
			message: 'У вас недостаточно прав',
		});
	}

	return user;
};

export const authMiddleware = (
	role?: UserRole,
	userCookieName: UserVariant = 'user_private'
): UserType | NextResponse => {
	const user: UserType = cookies().has(userCookieName)
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не зарегестрировались',
		});
	}

	if (role && role == user.role) {
		return NextResponse.json({
			type: 'error',
			message: 'У вас недостаточно прав',
		});
	}

	return user;
};
