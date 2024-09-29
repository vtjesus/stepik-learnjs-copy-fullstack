export type ErrorNext = {
	type: 'error' | 'success' | 'message';
	message: string;
};

export const getDataOrThrowError = <
	T extends Record<string, any> | Array<T> | Record<string, any>
>(
	data: T
): T => {
	if (typeof data == 'object' && !Array.isArray(data)) {
		if ('type' in data && 'message' in data) {
			if (data['type'] == 'error') {
				throw Error(data['message']);
			}
			return data;
		}
		return data;
	}
	return data;
};
