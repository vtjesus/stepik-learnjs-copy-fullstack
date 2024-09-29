'use client';
// import { CodeEditor } from '@/components/common/CodeEditor';
import { Question } from '@/components/common/Question';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { WorkType } from '@/drizzle/db';
import { BookTypeWork } from '@/types/Book';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
	work: WorkType;
}

const WorkElement = ({ work }: Props) => {
	const pathname = usePathname();
	console.log(pathname);

	return (
		<section
			key={work.answer + work.explain}
			className='w-full bg-background px-4 py-2 rounded-md'
		>
			{work.type == 'CODE' && (
				<div className='w-full h-full'>
					<Label className='text-xl'>{work.question}</Label>
					{/* <CodeEditor
						answer={work.answer}
						code={work.code!}
						language={work.language!}
						explain={work.explain}
						question={work.question}
						workId={work.id}
					/> */}
				</div>
			)}
			{work.type == 'QUESTION' && (
				<div className='w-full'>
					<Question
						question={{
							answer: work.answer,
							question: work.question,
							explain: work.explain,
							type: BookTypeWork.QUESTION,
							variant: work.variant!.split('..'),
						}}
						isScore={false}
						workId={work.id}
					/>
				</div>
			)}
			<Button variant={'outline'} className='flex justify-between p-0'>
				<Link
					href={`${pathname}/update/${work.id}`}
					className='w-full h-full p-2'
				>
					Изменить
				</Link>
			</Button>
		</section>
	);
};

WorkElement.displayName = 'WorkElement';

export { WorkElement };
