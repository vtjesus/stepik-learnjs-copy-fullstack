export const timer = async (time: number) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res('');
		}, time);
	});
};
