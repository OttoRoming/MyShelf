import type { PageServerLoad } from './$types';
import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ params: _params }) => {
	const books = await db.select().from(table.book).orderBy(desc(table.book.title));

	return { books };
};
