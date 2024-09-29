import WorkUpdateEditor from '@/components/pages/admin/work/WorkUpdateEditor';
import { WorkType, db } from '@/drizzle/db';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
	params: {
		chapter: string;
		work: number;
	};
}

const getWorkById = async (id: number) => {
	const work = await db.query.Work.findFirst({
		where: (work, { eq }) => eq(work.id, id),
	});
	return work;
};

export default async function UpdateWork({ params }: Props) {
	const work = await getWorkById(params.work);

	if (!work) {
		return redirect(`admin/work/${params.chapter}`);
	}

	return (
		<section>
			<WorkUpdateEditor work={work} />
		</section>
	);
}
