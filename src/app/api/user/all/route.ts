import { db } from '@/drizzle/db';
import { NextResponse } from 'next/server';

export type AllUserResponse = {
	id: number;
	description: string | null;
	group: string | null;
	name: string;
};

export async function GET() {
	const users: AllUserResponse[] = await db.query.User.findMany({
		columns: {
			id: true,
			description: true,
			group: true,
			name: true,
		},
	});

	return NextResponse.json(users);
}
