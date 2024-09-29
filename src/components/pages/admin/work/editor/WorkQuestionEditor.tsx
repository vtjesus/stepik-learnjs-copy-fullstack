'use client';
import { Question } from '@/components/common/Question';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { WorkType } from '@/drizzle/db';
import { BookTypeWork } from '@/types/Book';
import { useState } from 'react';

interface Props {
	work?: WorkType;
}

export const WorkQuestionEditor = ({ work }: Props) => {
	const [question, setQuestion] = useState(work?.question ?? '');
	const [description, setDescription] = useState(work?.description ?? '');
	const [answer, setAnswer] = useState(work?.answer ?? '');
	const [explain, setExplain] = useState(work?.explain ?? '');

	const [variant, setVariant] = useState<string[]>(
		work?.variant?.split('..') ?? []
	);
	return (
		<div>
			<div>
				<Button>Сохранить</Button>
			</div>
			<div>
				<Textarea
					placeholder='Введите задание'
					value={question}
					onChange={e => setQuestion(e.target.value)}
				/>
				<Textarea
					placeholder='Введите описание(не обязательно)'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<Textarea
					placeholder='Введите ответ'
					value={answer}
					onChange={e => setAnswer(e.target.value)}
				/>
				<Textarea
					placeholder='Введите объяснение ответа'
					value={explain}
					onChange={e => setExplain(e.target.value)}
				/>
			</div>
			<div className='w-full h-full'>
				<Question
					question={{
						answer: answer,
						question: question,
						explain: explain,
						type: BookTypeWork.QUESTION,
						variant: variant,
					}}
					workId={1}
				/>
			</div>
		</div>
	);
};
