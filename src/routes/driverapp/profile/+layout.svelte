<script>
    import NavBar from '$lib/components/NavBar.svelte';
import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="app">

	<main>
		<slot />
	</main>
    <NavBar/>
</div>