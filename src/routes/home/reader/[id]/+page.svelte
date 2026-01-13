<script lang="ts">
	import ePub from 'epubjs';
	import type { Book, Rendition } from 'epubjs';
	import type { PageProps } from './$types';

	import Button from '$lib/components/Button.svelte';

	let { params }: PageProps = $props();

	let book: Book;
	let rendition: Rendition;
	let nextButton: HTMLButtonElement;
	let prevButton: HTMLButtonElement;

	function prev() {
		const b = book as unknown as { package: { metadata: { direction: string } } };
		if (b.package.metadata.direction === 'rtl') {
			rendition.next();
		} else {
			rendition.prev();
		}
	}

	function next() {
		const b = book as unknown as { package: { metadata: { direction: string } } };
		if (b.package.metadata.direction === 'rtl') {
			rendition.prev();
		} else {
			rendition.next();
		}
	}

	$effect(() => {
		book = ePub(`/api/books/${params.id}/ebook.epub`);
		rendition = book.renderTo('reader', {
			width: '100%',
			height: '100%',
			spread: 'always'
		});
		rendition.display();

		book.ready.then(() => {
			console.log('Book is ready');
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') {
				nextButton.click();
			} else if (e.key === 'ArrowLeft') {
				prevButton.click();
			}
		});
	});
</script>

<div class="flex items-center justify-center gap-2">
	<button onclick={prev} bind:this={prevButton} aria-label="previous page">p</button>
	<div id="reader" class="h-80 w-80"></div>
	<button onclick={next} bind:this={nextButton} aria-label="next page">n</button>
</div>
