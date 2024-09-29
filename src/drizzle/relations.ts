// import { relations } from 'drizzle-orm/relations';
// import {
// 	Chapter,
// 	UserBook,
// 	User,
// 	UserWork,
// 	Work,
// 	Comment,
// 	LikesComment,
// 	FeedbackComment,
// 	Teacher,
// 	TeacherChapter,
// } from './schema';

// export const UserBookRelations = relations(UserBook, ({ one }) => ({
// 	Chapter: one(Chapter, {
// 		fields: [UserBook.chapter_id],
// 		references: [Chapter.id],
// 	}),
// 	User: one(User, {
// 		fields: [UserBook.user_id],
// 		references: [User.id],
// 	}),
// }));

// export const chapterRelations = relations(Chapter, ({ many }) => ({
// 	UserBooks: many(UserBook),
// 	Works: many(Work),
// 	Comments: many(Comment),
// }));

// export const workRelations = relations(Work, ({ one, many }) => ({
// 	UserWorks: many(UserWork),
// 	Chapter: one(Chapter, {
// 		fields: [Work.chapter_id],
// 		references: [Chapter.id],
// 	}),
// }));

// export const commentRelations = relations(Comment, ({ one, many }) => ({
// 	Chapter: one(Chapter, {
// 		fields: [Comment.chapter_id],
// 		references: [Chapter.id],
// 	}),
// 	User: one(User, {
// 		fields: [Comment.user_id],
// 		references: [User.id],
// 	}),
// 	LikesComments: many(LikesComment),
// 	FeedbackComments: many(FeedbackComment),
// }));

// export const UserRelations = relations(User, ({ many }) => ({
// 	UserBooks: many(UserBook),
// 	UserWorks: many(UserWork),
// 	Comments: many(Comment),
// 	LikesComments: many(LikesComment),
// 	FeedbackComments: many(FeedbackComment),
// 	TeacherChapters: many(TeacherChapter),
// 	Teachers: many(Teacher),
// }));

// export const UserWorkRelations = relations(UserWork, ({ one }) => ({
// 	User: one(User, {
// 		fields: [UserWork.user_id],
// 		references: [User.id],
// 	}),
// 	Work: one(Work, {
// 		fields: [UserWork.work_id],
// 		references: [Work.id],
// 	}),
// }));

// export const TeacherRelations = relations(Teacher, ({ one }) => ({
// 	Teacher: one(User, {
// 		fields: [Teacher.teacher_id],
// 		references: [User.id],
// 	}),
// 	Student: one(User, {
// 		fields: [Teacher.student_id],
// 		references: [User.id],
// 	}),
// }));

// export const TeacherChapterRelations = relations(TeacherChapter, ({ one }) => ({
// 	Teacher: one(User, {
// 		fields: [TeacherChapter.teacher_id],
// 		references: [User.id],
// 	}),
// 	Student: one(User, {
// 		fields: [TeacherChapter.student_id],
// 		references: [User.id],
// 	}),
// 	Chapter: one(Chapter, {
// 		fields: [TeacherChapter.chapter_id],
// 		references: [Chapter.id],
// 	}),
// }));

// export const LikesCommentRelations = relations(LikesComment, ({ one }) => ({
// 	User: one(User, {
// 		fields: [LikesComment.user_id],
// 		references: [User.id],
// 	}),
// 	Comment: one(Comment, {
// 		fields: [LikesComment.comment_id],
// 		references: [Comment.id],
// 	}),
// }));

// export const FeedbackCommentRelations = relations(
// 	FeedbackComment,
// 	({ one, many }) => ({
// 		Comment: one(Comment, {
// 			fields: [FeedbackComment.comment_id],
// 			references: [Comment.id],
// 		}),
// 		User: one(User, {
// 			fields: [FeedbackComment.user_id],
// 			references: [User.id],
// 		}),
// 		FeedbackComment: one(FeedbackComment, {
// 			fields: [FeedbackComment.feedback_id],
// 			references: [FeedbackComment.id],
// 			relationName: 'FeedbackComment_feedback_id_FeedbackComment_id',
// 		}),
// 		FeedbackComments: many(FeedbackComment, {
// 			relationName: 'FeedbackComment_feedback_id_FeedbackComment_id',
// 		}),
// 	})
// );
