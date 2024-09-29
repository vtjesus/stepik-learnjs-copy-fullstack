import { WorkStudentResponse } from '@/app/api/work/student/route';
import { Link } from '@/components/common/Link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { memo } from 'react';

type WorkStudentProps = {
	teachers: WorkStudentResponse[];
};

const StudentWork = memo(({ teachers }: WorkStudentProps) => {
	return (
		<div>
			<Tabs
				defaultValue={teachers[0]?.name ?? ''}
				orientation='vertical'
				className='flex gap-1 px-24 w-full'
			>
				<TabsList className='min-w-[150px]'>
					{teachers.map(work => (
						<TabsTrigger
							className='px-[2px] w-full'
							value={work.name}
							key={work.id}
						>
							{work.name}
						</TabsTrigger>
					))}
				</TabsList>
				<div className=' p-0 m-0 w-full'>
					{teachers.map(work => (
						<TabsContent className='w-full m-0' value={work.name} key={work.id}>
							<WorkTabsContent teacher={work} />
						</TabsContent>
					))}
				</div>
			</Tabs>
		</div>
	);
});

const WorkTabsContent = memo(
	({ teacher }: { teacher: WorkStudentResponse }) => {
		return (
			<div className='p-2 border-2 rounded-md border-border w-full'>
				<h4 className='text-2xl'>{teacher.name}</h4>
				<p>{teacher.description}</p>
				<hr className='h-[2px] bg-border w-full mb-2 mt-1' />
				<div className='flex flex-wrap gap-2'>
					{teacher.teacherChapters.map(work => (
						<div
							className={`w-[max(320px,calc(50%-4px))] px-3 py-2 rounded-md border-2 ${
								work.completed ? 'border-green-500' : 'border-red-500'
							}`}
							key={work.id}
						>
							<div>
								<Link
									path={'page/' + work.chapter!.title}
									title={work.chapter!.title}
								/>
							</div>
							<div>{work.description}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
);

WorkTabsContent.displayName = 'WorkTabsContent';

StudentWork.displayName = 'StudentWork';
export { StudentWork };
