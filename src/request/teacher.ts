import { WorkStudentResponse } from '@/app/api/work/student/route';
import { TeacherChapterPostDTO } from '@/app/api/work/teacher/chapter/route';
import { WorkTeacherResponse } from '@/app/api/work/teacher/route';
import { WorkTeacherStudentDTO } from '@/app/api/work/teacher/student/route';
import { ErrorNext, getDataOrThrowError } from '@/lib/requestMiddleware';

const baseUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/api`;

export const getWorkTeacher = async (
	userId: number
): Promise<WorkTeacherResponse> => {
	const responce = await fetch(
		baseUrl + '/work/teacher' + `?user_id=${userId}`,
		{
			next: {
				tags: ['workTeacher'],
			},
		}
	);
	const json = await responce.json();
	const data = getDataOrThrowError<WorkTeacherResponse>(json);
	return data;
};

export const addTeacherStudent = async (body: WorkTeacherStudentDTO) => {
	const responce = await fetch(baseUrl + '/work/teacher/student', {
		method: 'POST',
		body: JSON.stringify(body),
	});

	return responce.json();
};

export const getWorkStudent = async (
	userId: number
): Promise<WorkStudentResponse[]> => {
	const responce = await fetch(`${baseUrl}/work/student?user_id=${userId}`, {
		next: {
			tags: ['workStudent'],
		},
	});
	return responce.json();
};

export const addWorkStudent = async (
	data: TeacherChapterPostDTO
): Promise<ErrorNext> => {
	const responce = await fetch(baseUrl + '/work/teacher/chapter', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return responce.json();
};

export const getTeacherStudents = async (data: { teacher_id: number }) => {
	const responce = await fetch(baseUrl + '/work/teacher/student');
	return responce.json();
};
