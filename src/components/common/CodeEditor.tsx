'use client';
import Editor from 'react-simple-code-editor';
import { PropsWithChildren, useState } from 'react';
// @ts-ignore
import { Play } from 'lucide-react';
import parse from 'react-html-parser';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';

// @ts-ignore
// import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	transfoncCodeToValidCss,
	transfoncCodeToValidHTML,
	transformCodeToParse,
} from '@/lib/parser';
import { Button } from '../ui/button';
import { highlight, languages } from 'prismjs';
import dedent from 'dedent';
import { Label } from '../ui/label';
import { BookTypeWork, CodeWork } from '@/types/Book';

const CodeEditor = ({
	code,
	language,
	compile = true,
	disable = false,
	answer,
	explain,
	question,
	workId,
}: {
	code: string;
	language: string;
	compile?: boolean;
	disable?: boolean;
	answer: string;
	explain: string;
	question: string;
	workId: number;
}) => {
	const [coder, setCode] = useState(dedent`${code as string}`);
	const [html, setHtml] = useState(`<body>

</body>`);
	const [result, setResult] = useState<{
		type: 'error' | 'successefuly';
		result: string[];
	}>();
	const [help, setHelp] = useState('');

	const handleInputCode = (e: string) => {
		setCode(e);
	};

	const runCode = () => {
		try {
			const evalq = new Function(transformCodeToParse(coder))();
			setResult({ result: evalq, type: 'successefuly' });
		} catch (err: any) {
			setResult({ result: [err.message], type: 'error' });
			/*In html make a div and put id "screen" in it for this to work
		you can also replace this line with document.write or alert as per your wish*/
		}
	};

	const showResolve = () => {
		setHelp(explain + '\n' + `Ответ: ${answer}`);
	};

	const verifyResolve = () => {
		if (result?.type == 'successefuly') {
			if (JSON.parse(result.result.join(',')) == String(answer)) {
				setHelp('Задача решена');
			} else {
				setHelp('Ответ неверный, попробуйте снова');
			}
		} else {
			setHelp('Произошла ошибка, исправьте и попробуйте снова');
		}
	};

	return (
		<div className='w-full h-auto overflow-auto'>
			<div className='relative flex flex-col min-h-10 max-h-64 h-auto overflow-auto mb-4 w-full'>
				<ResizablePanelGroup
					direction='horizontal'
					style={{ overflow: 'auto' }}
				>
					<ResizablePanel
						minSize={15}
						defaultSize={50}
						style={{ overflow: 'auto' }}
					>
						<Tabs defaultValue='language'>
							{(language == 'css' || language == 'js') && (
								<TabsList>
									<TabsTrigger value='language'>index.{language}</TabsTrigger>
									<TabsTrigger value='html'>index.html</TabsTrigger>
								</TabsList>
							)}
							<TabsContent value='language'>
								<Editor
									value={coder}
									onValueChange={e => handleInputCode(e ?? '')}
									highlight={code =>
										highlight(code, languages[language], language)
									}
									padding={10}
									disabled={disable}
									placeholder={String(code)}
									className='w-full scroll_class h-full min-h-10 bg-accent rounded-md'
								/>
							</TabsContent>
							<TabsContent value='html'>
								<Editor
									value={html}
									onValueChange={e => setHtml(e ?? '')}
									highlight={code =>
										highlight(code, languages.markup, 'markup')
									}
									padding={10}
									disabled={disable}
									placeholder={'Enter your html code'}
									className='w-full scroll_class min-h-10 bg-accent rounded-md'
								/>
							</TabsContent>
							{language != 'css' && language != 'markup' && (
								<Play
									onClick={runCode}
									className='w-8 h-8 stroke-green-700 absolute top-[10px] hover:fill-green-900 hover:stroke-green-900 right-6 fill-green-700 '
								/>
							)}
						</Tabs>
					</ResizablePanel>
					{(language == 'css' || language == 'markup') && compile && (
						<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
					)}
					{language == 'css' && compile && (
						<ResizablePanel
							className='bg-accent rounded-md'
							minSize={15}
							maxSize={85}
							defaultSize={50}
						>
							<iframe
								loading='lazy'
								srcDoc={transfoncCodeToValidCss(code, html)}
							></iframe>
						</ResizablePanel>
					)}
					{language == 'markup' && compile && (
						<ResizablePanel
							className='bg-accent rounded-md'
							minSize={15}
							maxSize={85}
							defaultSize={50}
						>
							<iframe
								loading='lazy'
								srcDoc={transfoncCodeToValidHTML(code)}
							></iframe>
						</ResizablePanel>
					)}
				</ResizablePanelGroup>
				{result && result.result.length > 0 && (
					<div className='mt-2 flex bg-accent rounded-md p-3 gap-2'>
						<div>Вывод:</div>
						<div className='flex flex-col gap-2'>
							{result?.result.map(res => (
								<div
									className={`${
										result && result.type == 'error'
											? 'text-red-400'
											: 'text-green-500'
									}`}
									key={res}
								>
									{res}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			<div className='flex justify-between items-center'>
				<Button onClick={showResolve}>Решение</Button>
				{help.length > 0 && (
					<div className='text-xs overflow-auto text-wrap flex bg-accent justify-center h-[35px] rounded-sm items-center w-1/2'>
						{help}
					</div>
				)}
				<Button onClick={verifyResolve}>Проверить</Button>
			</div>
		</div>
	);
};

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor };
