import { UserAnalitic } from '@/app/api/user/analitic/route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HTMLProps } from 'react';
import { ThumbsComment } from '../book/comment/ThumbsComment';
import { Link } from '@/components/common/Link';
import { formatDate } from '@/lib/time';

type Props = {
	user: UserAnalitic;
	className?: HTMLProps<HTMLOrSVGElement>['className'];
};

export const ListStats = ({ user, className }: Props) => {
	return (
		<div className={`${className} bg-accent rounded-md p-4`}>
			<Tabs defaultValue='chapters' className='w-full'>
				<TabsList className='bg-background'>
					<TabsTrigger
						className='hover:bg-accent [state=active]:bg-accent data-[state=active]:bg-accent'
						value='chapters'
					>
						Страница
					</TabsTrigger>
					<TabsTrigger
						className='hover:bg-accent [state=active]:bg-accent data-[state=active]:bg-accent'
						value='work'
					>
						Задания
					</TabsTrigger>
					<TabsTrigger
						className='hover:bg-accent [state=active]:bg-accent data-[state=active]:bg-accent'
						value='comment'
					>
						Комментарии
					</TabsTrigger>
				</TabsList>
				<TabsContent className='flex flex-col gap-2' value='chapters'>
					{user.userBooks.map(ub => (
						<div className='bg-background p-4 rounded-sm' key={ub.id}>
							<div className='flex justify-between w-full'>
								<Link path={ub.chapter?.title!} />
								{ub.chapter?.chapter}
							</div>
							<div>{formatDate(ub.created_at!.toString())}</div>
						</div>
					))}
				</TabsContent>
				<TabsContent className='flex flex-col gap-2' value='work'>
					{user.userWorks.map(uw => (
						<div className='bg-background p-4 rounded-sm' key={uw.id}>
							{uw.work?.question}
						</div>
					))}
				</TabsContent>
				<TabsContent value='comment'>
					{user.comments.map(com => (
						<div className='bg-accent p-2 rounded-sm' key={com.id}>
							<div className='flex md:justify-between mb-3 items-center'>
								<div className='flex w-full justify-between md:justify-normal md:gap-4 items-center'>
									<Avatar>
										<AvatarImage
											src={`https://ui-avatars.com/api/?name=${user.name}`}
										/>
										<AvatarFallback>{user.name}</AvatarFallback>
									</Avatar>

									{user.name}
								</div>
								{/* <div className='hidden md:block'>{com.created_at.getTime()}</div> */}
							</div>
							<div className='text-pretty break-words'>{com.content}</div>
							<Separator className='my-2 bg-background' />
							<ThumbsComment chapter_id={com.chapter_id ?? 0} comment={com} />
						</div>
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
};
