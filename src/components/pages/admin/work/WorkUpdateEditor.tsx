import { WorkType } from '@/drizzle/db';
import { WorkCodeEditor } from './editor/WorkCodeEditor';
import { WorkQuestionEditor } from './editor/WorkQuestionEditor';

interface Props {
	work: WorkType;
}

const WorkUpdateEditor = ({ work }: Props) => {
	return (
		<section key={work.answer + work.explain} className='w-full'>
			<div>
				{work.type == 'CODE' && (
					<div>
						<WorkCodeEditor work={work} />
					</div>
				)}
				{work.type == 'QUESTION' && (
					<div>
						<WorkQuestionEditor work={work} />
					</div>
				)}
			</div>
		</section>
	);
};

WorkUpdateEditor.displayName = 'WorkList';

export default WorkUpdateEditor;
