export interface User {
	id: number;
	name: string;
	key_word: string;
	question: string;
	created_at: string;
	updated_at: string;
}

export const EVENTS_CONFERENSE = {
	JOIN: 'join',
	LEAVE: 'leave',
	SHARE_ROOMS: 'share-rooms',
	ADD_PEER: 'add-peer',
	REMOVE_PEER: 'remove-peer',
	RELAY_SDP: 'relay-sdp',
	RELAY_ICE: 'relay-iec',
	ICE_CANDIDATE: 'ice-candidate',
	SESSION_DESCRIPTION: 'session-description',
	INFO_ROOM: 'info-room',
};
