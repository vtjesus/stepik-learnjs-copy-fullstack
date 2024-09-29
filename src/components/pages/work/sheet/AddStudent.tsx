'use client';
import { AllUserResponse } from '@/app/api/user/all/route';
import { WorkTeacherStudentDTO } from '@/app/api/work/teacher/student/route';
import { ButtonLoader } from '@/components/common/ButtonLoader';
import { Button, ButtonProps } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { UserType } from '@/drizzle/db';
import { useFetch } from '@/hooks/useFetch';
import { usePromise } from '@/hooks/usePromise';
import { getUser } from '@/lib/authGuardClient';
import { groupBy } from '@/lib/utils';
import { addTeacherStudent } from '@/request/teacher';
import { getAllUsers } from '@/request/user';
import { STUDENT_WITHOUT_GROUP } from '@/types/const/const';
import { Select } from '@radix-ui/react-select';
import { Loader } from 'lucide-react';
import React, { memo, useMemo, useState } from 'react';

type AddStudentProps = ButtonProps & {
	titleButton: string;
};

const AddStudent = memo(
	({ titleButton = 'Добавить студента', ...attr }: AddStudentProps) => {
		const { loading, value: users } = usePromise<AllUserResponse[]>({
			promise: () => getAllUsers(),
			defaultValue: [],
		});
		const [student, setStudent] = useState('');
		const [open, setOpen] = useState(false);
		const user = getUser();

		const handleAddStudent = async () => {
			let body: WorkTeacherStudentDTO | null = null;
			const [key, value] = student.split('=');
			if (key == 'group') {
				console.log('group');

				body = {
					teacher_id: user!.id,
					group: value,
				};
			} else if (key == 'student') {
				body = {
					teacher_id: user!.id,
					student_id: +value,
				};
			} else if (key == 'students') {
				body = {
					teacher_id: user!.id,
					students: value.split(',').map(id => +id),
				};
			}

			console.log(body);

			if (!body) {
				throw Error('Не пришли параметры');
			}
			await addTeacherStudent(body);
		};

		const {
			loading: ActionLoading,
			action: ActionSubmit,
			error,
		} = useFetch({
			promise: () => handleAddStudent(),
		});

		const studentOrderByGroup = useMemo(() => {
			return groupBy(users, users => {
				if (!users.group) {
					return STUDENT_WITHOUT_GROUP;
				} else {
					return users.group;
				}
			});
			// return users.reduce<Record<string, AllUserResponse[]>>((acc, user) => {
			// 	if (!user.group) {
			// 		if (acc[STUDENT_WITHOUT_GROUP]) {
			// 			acc[STUDENT_WITHOUT_GROUP].push(user);
			// 		} else {
			// 			acc[STUDENT_WITHOUT_GROUP] = [user];
			// 		}
			// 		return acc;
			// 	}
			// 	if (acc[user.group]) {
			// 		acc[user.group].push(user);
			// 	} else {
			// 		acc[user.group] = [user];
			// 	}
			// 	return acc;
			// }, {});
		}, [users]);

		return (
			<Sheet open={open} onOpenChange={e => setOpen(e)}>
				<SheetTrigger asChild>
					<Button {...attr} variant='outline'>
						{titleButton}
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Зачисление студента</SheetTitle>
						<SheetDescription>
							Зачислить студента к преподавателю
						</SheetDescription>
					</SheetHeader>
					<div className='flex flex-col gap-2 mt-3'>
						<div className='mb-2'>
							<Label htmlFor='work' className='text-right'>
								Студент
							</Label>
							<Select
								value={student}
								disabled={loading}
								onValueChange={e => setStudent(e)}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											<div className='flex justify-between '>
												<div>
													{loading && (
														<Loader className='scale-90 stroke-primary animate-spin-slow spin-in spin-out-180' />
													)}
												</div>
												<div>Выберите группу или студента</div>
											</div>
										}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{Object.entries(studentOrderByGroup)!.map(
											([group, students]) => (
												<div key={group}>
													<SelectItem value={`group=${group}`}>
														Группа - {group}
													</SelectItem>
													{students.map(student => [
														<SelectItem
															value={`student=${student.id}`}
															key={student.id}
														>
															{student.name}
														</SelectItem>,
													])}
												</div>
											)
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
					{/* <SheetFooter> */}
					{/* <SheetClose asChild> */}
					<ButtonLoader loading={ActionLoading} onClick={ActionSubmit}>
						Добавить студента
					</ButtonLoader>
					{error && <div className='text-red-800'>Ошибка: {error}</div>}
					{/* </SheetClose> */}
					{/* </SheetFooter> */}
				</SheetContent>
			</Sheet>
		);
	}
);

AddStudent.displayName = 'AddStudent';
export { AddStudent };
