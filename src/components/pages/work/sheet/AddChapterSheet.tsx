'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getChapters } from '@/request/book';
import { ReactNode, memo, useEffect, useState } from 'react';
import { ChapterType } from '@/drizzle/db';
import { useFetch } from '@/hooks/useFetch';
import { ButtonLoader } from '@/components/common/ButtonLoader';
import { Loader } from 'lucide-react';
import { addWorkStudent } from '@/request/teacher';
import { getUser } from '@/lib/authGuardClient';
import { useRouter } from 'next/navigation';
import { usePromise } from '@/hooks/usePromise';
import { TeacherChapterPostDTO } from '@/app/api/work/teacher/chapter/route';
import { useToast } from '@/components/ui/use-toast';
import { getDataOrThrowError } from '@/lib/requestMiddleware';

type AddChapterSheetProps = ButtonProps & {
	userId?: number;
	userIds?: number[];
	group?: string;
	titleButton?: ReactNode;
};

const AddChapterSheet = memo(
	({
		userId,
		group,
		userIds,
		titleButton = 'Добавить задание',
		...attr
	}: AddChapterSheetProps) => {
		const [description, setDescription] = useState<string>('');
		const { refresh } = useRouter();
		const { value: chapters, loading } = usePromise<ChapterType[]>({
			promise: getChapters,
			defaultValue: [],
		});
		const { toast } = useToast();
		const [open, setOpen] = useState(false);

		const [chapter, setWork] = useState<string>('');

		const handleWorkSelect = async (selectId: string) => {
			setWork(() => selectId);
		};
		const handleSubmitAddChapterForm = async () => {
			if (!user) {
				throw Error('Вы не вошли');
			}

			if (chapter.length == 0) {
				throw Error(`Не выбрали задание: ${chapter}`);
			}

			let options: TeacherChapterPostDTO | null = null;

			if (userId) {
				options = {
					chapter_id: +chapter,
					student_id: userId,
					description: description,
					teacher_id: user.id,
				};
			}

			if (userIds) {
				options = {
					chapter_id: +chapter,
					students: userIds,
					description: description,
					teacher_id: user.id,
				};
			}

			if (group) {
				options = {
					chapter_id: +chapter,
					group: group,
					description: description,
					teacher_id: user.id,
				};
			}

			if (!options) {
				throw Error('Не пришли параметры');
			}
			const res = await addWorkStudent(options);
			const data = getDataOrThrowError(res);
			toast({
				title: data.message,
			});
			setOpen(false);
			refresh();
		};

		const {
			action: actionSubmit,
			loading: ActionLoading,
			error,
		} = useFetch({
			promise: () => handleSubmitAddChapterForm(),
		});
		const user = getUser();

		return (
			<Sheet open={open} onOpenChange={e => setOpen(e)}>
				<SheetTrigger asChild>
					<Button {...attr} variant='outline'>
						{titleButton}
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Добавить задание</SheetTitle>
						<SheetDescription>{`Добавить ${
							userId ? 'ученику' : userIds ? 'ученикам' : 'группе ' + group
						} задание`}</SheetDescription>
					</SheetHeader>
					<div className='flex flex-col gap-2 mt-3'>
						<div className='mb-2'>
							<Label htmlFor='work' className='text-right'>
								Задание
							</Label>
							<Select
								value={chapter}
								disabled={loading}
								onValueChange={handleWorkSelect}
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
												<div>Выберите задание</div>
											</div>
										}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{chapters!.map(chap => (
											<SelectItem
												className='justify-start'
												value={`${chap.id}`}
												key={chap.id}
											>
												{chap.title}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className='mb-2'>
							<Label htmlFor='description' className=''>
								Описание
							</Label>
							<Textarea
								id='description'
								className='max-h-1/2'
								onChange={e => setDescription(e.target.value)}
								value={description}
							/>
						</div>
					</div>
					<ButtonLoader loading={ActionLoading} onClick={actionSubmit}>
						Добавить
					</ButtonLoader>
					{error && <div className='text-red-800'>Ошибка: {error}</div>}
				</SheetContent>
			</Sheet>
		);
	}
);

AddChapterSheet.displayName = 'AddChapterSheet';
export { AddChapterSheet };
