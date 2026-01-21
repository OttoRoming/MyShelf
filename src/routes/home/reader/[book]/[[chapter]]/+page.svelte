<script lang="ts">
	import ePub from 'epubjs';
	import type { Book, Rendition, NavItem } from 'epubjs';
	import type { PageProps } from './$types';

	import TocItem from '$lib/components/TocItem.svelte';

	let { params }: PageProps = $props();

	let book: Book;
	let rendition: Rendition;
	let nextButton: HTMLButtonElement;
	let prevButton: HTMLButtonElement;
	let percentage = $state(0);
	let toc: NavItem[] = $state([]);

	function updatePercentage() {
		const currentLocation = rendition.currentLocation();
		percentage = currentLocation.percentage;

		console.log({ percentage });
	}

	function prev() {
		const b = book as unknown as { package: { metadata: { direction: string } } };
		if (b.package.metadata.direction === 'rtl') {
			rendition.next();
		} else {
			rendition.prev();
		}

		updatePercentage();
	}

	function next() {
		const b = book as unknown as { package: { metadata: { direction: string } } };
		if (b.package.metadata.direction === 'rtl') {
			rendition.prev();
		} else {
			rendition.next();
		}

		updatePercentage();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			next();
		} else if (event.key === 'ArrowLeft') {
			prev();
		}
	}

	$effect(() => {
		// destroy previous rendition if it exists
		toc = [];
		if (rendition) {
			rendition.destroy();
		}
		window.removeEventListener('keydown', onKeyDown);

		// setup the ePub book and rendition
		book = ePub(`/api/books/${params.book}/ebook.epub`);
		rendition = book.renderTo('reader', {
			width: '100%',
			height: '100%',
			spread: 'always'
		});
		const displayed = rendition.display(params.chapter);

		displayed.then(() => {
			const currentLocation = rendition.currentLocation();
			console.log({ currentLocation });
		});

		book.ready.then(() => {
			console.log('Book is ready');
		});

		book.loaded.navigation.then((navigation) => {
			navigation.forEach((chapter) => {
				toc.push(chapter);

				return {};
			});
		});

		window.addEventListener('keydown', onKeyDown);
	});

	// $inspect(toc);
</script>

<div class="flex items-center justify-center gap-2">
	<ol class="list-disc">
		{#each toc as chapter (chapter.id)}
			<TocItem book={params.book} item={chapter} />
		{/each}
	</ol>
	<button onclick={prev} bind:this={prevButton} aria-label="previous page">p</button>
	<div id="reader" class="h-80 w-80"></div>
	<button onclick={next} bind:this={nextButton} aria-label="next page">n</button>
</div>
