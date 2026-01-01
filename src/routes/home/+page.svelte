<script lang="ts">
	import Book from '$lib/components/Book.svelte';
	import cover from '$lib/assets/cover.jpg';
</script>

<div class="flex min-h-screen items-center justify-center gap-4">
	<Book title="nineteen eighty four" author="george orwell" {cover} />
	<Book title="nineteen eighty four" author="george orwell" {cover} />
	<Book title="nineteen eighty four" author="george orwell" />
</div>
