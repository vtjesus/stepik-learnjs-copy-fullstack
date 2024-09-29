import { WorkCreate } from '@/components/pages/admin/work/WorkCreate';
import { hasRoleOrRedirectMain } from '@/lib/authGuardServer';
import { getChapterByTitle } from '@/request/book';
import React from 'react';

interface Props {
	params: {
		chapter: string;
	};
}

export default async function CreateWork({ params }: Props) {
	hasRoleOrRedirectMain('admin');
	const title = decodeURIComponent(params.chapter.replaceAll('_', ' '));

	const book = await getChapterByTitle(title);
	return (
		<div>
			<WorkCreate chapterId={book.id} />
		</div>
	);
}
