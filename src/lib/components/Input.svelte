<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	const {
		label,
		multiple,
		type,
		name
	}: { label?: string; multiple?: boolean; type: HTMLInputTypeAttribute; name?: string } = $props();
</script>

{#if type === 'file'}
	<input
		class="cursor-pointer rounded-lg border-2 border-dashed border-bg-dim transition-all file:mr-4 file:bg-bg-dim file:px-3 file:py-2 file:transition-all hover:file:bg-fg hover:file:text-bg-dim focus:ring-2 focus:ring-primary focus:outline-none"
		{multiple}
		{name}
		aria-label={label}
		type="file"
	/>
{:else}
	<input
		placeholder={label}
		aria-label={label}
		{multiple}
		{type}
		{name}
		class="rounded-lg bg-bg-dim px-3 py-2 transition-all focus:ring-2 focus:ring-primary focus:outline-none"
	/>
{/if}
