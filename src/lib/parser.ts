'use client';
import { hslToHex } from './colors';

const style = `
	img {
				width: 100%;
		height: 100%;
		object-fit: contain;
	}

	html,
	body {
		width: 100%;
		height: min-content;
	}
`;

export const transformCodeToParse = (code: string): string => {
	let result =
		`const result = []; 
		function push(...el) {
			let rets = el.join(', ');
			result.push(JSON.stringify(rets))
		};` +
		code +
		`${code.trim().at(-1) == ';' ? '' : ';'}return result;`;
	result = result.replaceAll('alert(', 'push(');
	result = result.replaceAll('console.log(', 'push(');
	return result;
};

export const transfoncCodeToValidCss = (code: string, html: string): string => {
	let bodyStyles =
		typeof window !== 'undefined'
			? window.getComputedStyle(document.body).getPropertyValue('--foreground')
			: '0 0% 98%';

	let ht = html;
	code = code.replaceAll('body', '.main_start');
	code = code.replaceAll('*', '.main_start');
	code = code.replaceAll('html', '.main_start');

	ht = ht.replaceAll('<body', '<div class="main_start"');
	ht = ht.replaceAll('</body', '</div');
	ht = ht.replaceAll('<html', '<div class="main_start"');
	ht = ht.replaceAll('</html', '</div');
	ht = ht.replaceAll('/<!-- (.*?) -->/gm', '');
	ht = ht.replaceAll('/<-- (.*?) -->/gm', '');

	ht = ht.replaceAll('<head', '<div');
	ht = ht.replaceAll('</head', '</div');

	let result = `
		<style>
	* {
		background-color: background: rgba(0,0,0,0);
		color: ${hslToHex(bodyStyles)};
	}
	${style}
	${code}
	</style>
	${ht}`;
	return result;
};

export const transfoncCodeToValidHTML = (code: string): string => {
	let bodyStyles =
		typeof window !== 'undefined'
			? window.getComputedStyle(document.body).getPropertyValue('--foreground')
			: '0 0% 98%';
	let ht = code;

	ht = ht.replaceAll('<body', '<div class="main_start"');
	ht = ht.replaceAll('</body', '</div');
	ht = ht.replaceAll('<html', '<div class="main_start"');
	ht = ht.replaceAll('</html', '</div');
	ht = ht.replaceAll('/<!-- (.*?) -->/gm', '');
	ht = ht.replaceAll('/<-- (.*?) -->/gm', '');

	ht = ht.replaceAll('<head', '<div');
	ht = ht.replaceAll('</head', '</div');

	let result = `
	${code}
	<style>
	* {
		background-color: rgba(0,0,0,0) !important;
		color: ${hslToHex(bodyStyles)};
	}
${style}
	</style>
	`;
	return result;
};
