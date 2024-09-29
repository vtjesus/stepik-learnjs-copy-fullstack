import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/authGuardServer';
import { UserType, TeacherType, db } from '../../../drizzle/db';
import { eq } from 'drizzle-orm';
import { Teacher, User } from '../../../drizzle/schema';
import { authMiddlewareAdmin } from '@/lib/middleware';

export type TeacherResponse = (TeacherType & {
	teacher: UserType;
	student: UserType;
})[];

export async function GET(req: NextRequest) {
	const user = authMiddlewareAdmin() as UserType;

	const students = await db.query.Teacher.findMany({
		where: eq(Teacher.teacher_id, user.id),
		with: {
			teacher: true,
			student: true,
		},
	});

	return NextResponse.json(students);
}
export async function POST(req: NextRequest) {}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
