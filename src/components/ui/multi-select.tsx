'use client';
import React, { useRef } from 'react';

type MultiSelectProps = {
	attributes: React.InputHTMLAttributes<HTMLSelectElement>;
	options: string[];
};

export const MultiSelect = ({ attributes }: MultiSelectProps) => {
	const selectRef = useRef<HTMLSelectElement>(null);

	const handleTouchSelectList = () => {
		if (!selectRef.current) {
			return;
		}
		selectRef.current.focus();
	};

	return (
		<select {...attributes}>
			<option></option>
		</select>
	);
};
