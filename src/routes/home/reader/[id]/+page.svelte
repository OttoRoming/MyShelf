<script lang="ts">
	import ePub from 'epubjs';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();

	$effect(() => {
		const book = ePub(`/api/books/${params.id}/ebook.epub`);
		const rendition = book.renderTo('reader', {
			width: '100%',
			height: '100%'
		});
		rendition.display();
	});
</script>

<div id="reader"></div>
