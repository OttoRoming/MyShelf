<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	const { label, type, name }: { label?: string; type: HTMLInputTypeAttribute; name?: string } =
		$props();
</script>

<input
	placeholder={label}
	aria-label={label}
	{type}
	{name}
	class="rounded-lg bg-bg-dim px-3 py-2 transition-all focus:ring-2 focus:ring-primary focus:outline-none"
/>
