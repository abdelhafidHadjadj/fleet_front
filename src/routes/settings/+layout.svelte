<script>
    import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="app">
<Sidebar />
	<main>
		<slot />
	</main>

</div>