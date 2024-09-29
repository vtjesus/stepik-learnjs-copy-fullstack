'use server';
import { Skeleton } from '@/components/ui/skeleton';
import { InputComment } from './comment/InputComment';
import { FC, Suspense } from 'react';
import { getCommentsByChapterId } from '@/request/comment';
import { CommentChapter } from '@/app/api/comment/route';
import { ListComment } from './comment/ListComment';
import { SocketListenerChapter } from '@/components/common/socket/SocketListenerChapter';

interface Props {
	chapter_id: number;
	comments: CommentChapter[];
}

const Comments: FC<Props> = ({ chapter_id, comments }) => {
	return (
		<section className='my-4 w-full'>
			<SocketListenerChapter channel={chapter_id} variant='chapter' />
			<article className=''>
				<h2 className='text-xl font-bold mb-3'>
					{comments?.length ?? 0} комментариев
				</h2>
				<InputComment chapter_id={chapter_id} />
				<Suspense fallback={<Skeleton className='w-full h-12' />}>
					<ListComment chapter_id={chapter_id} comments={comments} />
				</Suspense>
			</article>
		</section>
	);
};

Comments.displayName = 'Comments';

export { Comments };
