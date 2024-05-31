<script>
    import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="app h-screen">
<Sidebar />
	<main class="h-screen ml-[5%]">
		<slot />
	</main>

</div>