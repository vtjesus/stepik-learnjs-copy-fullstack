export const getTextFromRef = (ref: React.RefObject<HTMLDivElement>) => {
	if (!ref.current) throw Error('Элемент не пришёл');
	let textTemp = ref.current?.innerText;
	const el = ref.current;
	const range = document.createRange();
	range.selectNodeContents(el);
	const selection = window.getSelection();

	if (!selection) throw Error('Нет выбраного текста');
	selection.removeAllRanges();
	selection.addRange(range);
	const selectRange = window.getSelection();

	if (selectRange) {
		textTemp = selectRange.toString();
	}

	return textTemp;
};
