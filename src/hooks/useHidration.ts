'use client';
import { useState, useEffect } from 'react';

export default function useHidration(
	componentReady: JSX.Element,
	loadingComponent?: JSX.Element | string | null
) {
	const [component, setComponent] = useState(loadingComponent || null);

	useEffect(() => {
		setComponent(componentReady);
	}, [componentReady]);

	return component;
}
