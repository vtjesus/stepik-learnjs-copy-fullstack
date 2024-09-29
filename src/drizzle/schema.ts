import {
	pgTable,
	uniqueIndex,
	serial,
	text,
	integer,
	timestamp,
	foreignKey,
	boolean,
	varchar,
	primaryKey,
} from 'drizzle-orm/pg-core';
import { Many, relations } from 'drizzle-orm/relations';

import { sql } from 'drizzle-orm';

export const Chapter = pgTable(
	'Chapter',
	{
		id: serial('id').primaryKey().notNull(),
		title: text('title').notNull(),
		chapter: integer('chapter').notNull(),
		book: text('book').notNull(),
		content: text('content').notNull(),
		created_at: timestamp('created_at', { precision: 3, mode: 'string' })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', {
			precision: 3,
			mode: 'string',
		}).defaultNow(),
	},
	table => {
		return {
			title_key: uniqueIndex('Chapter_title_key').using('btree', table.title),
		};
	}
);

export const UserBook = pgTable('UserBook', {
	id: serial('id').primaryKey().notNull(),
	user_id: integer('user_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	chapter_id: integer('chapter_id')
		.notNull()
		.references(() => Chapter.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	created_at: timestamp('created_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const TeacherChapter = pgTable('TeacherChapter', {
	id: serial('id').primaryKey().notNull(),
	student_id: integer('student_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	teacher_id: integer('teacher_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	chapter_id: integer('chapter_id').references(() => Chapter.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	description: text('description'),
	created_at: timestamp('created_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
	completed: boolean('completed').default(false).notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const Teacher = pgTable('Teacher', {
	id: serial('id').primaryKey().notNull(),
	student_id: integer('student_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	teacher_id: integer('teacher_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	created_at: timestamp('created_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const User = pgTable(
	'User',
	{
		id: serial('id').primaryKey().notNull(),
		name: text('name').notNull(),
		question: text('question').notNull(),
		key_word: text('key_word').notNull(),
		description: text('description'),
		group: text('group'),
		achievements: text('achievements'),
		rate: integer('rate').default(0),
		photo: text('photo'),
		role: text('role').default('user').notNull(),
		is_verify: boolean('is_verify').default(false).notNull(),
		created_at: timestamp('created_at', { precision: 3, mode: 'string' })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', {
			precision: 3,
			mode: 'string',
		}).defaultNow(),
	},
	table => {
		return {
			name_key: uniqueIndex('User_name_key').using('btree', table.name),
		};
	}
);

export const Achievement = pgTable('Achievement', {
	id: serial('id').primaryKey().notNull(),
	name: text('name').notNull(),
	photo: text('photo'),
	descripion: text('descripion'),
	tasks: text('tasks'),
	created_at: timestamp('created_at', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const UserAchievement = pgTable('UserAchievement', {
	id: serial('id').primaryKey().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	achievementId: integer('achievement_id')
		.notNull()
		.references(() => Achievement.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	created_at: timestamp('created_at', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const UserWork = pgTable('UserWork', {
	id: serial('id').primaryKey().notNull(),
	user_id: integer('user_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	work_id: integer('work_id')
		.notNull()
		.references(() => Work.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	created_at: timestamp('created_at', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const Work = pgTable('Work', {
	id: serial('id').primaryKey().notNull(),
	chapter_id: integer('chapter_id')
		.notNull()
		.references(() => Chapter.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	visit: integer('visit').default(0).notNull(),
	resolve: integer('resolve').default(0).notNull(),
	type: text('type').notNull(),
	description: text('description'),
	question: text('question').notNull(),
	answer: text('answer').notNull(),
	explain: text('explain').notNull(),
	variant: text('variant'),
	code: text('code'),
	language: text('language'),
	created_at: timestamp('created_at', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const Comment = pgTable('Comment', {
	id: serial('id').primaryKey().notNull(),
	content: text('content').notNull(),
	user_id: integer('user_id').references(() => User.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	chapter_id: integer('chapter_id').references(() => Chapter.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	rate: integer('rate').default(0).notNull(),
	created_at: timestamp('created_at', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
});

export const _prisma_migrations = pgTable('_prisma_migrations', {
	id: varchar('id', { length: 36 }).primaryKey().notNull(),
	checksum: varchar('checksum', { length: 64 }).notNull(),
	finished_at: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
	migration_name: varchar('migration_name', { length: 255 }).notNull(),
	logs: text('logs'),
	rolled_back_at: timestamp('rolled_back_at', {
		withTimezone: true,
		mode: 'string',
	}),
	started_at: timestamp('started_at', { withTimezone: true, mode: 'string' })
		.defaultNow()
		.notNull(),
	applied_steps_count: integer('applied_steps_count').default(0).notNull(),
});

export const LikesComment = pgTable('LikesComment', {
	id: serial('id').primaryKey().notNull(),
	user_id: integer('user_id')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	created_at: timestamp('created_at', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', {
		precision: 3,
		mode: 'string',
	}).defaultNow(),
	comment_id: integer('comment_id')
		.notNull()
		.references(() => Comment.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const FeedbackComment = pgTable(
	'FeedbackComment',
	{
		id: serial('id').primaryKey().notNull(),
		user_id: integer('user_id')
			.notNull()
			.references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		comment_id: integer('comment_id').references(() => Comment.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		feedback_id: integer('feedback_id'),
		content: text('content').notNull(),
		created_at: timestamp('created_at', { precision: 3, mode: 'string' })
			.defaultNow()
			.notNull(),
		updated_at: timestamp('updated_at', {
			precision: 3,
			mode: 'string',
		}).defaultNow(),
	},
	table => {
		return {
			FeedbackComment_feedback_id_fkey: foreignKey({
				columns: [table.feedback_id],
				foreignColumns: [table.id],
				name: 'FeedbackComment_feedback_id_fkey',
			})
				.onUpdate('cascade')
				.onDelete('cascade'),
		};
	}
);

export const AchievementRelations = relations(Achievement, ({ many }) => ({
	users: many(User),
}));

export const UserAchievementRelations = relations(
	UserAchievement,
	({ one }) => ({
		user: one(User, {
			fields: [UserAchievement.userId],
			references: [User.id],
		}),
		chievement: one(Achievement, {
			fields: [UserAchievement.achievementId],
			references: [Achievement.id],
		}),
	})
);

export const UserBookRelations = relations(UserBook, ({ one }) => ({
	chapter: one(Chapter, {
		fields: [UserBook.chapter_id],
		references: [Chapter.id],
	}),
	user: one(User, {
		fields: [UserBook.user_id],
		references: [User.id],
	}),
}));

export const chapterRelations = relations(Chapter, ({ many }) => ({
	userBooks: many(UserBook),
	works: many(Work),
	comments: many(Comment),
}));

export const workRelations = relations(Work, ({ one, many }) => ({
	userWorks: many(UserWork),
	chapter: one(Chapter, {
		fields: [Work.chapter_id],
		references: [Chapter.id],
	}),
}));

export const commentRelations = relations(Comment, ({ one, many }) => ({
	chapter: one(Chapter, {
		fields: [Comment.chapter_id],
		references: [Chapter.id],
	}),
	user: one(User, {
		fields: [Comment.user_id],
		references: [User.id],
	}),
	likesComments: many(LikesComment),
	feedbackComments: many(FeedbackComment),
}));

export const UserRelations = relations(User, ({ many }) => ({
	userBooks: many(UserBook),
	userWorks: many(UserWork),
	comments: many(Comment),
	achievements: many(Achievement),
	likesComments: many(LikesComment),
	feedbackComments: many(FeedbackComment),
	teacherChapters: many(TeacherChapter, { relationName: 'teacher' }),
	teacherStudentChapters: many(TeacherChapter, { relationName: 'student' }),
	teachers: many(Teacher),
}));

export const UserWorkRelations = relations(UserWork, ({ one }) => ({
	user: one(User, {
		fields: [UserWork.user_id],
		references: [User.id],
	}),
	work: one(Work, {
		fields: [UserWork.work_id],
		references: [Work.id],
	}),
}));

export const TeacherRelations = relations(Teacher, ({ one }) => ({
	teacher: one(User, {
		fields: [Teacher.teacher_id],
		references: [User.id],
	}),
	student: one(User, {
		fields: [Teacher.student_id],
		references: [User.id],
	}),
}));

export const TeacherChapterRelations = relations(TeacherChapter, ({ one }) => ({
	teacher: one(User, {
		fields: [TeacherChapter.teacher_id],
		references: [User.id],
		relationName: 'teacher',
	}),
	student: one(User, {
		fields: [TeacherChapter.student_id],
		references: [User.id],
		relationName: 'student',
	}),
	chapter: one(Chapter, {
		fields: [TeacherChapter.chapter_id],
		references: [Chapter.id],
	}),
}));

export const LikesCommentRelations = relations(LikesComment, ({ one }) => ({
	user: one(User, {
		fields: [LikesComment.user_id],
		references: [User.id],
	}),
	comment: one(Comment, {
		fields: [LikesComment.comment_id],
		references: [Comment.id],
	}),
}));

export const FeedbackCommentRelations = relations(
	FeedbackComment,
	({ one, many }) => ({
		comment: one(Comment, {
			fields: [FeedbackComment.comment_id],
			references: [Comment.id],
		}),
		user: one(User, {
			fields: [FeedbackComment.user_id],
			references: [User.id],
		}),
		feedbackComment: one(FeedbackComment, {
			fields: [FeedbackComment.feedback_id],
			references: [FeedbackComment.id],
			relationName: 'FeedbackComment_feedback_id_FeedbackComment_id',
		}),
		feedbackComments: many(FeedbackComment, {
			relationName: 'FeedbackComment_feedback_id_FeedbackComment_id',
		}),
	})
);
