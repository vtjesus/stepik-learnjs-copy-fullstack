import { ContentEditable } from '@/components/pages/admin/page/ContentEditable';
import { hasRoleOrRedirectMain } from '@/lib/authGuardServer';
import { getChapterByTitle } from '@/request/book';
import React from 'react';

interface Props {
	params: {
		page: string;
	};
}

export default async function Book({ params }: Props) {
	hasRoleOrRedirectMain('admin');
	const title = decodeURIComponent(params.page.replaceAll('_', ' '));

	const book = await getChapterByTitle(title);

	return <section>{book && <ContentEditable book={book} />}</section>;
}
