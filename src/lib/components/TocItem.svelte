<script lang="ts">
	import type { NavItem } from 'epubjs';
	import Self from './TocItem.svelte';
	import { resolve } from '$app/paths';

	// let {id: string, href: string, label: string, subitems?: NavItem[], parent: string}: NavItem = $props();
	let { book, item }: { book: string; item: NavItem } = $props();
</script>

<li>
	<a href={resolve('/home/reader/[id]/[[chapter]]', { id: book, chapter: item.href })}
		>{item.label}</a
	>
	{#if item.subitems}
		<ul>
			{#each item.subitems as subitem (subitem.id)}
				<Self {book} item={subitem} />
			{/each}
		</ul>
	{/if}
</li>
