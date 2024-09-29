export enum BookTypeWork {
	CODE,
	QUESTION,
}

export type WorkType = 'CODE' | 'QUESTION';

type language = 'javascript' | 'css' | 'html';
type part = 'javascript' | 'css' | 'html' | 'дизайн';

export type Books = {
	book: BookPart[];
};

export type BookPart = {
	[x: string]: any;
	title: string;
	book: string;
	content: string;
	works: (CodeWork | QuestionWork)[];
};

export type CodeWork = {
	type: BookTypeWork.CODE;
	question: string;
	code: string;
	answer: string;
	explain: string;
	language: language;
};

export type QuestionWork = {
	type: BookTypeWork.QUESTION;
	question: string;
	answer: string;
	explain: string;
	variant: string[];
};
