<script lang="ts">
	import CreateNftForm from '$lib/Form/CreateNFTForm.svelte';

	enum DragState {
		None = 'Drag image here',
		Dragging = 'Drop image here',
		Dropped = 'Picture'
	}

	let dragState = DragState.None;
	let dragLabel: string = DragState.None;
	let fileImage: any;

	const onDragEnter = (event: DragEvent) => {
		event.preventDefault();
		dragState = DragState.Dragging;
		dragLabel = DragState.Dragging;
	};

	const onDragLeave = (event: DragEvent) => {
		event.preventDefault();
		dragState = DragState.None;
		dragLabel = DragState.None;
	};

	const readImage = (image: File) => {
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			fileImage = e?.target?.result;
		};
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();
		console.log(event);
		const file = event?.dataTransfer?.files[0] as File;
		console.log(file.name);
		dragState = DragState.Dropped;
		dragLabel = file.name;

		readImage(file);
	};

	const onFileUpload = (event: any) => {
		let image = event?.target?.files[0];
		readImage(image);
	};
</script>

<section class="h-screen flex justify-center items-center">
	<div class="flex flex-col items-center">
		<h1 class="text-xl">Create NFT 🔥</h1>
		<CreateNftForm />
	</div>
	<div class=" bg-slate-200 aspect-square w-48 shadow-lg rounded-md">
		<label
			class="h-full flex justify-center items-center space-x-2 hover:cursor-pointer"
			on:dragover={onDragEnter}
			on:dragleave={onDragLeave}
			on:dragend={onDragLeave}
			on:drop={onDrop}
		>
			{#if fileImage}
				<img class="flex-shrink h-full" src={fileImage} alt="d" />
			{:else}
				<span class="text-xs text-gray-400">{dragLabel}</span>
			{/if}

			{#if dragState === DragState.None}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="#FFF"
					><path
						d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
					/></svg
				>
			{/if}
			<input
				type="file"
				name="image_upload"
				class="hidden"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onFileUpload(e)}
			/>
		</label>
	</div>
</section>
