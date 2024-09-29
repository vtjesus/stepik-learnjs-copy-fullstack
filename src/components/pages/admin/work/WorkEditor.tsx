import { WorkType } from '@/types/Book';
import React from 'react';
import { WorkCodeEditor } from './editor/WorkCodeEditor';

interface Props {
	type: WorkType;
}

export const WorkEditor = ({ type }: Props) => {
	return (
		<>
			{type == 'CODE' ? (
				<WorkCode />
			) : (
				<div>
					<WorkQuestion />
				</div>
			)}
		</>
	);
};

const WorkCode = () => {
	return (
		<div>
			<div>
				<WorkCodeEditor />
			</div>
		</div>
	);
};

const WorkQuestion = () => {
	return '';
};
