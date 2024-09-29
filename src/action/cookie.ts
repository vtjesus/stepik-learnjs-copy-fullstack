'use server';

import { cookies } from 'next/headers';

export const save = (key: string, value: string) => {
	cookies().set(key, value);
};
