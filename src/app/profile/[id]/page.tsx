'use server';
import { UserAnalitic } from '@/app/api/user/analitic/route';
import { CircleChar } from '@/components/pages/profile/CircleChar';
import { Description } from '@/components/pages/profile/Description';
import { ListStats } from '@/components/pages/profile/ListStats';
import { Logout } from '@/components/pages/profile/Logout';
import { Resolve } from '@/components/pages/profile/Resolve';
import { TableVisit } from '@/components/pages/profile/TableVisit';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { isAdmin } from '@/lib/authGuardServer';
import { getUserAnalitic } from '@/request/user';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const user: UserAnalitic = await getUserAnalitic(params.id);

	return {
		title: user.name,
		description: user.description ?? '',
		openGraph: {
			url: `https://book-styde.vercel.app/profile/${params.id}`,
			title: user.name,
			description: user.description ?? '',
			siteName: 'book-styde',
		},
	};
}

export default async function Profile({ params }: { params: { id: string } }) {
	const user: UserAnalitic = await getUserAnalitic(params.id);

	if (!user || ('type' in user && user.type == 'error')) {
		redirect('/?verify=true');
	}

	return (
		<article className='flex px-[10%] flex-wrap lg:flex-nowrap gap-4 my-3'>
			<section className='lg:w-1/4 w-full'>
				<aside className='bg-accent rounded-md p-4'>
					<div className='flex gap-2'>
						<div className='flex justify-center items-center'>
							<Avatar className='w-[45px] h-[45px]'>
								<AvatarImage
									src={`https://ui-avatars.com/api/?name=${user.name}`}
								/>
								<AvatarFallback>{user.name}</AvatarFallback>
							</Avatar>
						</div>
						<div className='flex flex-col w-full h-full justify-between items-end'>
							<h3>{user.name}</h3>
						</div>
					</div>
					<Separator orientation='horizontal' className='bg-primary my-2' />
					<Description user={user} />
					{isAdmin() && (
						<div className='mt-2'>
							<Button className='w-full'>
								<Link href={'/admin/page'}>Редактирование страниц</Link>
							</Button>
						</div>
					)}
					<Logout className='mt-2 w-full' />
				</aside>
			</section>
			<section className='lg:w-3/4 w-full'>
				<div className='flex flex-row flex-wrap md:flex-nowrap gap-4'>
					<div className='md:w-1/2 w-full bg-accent rounded-md p-4 flex gap-2'>
						<div className='w-1/3 flex justify-center shrink-1 relative items-center'>
							<CircleChar
								resolve={
									(360 / 100) *
									(+user.analitic.work.current / +user.analitic.work.all) *
									100
								}
								className='w-full'
							/>
							<div className='absolute left-1/2 group top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center'>
								<div>
									<div className='text-[20px] font-medium text-label-1 dark:text-dark-label-1'>
										<span className='inline group-hover:stroke-white'>
											{user.analitic.work.current}
										</span>
										<span className='hidden group-hover:stroke-white'>
											{(+user.analitic.work.current / +user.analitic.work.all) *
												100}
											%
										</span>
									</div>
									<div className='whitespace-nowrap text-xs text-label-3 dark:text-dark-label-3'>
										решено
									</div>
								</div>
							</div>
						</div>
						<Resolve resolve={user.analitic.work} />
					</div>
					<div className='md:w-1/2 w-full bg-accent rounded-md p-4 flex gap-2'>
						<div className='w-1/3 flex justify-center shrink-1 relative items-center'>
							<CircleChar
								resolve={
									(360 / 100) *
									(+user.analitic.chapter.current /
										+user.analitic.chapter.all) *
									100
								}
								className='w-full'
							/>
							<div className='absolute left-1/2 group top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center'>
								<div>
									<div className='text-[20px] font-medium text-label-1 dark:text-dark-label-1'>
										<span className='inline group-hover:stroke-white'>
											{user.analitic.chapter.current}
										</span>
										<span className='hidden group-hover:stroke-white'>
											{(+user.analitic.chapter.current /
												+user.analitic.chapter.all) *
												100}
											%
										</span>
									</div>
									<div className='whitespace-nowrap text-xs text-label-3 dark:text-dark-label-3'>
										прочитано
									</div>
								</div>
							</div>
						</div>
						<Resolve resolve={user.analitic.chapter} />
					</div>
				</div>
				<div className='my-4 bg-accent rounded-md p-4'>
					<TableVisit visit={user.analitic.visiting} />
				</div>
				<ListStats user={user} />
			</section>
		</article>
	);
}
