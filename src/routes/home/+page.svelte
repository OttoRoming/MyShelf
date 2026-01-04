<script lang="ts">
	import Book from '$lib/components/Book.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex min-h-full items-center justify-center gap-4">
	{#each data.books as book (book.id)}
		<Book id={book.id} title={book.title} author={book.author} cover={book.cover} />
	{/each}
	<!-- <Book title="nineteen eighty four" author="george orwell" {cover} />
	<Book title="nineteen eighty four" author="george orwell" {cover} />
	<Book title="nineteen eighty four" author="george orwell" /> -->
</div>
