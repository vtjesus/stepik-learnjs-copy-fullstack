'use server';

import { StudentWork } from '@/components/pages/work/student/StudentWorks';
import { getUser, hasRoleOrRedirectMain } from '@/lib/authGuardServer';
import { getWorkStudent } from '@/request/teacher';
import { redirect } from 'next/navigation';

type StudentPageProps = {
	params: {
		id: number;
	};
};

export default async function WorkStudent({ params }: StudentPageProps) {
	const user = getUser();
	if (!user) {
		redirect('/');
	}
	const teachers = await getWorkStudent(user.id);

	if (teachers.length == 0) {
		return (
			<div className='flex justify-center items-center top-0 left-0 w-full h-full absolute'>
				<div className='text-3xl'>
					Вы не привязаны к курсу или преподавателю
				</div>
			</div>
		);
	}

	return (
		<div>
			<StudentWork teachers={teachers} />
		</div>
	);
}
