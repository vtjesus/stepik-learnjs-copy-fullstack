import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT() {
	cookies().delete('user');
	cookies().delete('user_private');

	return NextResponse.json({ type: 'message', data: 'Вы вышли' });
}
