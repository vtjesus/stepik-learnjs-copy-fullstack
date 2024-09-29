'use client';
import React, { memo, useRef, useState } from 'react';
import { Search as SVGSearch } from 'lucide-react';
import { Button } from '../../ui/button';
import { SearchBook } from '@/components/common/SearchBook';
import { useOnClickOutside } from 'usehooks-ts';
import { ModalSearch } from '@/components/common/modal/ModalSearch';

const Search = memo(() => {
	const [visible, setVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleToggleVisible = () => {
		setVisible(prev => !prev);
	};

	useOnClickOutside(ref, () => setVisible(false));

	return (
		<search
			ref={ref}
			className='cursor-pointer flex overflow-x-hidden z-40 overflow-y-visible'
		>
			<ModalSearch />
		</search>
	);
});

Search.displayName = 'Search';

export { Search };
