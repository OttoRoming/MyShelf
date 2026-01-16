<script module lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	let {
		value = $bindable(),
		checked = $bindable(),
		name,
		label = name,
		multiple,
		type
	}: {
		value?: string | number | null;
		checked?: boolean;
		label?: string;
		multiple?: boolean;
		type: HTMLInputTypeAttribute;
		name?: string;
	} = $props();

	let id = `input-${counter++}`;
</script>

{#if type === 'file'}
	<input
		class="cursor-pointer rounded-lg border-2 border-dashed border-bg-dim transition-all file:mr-4 file:bg-bg-dim file:px-3 file:py-2 file:transition-all hover:file:bg-fg hover:file:text-bg-dim focus:ring-2 focus:ring-primary focus:outline-none"
		bind:value
		{multiple}
		{name}
		{id}
		aria-label={label}
		type="file"
	/>
{:else if type === 'checkbox'}
	<label for={id}>{label}</label>
	<input bind:checked {multiple} {name} {id} type="checkbox" class="peer" />
{:else}
	<span class="relative inline">
		<input
			aria-label={label}
			placeholder=""
			bind:value
			{multiple}
			{type}
			{name}
			{id}
			class="peer rounded-lg bg-bg-dim px-3 py-2 transition-all focus:outline-none"
		/>
		<label
			for={id}
			class="absolute top-1/2 left-3 -translate-y-7/5 text-sm text-fg-dim capitalize transition-all peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base"
		>
			{label}
		</label>
	</span>
{/if}
