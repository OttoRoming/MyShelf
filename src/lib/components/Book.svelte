<script lang="ts">
	import Tilt from './Tilt.svelte';

	let { title, author, cover }: { title: string; author?: string; cover?: string } = $props();
</script>

<div>
	<Tilt>
		<div class="aspect-5/8 w-40">
			{#if cover}
				<img src={cover} alt="Book Cover" class="h-full w-full object-cover" />
			{:else}
				<div
					class="flex h-full w-full items-center justify-center rounded-lg bg-bg-dim text-center text-sm font-semibold text-fg shadow-lg select-none"
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
</div>
