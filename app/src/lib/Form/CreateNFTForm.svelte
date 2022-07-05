<script lang="ts">
	import { mintNft } from '../web3/nft/mint';
	import InputForm from './InputForm.svelte';

	let name: string;
	let symbol: string;
	let uri: string;

	$: isIncomplete = !(name && symbol && uri);

	const onSubmit = async () => {
		if (isIncomplete) {
			return;
		}
		await mintNft(name, symbol, uri);
	};
</script>

<form
	class="flex flex-col m-2 p-2 w-fit"
	on:submit|preventDefault={() => onSubmit()}
>
	<InputForm label="Name" id="nft-name" bind:value={name} />
	<InputForm label="Symbol" id="nft-symbol" bind:value={symbol} />
	<InputForm label="URI" id="nft-uri" bind:value={uri} />
	<button
		type="submit"
		class="w-1/2 self-center bg-blue-300 p-1 mt-1 rounded-md disabled:bg-slate-300 disabled:text-white disabled:cursor-not-allowed"
		disabled={isIncomplete}
	>
		Submit
	</button>
</form>
