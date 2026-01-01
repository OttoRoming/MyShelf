<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';

	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4">
	<div class="grid grid-cols-[1fr_auto_1fr] gap-4">
		<div>
			<h1 class="pb-2 pl-1 text-xl font-semibold">Login</h1>
			<form action="?/register" use:enhance class="flex flex-col gap-2">
				<Input label="username" name="username" type="text" />
				<Input label="password" name="password" type="password" />
				<Button type="submit">Login</Button>
			</form>
		</div>
		<div class="min-w-px bg-gray-400"></div>
		<div>
			<h1 class="pb-2 pl-1 text-xl font-semibold">Register</h1>
			<form method="post" action="?/register" use:enhance class="flex flex-col gap-2">
				<Input label="username" name="username" type="text" />
				<Input label="password" name="password" type="password" />
				<Button type="submit">Register</Button>
			</form>
		</div>
	</div>

	{#if form?.message}
		<Alert type="error">{form?.message}</Alert>
	{/if}
</div>
