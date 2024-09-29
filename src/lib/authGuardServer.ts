'use server';
import { UserType } from '@/drizzle/db';
import { COOKIE_MAX_AGE } from '@/types/const/const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const hasRoleOrRedirectMain = (role?: 'user' | 'admin') => {
	const user = getUser('user_private');
	if (!user) {
		return redirect('/');
	}

	if (role && user.role != role) {
		return redirect('/');
	}
};

export const setUserCookies = (user: UserType) => {
	cookies().set({
		name: 'user',
		value: JSON.stringify({
			id: user.id,
			name: user.name,
			role: user.role,
			group: user.group,
		}),
		sameSite: 'lax',
		maxAge: COOKIE_MAX_AGE,
	});
	cookies().set({
		name: 'user_private',
		value: JSON.stringify({
			id: user.id,
			name: user.name,
			role: user.role,
			group: user.group,
		}),
		sameSite: 'lax',
		maxAge: COOKIE_MAX_AGE,
		httpOnly: true,
	});
};

type UserVariant = 'user' | 'user_private';

export const getUser = (user: UserVariant = 'user'): UserType | null => {
	return cookies().has(user) ? JSON.parse(cookies().get('user')?.value!) : null;
};

export const isAuth = () => {
	const user: UserType = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user) {
		return true;
	}

	return false;
};

export const isAdmin = () => {
	const user: UserType = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user && user.role == 'admin') {
		return true;
	}

	return false;
};

export const isUser = () => {
	const user: UserType = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user && user.role == 'user') {
		return true;
	}

	return false;
};
