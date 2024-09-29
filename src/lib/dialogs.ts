'use client';

const dialogs = ['keyword', 'register', 'verify'] as const;

export const openDialog = (dialog: (typeof dialogs)[number]) => {
	if (typeof window == undefined) {
		return;
	}

	params.set(dialog, 'yes');
};

export const closeDialog = (dialog: (typeof dialogs)[number]) => {
	if (!params.get(dialog) || typeof window == undefined) {
		return;
	}
	params.set(dialog, 'not');
};

export const toggleDialog = (dialog: (typeof dialogs)[number]) => {
	if (params.get(dialog) || typeof window == undefined) {
		params.delete(dialog);
		return;
	}
	params.set(dialog);
};

const params = {
	get(param: (typeof dialogs)[number]) {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(param);
	},

	has(param: (typeof dialogs)[number]) {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.has(param);
	},

	append(param: (typeof dialogs)[number]) {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.append(param, 'yes');
		window.location.assign(
			`${window.location.origin}${
				window.location.pathname
			}?${urlParams.toString()}`
		);
	},

	set(param: (typeof dialogs)[number], value: 'yes' | 'not' = 'yes') {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set(param, value);
		window.location.assign(
			`${window.location.origin}${
				window.location.pathname
			}?${urlParams.toString()}`
		);
	},

	delete(param: (typeof dialogs)[number]) {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.delete(param, 'yes');
		window.location.assign(
			`${window.location.origin}${
				window.location.pathname
			}?${urlParams.toString()}`
		);
	},

	size() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.size;
	},
};
