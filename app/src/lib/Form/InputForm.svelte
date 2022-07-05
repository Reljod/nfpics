<script lang="ts">
	export let label: string;
	export let id: string;
	export let value: string;
</script>

<div class="flex my-1">
	<label for={id}>{label}</label>
	<input {id} class="w-full border rounded-md border-gray-400 mx-2 px-1" bind:value />
</div>
