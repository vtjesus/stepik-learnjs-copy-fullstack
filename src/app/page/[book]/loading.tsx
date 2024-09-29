import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='flex w-full h-[calc(100vh-48px)] overflow-hidden'>
			<div className='hidden md:block border-r-[1px] w-[18vw] h-full'>
				<Skeleton className='w-[80%] h-8 mb-4' />
				<Skeleton className='w-[70%] h-4 mb-1' />
				<Skeleton className='w-[90%] h-full pb-6' />
			</div>
			<div className='md:w-[82vw] md:px-12 px-2 md:max-w-[82vw] w-full h-[100%]  md:border-l-[1px] flex flex-col'>
				<div className='w-full h-full flex flex-col '>
					<div className='flex justify-center items-center my-4'>
						<Skeleton className='w-[70%] h-8' />
					</div>
					<Skeleton className='w-[40%] h-4 my-3' />
					<Skeleton className='w-[100%] h-14 mb-1' />
					<Skeleton className='w-[100%] h-20 mb-1' />
					<Skeleton className='w-[70%] h-4 my-3' />
					<Skeleton className='w-[95%] h-8 mb-1' />
					<Skeleton className='w-[100%] h-12 mb-1' />
					<Skeleton className='w-[90%] h-26 mb-1' />
					<Skeleton className='w-[100%] h-14 mb-1' />
					<Skeleton className='w-[100%] h-4 my-3' />
					<Skeleton className='w-[80%] h-8 mb-1' />
					<Skeleton className='w-[60%] h-12 mb-1' />
					<Skeleton className='w-[90%] h-26 mb-1' />
				</div>
			</div>
		</div>
	);
}
