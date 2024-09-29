import { NextResponse } from 'next/server';
// import { EVENTS_CONFERENSE } from '@/types/User';
// import { UserType } from '@/drizzle/db';

// let wss: null | WebSocketServer = null;
// export type Room = {
// 	id: number;
// 	users: ({ ws: WebSocket } & {
// 		user: UserType;
// 	})[];
// };

// export type EventDataInfo = { room: Room };
// export type EventDataJoin = {
// 	room: number;
// 	user: UserType;
// };
// export type EventDataLeave = {
// 	room: number;
// 	user: UserType;
// };

// export type EventDataRemovePeer = {
// 	user: UserType;
// };

// export type EventDataAddPeer = {
// 	user: UserType;
// 	create_offer: Boolean;
// };

// export type EventDataSessionDescription = {
// 	user: UserType;
// 	sessionDescription: RTCSessionDescriptionInit;
// };

// export type EventDataRelaySDP = {
// 	user: UserType;
// 	sessionDescription: RTCSessionDescriptionInit;
// 	roomId: number;
// };

// export type EventDataRelayICE = {
// 	user: UserType;
// 	iceCandidate: RTCIceCandidate;
// 	roomId: number;
// };

// export type EventDataIceCandidate = {
// 	user: UserType;
// 	iceCandidate: RTCIceCandidate;
// };

// export type EventRequest = { type: keyof typeof EVENTS_CONFERENSE; data: any };
// let rooms: Room[] = [
// 	{
// 		id: 9,
// 		users: [],
// 	},
// ];
export async function GET() {
	return NextResponse.json('Это тоже нужно');
}
// export async function GET(req: NextRequest) {
// 	if (!wss) {
// 		wss = new WebSocketServer({
// 			port:
// 				Number(
// 					process.env.NEXT_PUBLIC_WEBSOCKET_PORT_CONFERENCE?.split(':')[1]
// 				) || 2021,
// 		});

// 		rooms = [
// 			{
// 				id: 9,
// 				users: [],
// 			},
// 		];

// 		wss.on('connection', async (ws, req) => {
// 			ws.on('message', async req => {
// 				const data: EventRequest = JSON.parse(req.toString());
// 				if (data.type == EVENTS_CONFERENSE.JOIN) {
// 					const conf: EventDataJoin = data.data;

// 					let currentRoom = rooms.find(r => r.id == conf.room);

// 					if (!currentRoom) {
// 						const newRoom = {
// 							id: conf.room,
// 							users: [],
// 						};
// 						rooms.push(newRoom);

// 						currentRoom = newRoom;

// 						console.log(`Create new room it is id - ${conf.room}`);
// 					}

// 					const userFind = currentRoom?.users.find(
// 						user => user.user.id == conf.user.id
// 					);

// 					if (userFind) {
// 						ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.INFO_ROOM,
// 								data: {
// 									room: currentRoom,
// 								},
// 							})
// 						);
// 						return console.warn('User has been joined');
// 					}

// 					const user = { user: conf.user, ws: ws };

// 					currentRoom?.users.forEach(usr => {
// 						usr.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.ADD_PEER,
// 								data: {
// 									user: conf.user,
// 									create_offer: false,
// 								},
// 							})
// 						);

// 						user.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.ADD_PEER,
// 								data: {
// 									user: usr.user,
// 									create_offer: true,
// 								},
// 							})
// 						);
// 					});

// 					currentRoom?.users.push(user);

// 					currentRoom?.users.forEach(userSocket => {
// 						userSocket.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.INFO_ROOM,
// 								data: {
// 									room: currentRoom,
// 								},
// 							})
// 						);
// 					});
// 				}

// 				if (data.type == EVENTS_CONFERENSE.SHARE_ROOMS) {
// 					const roomIds = rooms.map(room => room.id);
// 					ws.send(
// 						JSON.stringify({
// 							type: EVENTS_CONFERENSE.SHARE_ROOMS,
// 							data: roomIds,
// 						})
// 					);
// 				}

// 				if (data.type == EVENTS_CONFERENSE.RELAY_SDP) {
// 					const {
// 						sessionDescription,
// 						user: usr,
// 						roomId,
// 					}: EventDataRelaySDP = data.data;

// 					const roomFind = rooms.findIndex(room => room.id == roomId);

// 					if (roomFind == -1) {
// 						return console.warn(
// 							`Room not find, please repeat leave, ${usr.id} - ${usr.name}`
// 						);
// 					}

// 					const user = rooms[roomFind].users.find(
// 						user => user.user.id === usr.id
// 					);

// 					if (!user) {
// 						return console.warn(
// 							`User not find, please repeat leave, ${usr.id} - ${usr.name}`
// 						);
// 					}

// 					rooms[roomFind].users.forEach(u => {
// 						const data: EventDataSessionDescription = {
// 							sessionDescription,
// 							user: user.user,
// 						};
// 						u.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.SESSION_DESCRIPTION,
// 								data,
// 							})
// 						);
// 					});
// 				}

// 				if (data.type == EVENTS_CONFERENSE.RELAY_ICE) {
// 					const {
// 						iceCandidate,
// 						roomId,
// 						user: usr,
// 					}: EventDataRelayICE = data.data;

// 					const roomFind = rooms.findIndex(room => room.id == roomId);

// 					if (roomFind == -1) {
// 						return console.warn(
// 							`Room not find, please repeat leave, ${usr.id} - ${usr.name}`
// 						);
// 					}

// 					const user = rooms[roomFind].users.find(
// 						user => user.user.id === usr.id
// 					);

// 					if (!user) {
// 						return console.warn(
// 							`User not find, please repeat leave, ${usr.id} - ${usr.name}`
// 						);
// 					}

// 					rooms[roomFind].users.forEach(u => {
// 						const data: EventDataIceCandidate = {
// 							iceCandidate,
// 							user: user.user,
// 						};
// 						u.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.SESSION_DESCRIPTION,
// 								data,
// 							})
// 						);
// 					});
// 				}

// 				if (data.type == EVENTS_CONFERENSE.LEAVE) {
// 					const conf: EventDataLeave = data.data;
// 					const roomFind = rooms.findIndex(room => room.id == conf.room);

// 					if (roomFind == -1) {
// 						return console.warn(
// 							`Room not find, please repeat leave, ${conf.user.id} - ${conf.user.name}`
// 						);
// 					}

// 					const user = rooms[roomFind].users.find(
// 						user => user.user.id === conf.user.id
// 					);

// 					if (!user) {
// 						return console.warn(
// 							`User not find, please repeat leave, ${conf.user.id} - ${conf.user.name}`
// 						);
// 					}

// 					rooms[roomFind].users.forEach(u => {
// 						u.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.REMOVE_PEER,
// 								data: {
// 									peer_id: conf.user,
// 								},
// 							})
// 						);

// 						user.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.REMOVE_PEER,
// 								data: {
// 									peer_id: u.user,
// 								},
// 							})
// 						);
// 					});

// 					rooms[roomFind].users = rooms[roomFind].users.filter(
// 						u => u.user.id != conf.user.id
// 					);

// 					rooms[roomFind].users.forEach(u => {
// 						u.ws.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.INFO_ROOM,
// 								data: {
// 									room: rooms[roomFind],
// 								},
// 							})
// 						);
// 					});

// 					return;
// 				}
// 			});
// 		});
// 	}

// 	return NextResponse.json(null);
// }

// function sendRoom(room: number, data: any) {}
