import { WorkElement } from '@/components/pages/admin/work/WorkElement';
import { Button } from '@/components/ui/button';
import { hasRoleOrRedirectMain } from '@/lib/authGuardServer';
import { getChapterByTitle } from '@/request/book';
import React from 'react';

interface Props {
	params: {
		chapter: string;
	};
}

export default async function Work({ params }: Props) {
	hasRoleOrRedirectMain('admin');
	const title = decodeURIComponent(params.chapter.replaceAll('_', ' '));

	const book = await getChapterByTitle(title);

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<ul className='h-4/6 w-2/3 flex flex-col gap-2'>
				{book.works.map(work => (
					<WorkElement key={work.id} work={work} />
				))}
			</ul>
		</div>
	);
}
