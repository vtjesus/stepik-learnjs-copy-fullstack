import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { questions } from '../assets/book';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRandomQuestion() {
	const randomIndex = Math.floor(Math.random() * questions.length);
	return questions[randomIndex];
}

export const groupBy = <T>(
	array: T[],
	predicate: (value: T, index: number, array: T[]) => string
) =>
	array.reduce((acc, value, index, array) => {
		(acc[predicate(value, index, array)] ||= []).push(value);
		return acc;
	}, {} as { [key: string]: T[] });
