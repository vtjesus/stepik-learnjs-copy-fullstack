import { useEffect, useState } from 'react';

type usePromiseRes<T> = {
	value: T;
	loading: boolean;
	error: any;
	loaded: boolean;
};

type usePromiseProps<T> = {
	promise: () => Promise<T>;
	defaultValue: T;
	options?: any;
};

export const usePromise = <T>({
	defaultValue,
	promise,
}: usePromiseProps<T>): usePromiseRes<T> => {
	const [value, setValue] = useState<T>(defaultValue);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const [error, setError] = useState<any>();

	useEffect(() => {
		setLoading(true);

		promise()
			.then(data => {
				setValue(data);
			})
			.catch(e => {
				setError(JSON.stringify(e));
			})
			.finally(() => {
				setLoading(false);
				setLoaded(true);
			});
	}, [promise]);

	return {
		error,
		loading,
		value,
		loaded,
	};
};
