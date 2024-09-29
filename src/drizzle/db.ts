// import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

import * as schema from './schema';
import {
	Chapter as chapter,
	Comment as comment,
	FeedbackComment as feedbackComment,
	LikesComment as likesComment,
	User as user,
	UserBook as userBook,
	UserWork as userWork,
	Work as work,
	Teacher,
	TeacherChapter,
} from './schema';

// export const client = new Client({
// 	connectionString: process.env.POSTGRES_URL!,
// 	connectionTimeoutMillis: 100000,
// 	ssl: true,
// 	query_timeout: 100000,
// });
// { schema } is used for relational queries
export const db = drizzle(sql, { schema });

export type UserType = typeof user.$inferSelect;
export type CommentType = typeof comment.$inferSelect;
export type FeedbackCommentType = typeof feedbackComment.$inferSelect;
export type LikesCommentType = typeof likesComment.$inferSelect;
export type ChapterType = typeof chapter.$inferSelect;
export type UserBookType = typeof userBook.$inferSelect;
export type WorkType = typeof work.$inferSelect;
export type UserWorkType = typeof userWork.$inferSelect;
export type TeacherType = typeof Teacher.$inferSelect;
export type TeacherChapterType = typeof TeacherChapter.$inferSelect;
