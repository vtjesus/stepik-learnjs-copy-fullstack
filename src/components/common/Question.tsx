'use client';
import { BookTypeWork, QuestionWork } from '@/types/Book';
import React, { FC, memo, useState } from 'react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { addResolvedWork } from '@/request/work';
import { getCookie, hasCookie } from 'cookies-next';

interface Props {
	question: QuestionWork;
	workId: number;
	isScore?: boolean;
}

const Question = memo(({ question, workId, isScore }: Props) => {
	const { answer: answ, explain, question: quest, variant } = question;
	const [answer, setAnswer] = useState('');
	const [help, setHelp] = useState('');

	const showResolve = () => {
		setHelp(explain);
	};

	const verifyResolve = () => {
		if (answer == answ) {
			setHelp('Задача решена');
			if (!isScore) {
				return;
			}
			addResolvedWork(
				hasCookie('user') && JSON.parse(getCookie('user')!).id,
				workId
			);
		} else {
			setHelp('Ответ неве/Создание_гиперссылокрный, попробуйте снова');
		}
	};

	return (
		<div className='my-4'>
			<h4 className='text-2xl mb-2'>{quest}</h4>
			<div className='flex gap-1 flex-col'>
				{variant.length > 0 ? (
					variant.map(varia => (
						<div
							className='flex gap-2 items-center disable_hover_button'
							key={varia}
						>
							<Checkbox
								onClick={() => setAnswer(varia)}
								checked={answer == varia}
								id={varia}
							/>
							<Label
								className=' text-center align-middle h-min'
								htmlFor={varia}
							>
								{varia}
							</Label>
						</div>
					))
				) : (
					<Input value={answer} onChange={e => setAnswer(e.target.value)} />
				)}
			</div>
			<div className='mt-2 flex justify-between items-center'>
				<Button onClick={showResolve}>Решение</Button>
				{help.length > 0 && (
					<div className='text-xs overflow-auto text-wrap flex bg-accent justify-center h-[35px] rounded-sm items-center w-1/2'>
						{help}
					</div>
				)}
				<Button onClick={verifyResolve}>Проверить</Button>
			</div>
		</div>
	);
});

Question.displayName = 'Question';

export { Question };
