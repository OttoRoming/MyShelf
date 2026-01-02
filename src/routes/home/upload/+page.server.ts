// import { hash, verify } from '@node-rs/argon2';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions } from './$types';
import Bun from 'bun';
import { mkdir } from 'node:fs/promises';

const EPUB_MIME = 'application/epub+zip';

export const actions: Actions = {
	upload: async (event) => {
		const formData = await event.request.formData();
		const file = formData.get('file') as File;

		console.log('Uploaded file:', file);

		// Validate file exists
		if (!file || !file.size) {
			return fail(400, {
				message: 'Please select a file to upload'
			});
		}

		if (file.type !== EPUB_MIME) {
			return fail(400, { message: 'Invalid file type. Only .epub files are allowed.' });
		}

		const bookTitle = file.name.split('.')[0];
		const bookId = await db
			.insert(table.book)
			.values({
				title: bookTitle
			})
			.returning({ id: table.book.id })
			.execute()
			.then((r) => r[0].id);

		const bookPath = `./data/books/${bookId}`;
		await mkdir(bookPath, { recursive: true });
		await Bun.write(`${bookPath}/ebook.epub`, await file.arrayBuffer());

		return { success: true };
	}
};
