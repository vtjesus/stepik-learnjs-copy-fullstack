import { getUser } from '@/lib/authGuardServer';
import { BookMarked, BookMarkedIcon, NotebookPenIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Teacher = () => {
	const user = getUser();
	return (
		<>
			{user && user.role && (
				<>
					{user.role == 'user' && (
						<>
							<Link href={`/work/student`}>
								<BookMarkedIcon />
							</Link>
						</>
					)}
					{user.role == 'admin' && (
						<>
							<Link href={`/work`}>
								<NotebookPenIcon />
							</Link>
						</>
					)}
				</>
			)}
		</>
	);
};
