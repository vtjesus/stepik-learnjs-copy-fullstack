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
import { highlight, languages } from 'prismjs/components/prism-core';
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
import dedent from 'dedent';

const Code = ({
	children,
	language,
	metadata,
	compile = true,
	disable = false,
}: PropsWithChildren & {
	language: string;
	metadata?: string;
	compile?: boolean;
	disable?: boolean;
}) => {
	const [code, setCode] = useState(dedent`${children as string}`);
	const [html, setHtml] = useState(`<body>
	${metadata ? metadata : ''}
</body>`);

	const [result, setResult] = useState<{
		type: 'error' | 'successefuly';
		result: string[];
	}>();

	const handleInputCode = (e: string) => {
		setCode(e);
	};

	const runCode = () => {
		try {
			const evalq = new Function(transformCodeToParse(code))();
			setResult({ result: evalq, type: 'successefuly' });
		} catch (err) {
			if (err instanceof SyntaxError)
				setResult({ result: [err.message], type: 'error' });
			/*In html make a div and put id "screen" in it for this to work
		you can also replace this line with document.write or alert as per your wish*/
		}
	};

	const allowLang = ['js', 'markup', 'css'];

	return (
		<div className='relative flex flex-col min-h-10 max-h-64 overflow-hidden my-4 w-full h-full'>
			<ResizablePanelGroup direction='horizontal' className='overflow-scroll'>
				<ResizablePanel
					minSize={15}
					defaultSize={50}
					maxSize={256}
					className='!overflow-scroll bg-accent rounded-md'
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
								value={code}
								onValueChange={e => handleInputCode(e ?? '')}
								highlight={code =>
									highlight(
										code,
										allowLang.includes(language)
											? languages[language]
											: languages.markup
									)
								}
								padding={10}
								disabled={disable}
								placeholder={String(children)}
								className='w-full h-full min-h-10 bg-accent'
							/>
						</TabsContent>
						<TabsContent value='html' className=''>
							<Editor
								value={html}
								onValueChange={e => setHtml(e ?? '')}
								highlight={code => highlight(code, languages.markup)}
								padding={10}
								disabled={disable}
								placeholder={'Enter your html code'}
								className='w-full min-h-10 '
							/>
						</TabsContent>
						{language == 'js' && (
							<Play
								onClick={runCode}
								className='w-8 h-8 stroke-green-700 absolute top-1 hover:fill-green-900 hover:stroke-green-900 right-6 fill-green-700 '
							/>
						)}
					</Tabs>
				</ResizablePanel>
				{(language == 'css' || language == 'markup') && compile && (
					<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
				)}
				{language == 'css' && (
					<>
						<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
						<ResizablePanel
							className='bg-accent !overflow-scroll rounded-md'
							minSize={15}
							maxSize={256}
							defaultSize={50}
						>
							<iframe
								loading='lazy'
								srcDoc={transfoncCodeToValidCss(code, html)}
							></iframe>
							{/* {parse(transfoncCodeToValidCss(code, html))} */}
						</ResizablePanel>
					</>
				)}
				{language == 'markup' && (
					<>
						<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
						<ResizablePanel
							minSize={15}
							maxSize={256}
							defaultSize={50}
							className='bg-accent !overflow-scroll result_hmtl rounded-md p-[6px] '
						>
							<iframe
								className='h-min w-full'
								onLoad={ev => {
									ev!.currentTarget!.style.height =
										ev!.currentTarget!.contentWindow!.document.body
											.scrollHeight +
										32 +
										'px';
								}}
								srcDoc={transfoncCodeToValidHTML(code)}
							></iframe>
							{/* {parse(transfoncCodeToValidHTML(code))} */}
						</ResizablePanel>
					</>
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
	);
};

Code.displayName = 'Code';

export { Code };
