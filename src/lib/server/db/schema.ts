import { createId } from '@paralleldrive/cuid2';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey().$default(createId),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const book = sqliteTable('book', {
	id: text('id').primaryKey().$default(createId),
	isbn: text('isbn').unique(),
	olid: text('olid').unique(),
	title: text('title').notNull(),
	subtitle: text('subtitle'),
	publishYear: integer('publish_year'),
	description: text('description'),
	publisher: text('publisher'),
	language: text('language'),
	explicit: integer('explicit', { mode: 'boolean' }).notNull().default(false)
});

export const author = sqliteTable('author', {
	id: text('id').primaryKey().$default(createId),
	name: text('name').notNull()
});

export const bookAuthor = sqliteTable('book_author', {
	bookId: text('book_id')
		.notNull()
		.references(() => book.id),
	authorId: text('author_id')
		.notNull()
		.references(() => author.id)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
