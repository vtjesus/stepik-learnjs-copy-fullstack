import { useCallback, useState } from 'react';

type useFetchRes<T> = {
	action: () => void;
	value: T | null;
	loading: boolean;
	error: any;
	loaded: boolean;
};

type useFetchProps<T> = {
	promise: () => Promise<T>;
	defaultValue?: T;
	options?: any;
};

export const useFetch = <T>({
	defaultValue,
	promise,
}: useFetchProps<T>): useFetchRes<T> => {
	const [value, setValue] = useState<T | null>(defaultValue || null);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const [error, setError] = useState<any>();

	const action = useCallback(async () => {
		setLoading(true);
		promise()
			.then(data => {
				setValue(data);
			})
			.catch((e: Error) => {
				setError(e.message);
			})
			.finally(() => {
				setLoading(false);
				setLoaded(true);
			});
	}, [promise]);

	return {
		action,
		error,
		loading,
		value,
		loaded,
	};
};
