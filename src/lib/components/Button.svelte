<script lang="ts">
	import type { Snippet } from 'svelte';
	const {
		type,
		children,
		disabled,
		onclick
	}: {
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		children: Snippet;
		onclick?: () => void;
	} = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	class="cursor-pointer rounded-lg bg-bg-dim px-3 py-2 transition-all hover:bg-fg hover:text-bg-dim focus:ring-2 focus:ring-primary focus:outline-none active:scale-95"
	class:opacity-50={disabled}
>
	{@render children()}
</button>
