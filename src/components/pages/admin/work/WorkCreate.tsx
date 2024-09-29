import { WorkType, db } from '@/drizzle/db';
import { Work } from '@/drizzle/schema';

const createWork = async (
	chapterId: number,
	work: Omit<WorkType, 'id' | 'updated_at' | 'created_at'>
) => {
	try {
		await db.insert(Work).values({
			...work,
		});
	} catch (error) {
		console.log(error);
	}
};

interface Props {
	chapterId: number;
}

export const WorkCreate = ({}: Props) => {
	return <div>WorkCreate</div>;
};
