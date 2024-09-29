'use client';

import { VariantChannel } from '@/lib/socket';
import { SocketListener } from '../SocketListener';
import { useRouter } from 'next/navigation';
import { SOCKET_ACTION_REFRESH } from '@/types/const/const';

export type SocketListenerChapterType = {
	channel: string | number;
	variant?: VariantChannel;
};

export const SocketListenerChapter = ({
	channel,
	variant,
}: SocketListenerChapterType) => {
	const { refresh } = useRouter();

	return (
		<SocketListener
			channel={channel}
			variant={variant}
			handler={(arg: any) => {
				if (SOCKET_ACTION_REFRESH == arg) {
					refresh();
				}
			}}
		/>
	);
};
