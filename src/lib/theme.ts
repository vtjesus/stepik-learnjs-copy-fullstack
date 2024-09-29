'use client';
import { getCookie, setCookie } from 'cookies-next';

type Theme = 'light' | 'dark' | 'orange' | 'rose' | 'blue' | 'green';
const Theme = ['light', 'dark', 'orange', 'rose', 'blue', 'green'] as const;

const clearTheme = (body: HTMLBodyElement) => {
	for (let thm of Theme) {
		body.classList.remove(thm);
	}
};

export const getTheme = () => {
	return getCookie('theme') || 'dark';
};

export const setTheme = (theme: Theme) => {
	try {
		const body = document && document.querySelector('body')!;

		clearTheme(body);

		body.classList.add(theme);
		setCookie('theme', theme, {
			maxAge: 60 * 60 * 24 * 365,
		});
	} catch (error) {}
};
