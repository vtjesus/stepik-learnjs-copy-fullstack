'use client';
import { ChapterSearch } from '@/app/api/book/search/route';
import { Textarea } from '@/components/ui/textarea';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { Content } from '../../book/Content';
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-markup';
import { useFetch } from '@/hooks/useFetch';
import { updateBookContent } from '@/request/book';
import { ButtonLoader } from '@/components/common/ButtonLoader';
import { useDebounce } from 'use-debounce';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { InfoDialog } from './InfoDialog';
import { Link } from '@/components/common/Link';

type Props = {
	book: ChapterSearch;
};

const ContnetMemo = memo(Content);

const ContentEditable: FC<Props> = memo(({ book }) => {
	const [content, setContent] = useState(book.content);
	const { action, loading } = useFetch({
		promise: () => updateBookContent(book.id, content),
		defaultValue: {},
	});
	const [debounceValue] = useDebounce(content, 1000);

	const editableBook: ChapterSearch = useMemo(() => {
		const newBook = Object.assign({}, book);
		newBook.content = content;
		return newBook;
	}, [debounceValue, book, content]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!loading) {
				action();
			}
		}, 60000);

		return () => {
			clearInterval(intervalId);
		};
	}, [action, loading]);

	return (
		<section className='w-full h-full px-2 py-3'>
			<div className='flex justify-between'>
				<div className='flex justify-between w-1/3'>
					<div className='flex'>
						<div>Редактор</div>
						<ButtonLoader
							onClick={action}
							loading={loading}
							variant={'secondary'}
							className='ml-2 h-6 p-1 rounded-b-none'
						>
							Сохранить
						</ButtonLoader>
					</div>
				</div>
				<div className='w-1/3 flex justify-center items-center'>
					<Link
						className='hover:border-b-2 border-blue-700 hover:text-blue-700'
						path={`admin/work/${book.title}`}
						title='Перейти к редактированию работ'
					/>
				</div>
				<div className='flex h-6 w-1/3 justify-end'>
					<div>
						<InfoDialog />
					</div>
					<div>Рендер</div>
				</div>
			</div>
			<ResizablePanelGroup direction='horizontal' className='border-t-[4px]'>
				<ResizablePanel>
					<Editor
						value={content}
						onValueChange={e => setContent(e ?? '')}
						highlight={code => highlight(code, languages.markup)}
						padding={10}
						placeholder={'Enter your html code'}
						className='w-full min-h-10 text-pretty'
					/>
				</ResizablePanel>
				<ResizableHandle className='mr-3 w-[4px]' />
				<ResizablePanel>
					<ContnetMemo book={editableBook} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</section>
	);
});

ContentEditable.displayName = 'ContentEditable';

export { ContentEditable };
