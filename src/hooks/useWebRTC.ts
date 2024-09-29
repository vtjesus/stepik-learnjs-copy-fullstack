// import { useCallback, useEffect, useRef, useState } from 'react';
// import useStateWithCallback from './useStateWithCallback';
// import { getCookie } from 'cookies-next';
// import {
// 	EventDataAddPeer,
// 	EventDataIceCandidate,
// 	EventDataLeave,
// 	EventDataRelayICE,
// 	EventDataRelaySDP,
// 	EventDataRemovePeer,
// 	EventDataSessionDescription,
// 	EventRequest,
// } from '@/app/api/socket/conference/route';
// // @ts-ignore
// import freeice from 'freeice';
// import { EVENTS_CONFERENSE } from '@/types/User';

// export const LOCAL_VIDEO = 'LOCAL_VIDEO';

// export const useWebRTC = (roomId: number) => {
// 	const [clients, updateClient] = useStateWithCallback<string[]>([]);
// 	const user = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
// 	const peerConnection = useRef<{
// 		[key: string]: RTCPeerConnection;
// 	}>({});
// 	const localMediaStream = useRef<MediaStream | null>(null);
// 	const peerMediaElement = useRef<{
// 		LOCAL_VIDEO: HTMLVideoElement | null;
// 		[key: string]: HTMLVideoElement | null;
// 	}>({
// 		LOCAL_VIDEO: null,
// 	});
// 	const socket = useRef<WebSocket>(
// 		new WebSocket(
// 			process.env.NEXT_PUBLIC_WEBSOCKET_PORT_CONFERENCE || 'ws://localhost:2021'
// 		)
// 	);

// 	const addNewClient = useCallback(
// 		(newClient: any, cb: any) => {
// 			if (!clients.includes(newClient)) {
// 				updateClient((list: any[]) => [...list, newClient], cb);
// 			}
// 		},
// 		[clients, updateClient]
// 	);

// 	useEffect(() => {
// 		socket.current.onmessage = async ev => {
// 			const req: EventRequest = JSON.parse(ev.data);

// 			if (req.type == EVENTS_CONFERENSE.REMOVE_PEER) {
// 				const { user }: EventDataRemovePeer = req.data;

// 				if (peerConnection.current[user.id]) {
// 					peerConnection.current[user.id].close();
// 				}

// 				delete peerConnection.current[user.id];
// 				delete peerMediaElement.current[user.id];

// 				updateClient(
// 					(list: any) => list.filter((c: number) => c !== user.id),
// 					() => {}
// 				);
// 			}

// 			if (req.type == EVENTS_CONFERENSE.ICE_CANDIDATE) {
// 				const { iceCandidate, user }: EventDataIceCandidate = req.data;

// 				peerConnection.current[user.id].addIceCandidate(
// 					new RTCIceCandidate(iceCandidate)
// 				);
// 			}

// 			if (req.type == EVENTS_CONFERENSE.SESSION_DESCRIPTION) {
// 				const { sessionDescription, user }: EventDataSessionDescription =
// 					req.data;

// 				await peerConnection.current[user.id].setRemoteDescription(
// 					new RTCSessionDescription(sessionDescription)
// 				);

// 				if (sessionDescription.type === 'offer') {
// 					const answer = await peerConnection.current[user.id].createAnswer();

// 					await peerConnection.current[user.id].setLocalDescription(answer);

// 					const data: EventDataRelaySDP = {
// 						roomId,
// 						sessionDescription: answer,
// 						user,
// 					};

// 					socket.current.send(
// 						JSON.stringify({
// 							type: EVENTS_CONFERENSE.RELAY_SDP,
// 							data,
// 						})
// 					);
// 				}
// 			}

// 			if (req.type == EVENTS_CONFERENSE.ADD_PEER) {
// 				const { create_offer, user }: EventDataAddPeer = req.data;
// 				if (user.id in peerConnection.current) {
// 					return console.warn(
// 						`Already connection to peer ${user.id} - ${user.name}`
// 					);
// 				}

// 				peerConnection.current[user.id] = new RTCPeerConnection({
// 					iceServers: freeice(),
// 				});

// 				peerConnection.current[user.id].onicecandidate = event => {
// 					if (event.candidate) {
// 						const data: EventDataRelayICE = {
// 							user,
// 							roomId: roomId,
// 							iceCandidate: event.candidate,
// 						};
// 						socket.current.send(
// 							JSON.stringify({
// 								type: EVENTS_CONFERENSE.RELAY_ICE,
// 								data,
// 							})
// 						);
// 					}
// 				};

// 				let tracksNumber = 0;
// 				peerConnection.current[user.id].ontrack = ({
// 					streams: [remoteStream],
// 				}) => {
// 					tracksNumber++;

// 					if (tracksNumber === 2) {
// 						addNewClient(user.id, () => {
// 							peerMediaElement.current[user.id]!.srcObject = remoteStream;
// 						});
// 					}
// 				};

// 				localMediaStream.current?.getTracks().forEach(track => {
// 					peerConnection.current[user.id].addTrack(
// 						track,
// 						localMediaStream.current!
// 					);
// 				});

// 				if (create_offer) {
// 					const offer = await peerConnection.current[user.id].createOffer();

// 					await peerConnection.current[user.id].setLocalDescription(offer);

// 					const data: EventDataRelaySDP = {
// 						user,
// 						roomId: roomId,

// 						sessionDescription: offer,
// 					};

// 					socket.current.send(
// 						JSON.stringify({
// 							type: EVENTS_CONFERENSE.RELAY_SDP,
// 							data,
// 						})
// 					);
// 				}
// 			}
// 		};
// 	}, [addNewClient, roomId, updateClient]);

// 	useEffect(() => {
// 		async function startCapture() {
// 			localMediaStream.current = await navigator.mediaDevices.getUserMedia({
// 				audio: true,
// 				video: {
// 					width: 1280,
// 					height: 720,
// 				},
// 			});

// 			addNewClient(LOCAL_VIDEO, () => {
// 				const localVideoElement = peerMediaElement.current[LOCAL_VIDEO];

// 				if (localVideoElement) {
// 					localVideoElement.volume = 1;

// 					localVideoElement.srcObject = localMediaStream.current;
// 				}
// 			});
// 		}

// 		startCapture()
// 			.then(() => {})
// 			.catch(() => {
// 				console.log('запись не удаласт');
// 			});

// 		return () => {
// 			localMediaStream.current?.getTracks().forEach(track => track.stop());
// 			const data: EventDataLeave = { room: roomId, user };
// 			socket.current.send(JSON.stringify(data));
// 		};
// 	}, [roomId, addNewClient, user]);

// 	const provideMediaRef = useCallback(
// 		(id: string, node: HTMLVideoElement | null) => {
// 			peerMediaElement.current[id] = node;
// 		},
// 		[]
// 	);

// 	return { clients, provideMediaRef, peerMediaElement };
// };
