<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<nav class="flex items-center justify-between px-6 py-4 shadow-md">
		<Button
			onclick={() => {
				goto(resolve('/'));
			}}>MyShelf</Button
		>
		<div class="flex items-center justify-center gap-4">
			<Button
				onclick={() => {
					goto(resolve('/home'));
				}}>Home</Button
			>
			<Button
				onclick={() => {
					goto(resolve('/home/upload'));
				}}>Upload</Button
			>
		</div>
	</nav>
	<div class="grow px-48 pt-12">
		{@render children()}
	</div>
</div>
