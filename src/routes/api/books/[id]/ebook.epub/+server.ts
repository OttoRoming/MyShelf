import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Bun from 'bun';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ params }) => {
	const bookId = params.id;
	const isFound = await db.$count(table.book, eq(table.book.id, bookId)).then((count) => count > 0);

	if (!isFound) {
		throw error(404, 'Book not found');
	}

	const file = Bun.file(`./data/books/${bookId}/ebook.epub`);
	console.log('uwu');
	if (!file || !file.size) {
		throw error(404, 'File not found');
	}

	return new Response(file.stream(), {
		headers: {
			'Content-Type': 'application/epub+zip'
		}
	});
};
