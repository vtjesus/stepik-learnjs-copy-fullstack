'use client';

import { useEffect } from 'react';
import { VariantChannel, listenMessage, socket } from '@/lib/socket';

export type SocketListenerType = {
	channel: string | number;
	variant?: VariantChannel;
	handler: (arg: any[]) => void;
};

export const SocketListener = ({
	channel,
	variant = 'chapter',
	handler,
}: SocketListenerType) => {
	useEffect(() => {
		listenMessage(channel, variant, handler);
		// return () => {
		// 	socket.disconnect();
		// };
	}, []);
	return <></>;
};
