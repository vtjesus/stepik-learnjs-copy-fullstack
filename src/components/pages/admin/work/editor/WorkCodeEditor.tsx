'use client';
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CodeEditor } from '@/components/common/CodeEditor';
import { Button } from '@/components/ui/button';
import { WorkType } from '@/drizzle/db';

type LanguageCode = 'js' | 'markup' | 'css';

interface Props {
	work?: WorkType;
}

const WorkCodeEditor = memo(({ work }: Props) => {
	const [question, setQuestion] = useState(work?.question ?? '');
	const [description, setDescription] = useState(work?.description ?? '');
	const [answer, setAnswer] = useState(work?.answer ?? '');
	const [explain, setExplain] = useState(work?.explain ?? '');

	const [code, setCode] = useState(work?.code ?? '');
	const [language, setLanguage] = useState<null | LanguageCode>(
		(work?.language as LanguageCode) ?? null
	);
	return (
		<div>
			<div>
				<Button>Сохранить</Button>
			</div>
			<div>
				<Textarea
					placeholder='Введите задание'
					value={question}
					onChange={e => setQuestion(e.target.value)}
				/>
				<Textarea
					placeholder='Введите описание(не обязательно)'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<Textarea
					placeholder='Введите ответ'
					value={answer}
					onChange={e => setAnswer(e.target.value)}
				/>
				<Textarea
					placeholder='Введите объяснение ответа'
					value={explain}
					onChange={e => setExplain(e.target.value)}
				/>
				<Select onValueChange={e => setLanguage(e as LanguageCode)}>
					<SelectTrigger>
						<SelectValue placeholder={'Выберите язык'} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='js'>JavaScrip</SelectItem>
						<SelectItem value='css'>CSS</SelectItem>
						<SelectItem value='markup'>HTML</SelectItem>
					</SelectContent>
				</Select>
				{language && (
					<Editor
						value={code}
						onValueChange={e => setCode(e)}
						highlight={code => highlight(code, languages[language])}
						padding={10}
						placeholder={'Введите ваш код'}
						className='w-full min-h-10 text-pretty'
					/>
				)}
			</div>
			<div className='w-full h-full'>
				<Label className='text-xl'>{question}</Label>
				<CodeEditor
					answer={answer}
					code={code!}
					language={language!}
					explain={explain}
					question={question}
					workId={1}
				/>
			</div>
		</div>
	);
});

WorkCodeEditor.displayName = 'WorkCodeEditor';

export { WorkCodeEditor };
