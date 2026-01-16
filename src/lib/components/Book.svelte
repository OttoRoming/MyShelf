<script lang="ts">
	import Tilt from './Tilt.svelte';
	import { resolve } from '$app/paths';

	let { title, author, cover, id }: { title: string; author?: string; cover?: string; id: string } =
		$props();
</script>

<a href={resolve('/home/reader/[book]', { book: id })} class="overflow-hidden rounded-md">
	<Tilt>
		<div class="relative block aspect-5/8 w-40">
			<a
				href={resolve('/home/editor/[book]', { book: id })}
				class="absolute top-2 right-2 rounded-full bg-black">edit</a
			>

			{#if cover}
				<img src={cover} alt="Book Cover" class="h-full w-full object-cover" />
			{:else}
				<div
					class="flex h-full w-full items-center justify-center bg-bg-dim text-center text-sm font-semibold text-fg shadow-lg select-none"
				>
					<div class="px-2">
						<p>{title}</p>
						{#if author}
							<p class="mt-1 text-xs font-normal">by {author}</p>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</Tilt>
</a>
