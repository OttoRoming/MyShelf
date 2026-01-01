<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, type }: { children: Snippet; type: 'success' | 'error' | 'info' } = $props();
	// this component should be in dark mode
</script>

<div
	class="rounded-lg px-4 py-3 font-semibold"
	class:bg-green-600={type === 'success'}
	class:text-green-100={type === 'success'}
	class:bg-red-600={type === 'error'}
	class:text-red-100={type === 'error'}
	class:bg-blue-600={type === 'info'}
	class:text-blue-100={type === 'info'}
	role="alert"
>
	{@render children()}
</div>
