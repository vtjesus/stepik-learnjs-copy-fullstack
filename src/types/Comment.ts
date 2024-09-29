import { User } from './User';

export type Comment = {
	user: User;
	id: number;
	content: string;
	created_at: string;
	rate: number;
};
