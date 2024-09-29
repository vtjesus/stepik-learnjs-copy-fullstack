'use client';

import { SOCKET_ACTIONS, SOCKET_ACTION_REFRESH } from '@/types/const/const';
import { io } from 'socket.io-client';

export const socket = io(
	`ws://${process.env.NEXT_PUBLIC_URL_DOMAIN}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`
);

const variant = ['chapter'] as const;
export type VariantChannel = (typeof variant)[number];
export type ActionSocket = SOCKET_ACTIONS;
export type ActionSocketMessage = ActionSocket | string;
export type SocketAction = { channel: string; message: SOCKET_ACTIONS };

export const sendMessage = (
	channel: string | number,
	variant: VariantChannel = 'chapter',
	message: ActionSocketMessage
) => {
	socket.emit(variant, { message, channel });
};

export const listenMessage = (
	channel: string | number,
	variant: VariantChannel = 'chapter',
	handler: (arg: any[]) => void
) => {
	socket.on(`${variant}-${channel}`, handler);
	return socket;
};
