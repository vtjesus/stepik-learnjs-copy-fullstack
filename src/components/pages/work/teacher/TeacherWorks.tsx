import {
	UserTeacherChapter,
	WorkTeacherResponse,
} from '@/app/api/work/teacher/route';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserType } from '@/drizzle/db';
import { Check, CrossIcon, PlusSquare, X } from 'lucide-react';
import React, { memo } from 'react';
import { AddChapterSheet } from '../sheet/AddChapterSheet';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AddStudent } from '../sheet/AddStudent';
import { Link } from '@/components/common/Link';

type WorkTeacherProps = {
	works: WorkTeacherResponse;
};

const TeacherWorks = memo(({ works }: WorkTeacherProps) => {
	const groups = Object.keys(works);
	return (
		<Tabs className='w-full h-full flex px-24 py-2' orientation='vertical'>
			<TabsList className='h-full rounded-r-none p-0 min-w-48 w-max'>
				<Accordion type='multiple' className='overflow-visible w-full'>
					<AddStudent
						variant={'ghost'}
						titleButton='Добавить студента'
						className='p-1 m-0 text-center flex justify-center items-center w-full'
					/>
					{groups.map(group => (
						<AccordionItem
							key={group}
							className='m-0 p-0 overflow-visible'
							value={group}
						>
							<div className='disable_h3 overflow-visible'>
								<AccordionTrigger className='m-0 p-0'>
									<div className='ml-1 gap-1 flex items-center text-nowrap'>
										<AddChapterSheet
											group={group}
											className='p-0 m-0 h-min bg-secondary border-none'
											titleButton={<PlusSquare width={16} height={16} />}
										/>
										<div>{group}</div>
									</div>
								</AccordionTrigger>
								<AccordionContent
									style={{ overflow: 'visible' }}
									className='pb-[1px] flex flex-col !overflow-visible'
								>
									{works[group].map(student => (
										<TabsTrigger
											key={student.id}
											className='w-full justify-start data-[state=active]:scale-x-105 data-[state=active]:translate-x-[6px] border-none outline-none'
											value={student.name}
										>
											{student.name}
										</TabsTrigger>
									))}
								</AccordionContent>
							</div>
						</AccordionItem>
					))}
				</Accordion>
			</TabsList>
			<div className='bg-background w-full '>
				{groups.map(group => (
					<div key={group} className='w-full'>
						{works[group].map(student => (
							<TabsContent
								key={student.id}
								className='w-full h-full m-0'
								value={student.name}
							>
								<WorkTabsContent work={student} />
							</TabsContent>
						))}
					</div>
				))}
			</div>
		</Tabs>
	);
});

const WorkTabsContent = ({ work }: { work: UserTeacherChapter }) => {
	return (
		<div className='px-4 py-2 w-full	 border-2 border-secondary bg-background rounded-x-md rounded-r-md rounded-l-none'>
			<div className='flex justify-between'>
				<div>
					<h2 className='text-xl'>{work.name}</h2>
				</div>
				<div>
					<AddChapterSheet userId={work.id} />
				</div>
			</div>
			<div className='line-clamp-2'>{work.description}</div>
			<hr className='bg-border my-2' />
			<div>
				<div>Задание данные студенту:</div>
				<div className='flex flex-wrap gap-2'>
					{work.teacherStudentChapters.length > 0
						? work.teacherStudentChapters.map(chapter => (
								<div
									className={`w-[calc(50%-4px)] px-4 py-2 border-2 ${
										chapter.completed ? 'border-green-500' : 'border-red-500'
									} rounded-md`}
									key={chapter.id}
								>
									<Link
										path={`page/${chapter.chapter!.title}`}
										title={chapter.chapter!.title}
									/>
								</div>
						  ))
						: 'Ничего не задано'}
				</div>
			</div>
		</div>
	);
};

TeacherWorks.displayName = 'TeacherWorks';
export { TeacherWorks };
