import { UserType } from '@/drizzle/db';
import { getCookie, hasCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

export const hasRoleOrRedirectMain = (role?: 'user' | 'admin') => {
	if (!role) {
		return;
	}
	const user: UserType = hasCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;

	if (!user) {
		return redirect('/');
	}

	if (user.role != role) {
		return redirect('/');
	}
};

export const getUser = (): UserType | null => {
	return hasCookie('user') ? JSON.parse(getCookie('user')!) : null;
};

export const isAuth = () => {
	const user: UserType = hasCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;

	if (user) {
		return true;
	}

	return false;
};

export const isAdmin = () => {
	const user: UserType = hasCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;

	if (user && user.role == 'admin') {
		return true;
	}

	return false;
};

export const isUser = () => {
	const user: UserType = hasCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;

	if (user && user.role == 'user') {
		return true;
	}

	return false;
};
