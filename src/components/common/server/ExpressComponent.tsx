'use server';

import { createServer } from 'node:http';
import express from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { SocketAction } from '@/lib/socket';
import { SOCKET_ACTIONS } from '@/types/const/const';
import { execSync } from 'child_process';

const ActionsVariant: Record<
	SOCKET_ACTIONS,
	(socket: Socket, io: Server, channel: string) => void
> = {
	redirect: socket => {},
	refresh: (socket, io, channel) => {
		io.emit(`chapter-${channel}`, 'refresh');
	},
};
export const ExpressComponent = async () => {
	try {
		const PORT = process.env.NEXT_PUBLIC_SOCKET_PORT!;

		const app = express();
		const server = createServer(app);

		app.use(cors({ origin: '*' }));
		const io = new Server(server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
			},
		});
		io.on('connection', socket => {
			socket.on('chapter', (arg: SocketAction) => {
				const { channel, message }: SocketAction = arg;
				ActionsVariant[message](socket, io, channel);
			});

			socket.on('disconnect', () => {
				console.log('disconnect');
			});
		});

		server.listen(PORT, () => {
			console.log(' Сервер запустился http://localhost:' + PORT);
		});

		server.on('error', () => {
			console.log('Сервер уже создан');
		});
	} catch (error) {
		console.log('Сервер уже создан');
	}

	return <></>;
};
