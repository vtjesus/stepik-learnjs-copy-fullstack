import { revalidateTag } from 'next/cache';

export const addResolvedWork = async (user_id: number, work_id: number) => {
	revalidateTag('analitic');
	await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/user/work?user_id=${user_id}&work_id=${work_id}`,
		{
			method: 'POST',
			body: JSON.stringify({ user_id, work_id }),
			cache: 'no-cache',
		}
	);
};
