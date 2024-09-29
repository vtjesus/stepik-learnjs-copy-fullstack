import { TeacherWorks } from '@/components/pages/work/teacher/TeacherWorks';
import { getUser } from '@/lib/authGuardServer';
import { getWorkTeacher } from '@/request/teacher';
import { redirect } from 'next/navigation';

export default async function WorkStudent() {
	const user = getUser();

	if (!user || (user.role && user.role != 'admin')) {
		redirect('/');
	}
	const works = await getWorkTeacher(user.id);
	return (
		<div className='w-full h-full'>
			<TeacherWorks works={works} />
		</div>
	);
}
