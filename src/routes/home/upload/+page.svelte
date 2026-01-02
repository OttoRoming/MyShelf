<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';

	import type { ActionData } from './$types';

	let submitting = $state(false);

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-8">
	<h1>Upload content</h1>
	<form
		action="?/upload"
		enctype="multipart/form-data"
		method="post"
		class="flex flex-col items-center justify-center gap-4"
	>
		<Input label="book file" name="file" type="file" multiple />
		<Button type="submit" disabled={submitting}>{submitting ? 'Uploading...' : 'Upload'}</Button>
	</form>
</div>

{#if form?.message}
	<Alert type="error">{form?.message}</Alert>
{/if}
