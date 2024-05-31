<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import axios from 'axios';
  
	export let label;
	export let labels;
	export let backgroundColor;
	let chartCanvas;
	let vehNbrUse = 0;
	let vehNbrMaintenance = 0;
	let vehNbrAvailable = 0;
  
	async function fetchData() {
	  try {
		const [
		  vehUseRes,
		  vehAvailableRes,
		  vehMaintenanceRes
		] = await Promise.all([
		  axios.get("http://127.0.0.1:8080/api/vehicle/vehicles_status/use"),
		  axios.get("http://127.0.0.1:8080/api/vehicle/vehicles_status/available"),
		  axios.get("http://127.0.0.1:8080/api/vehicle/vehicles_status/maintenance")
		]);
  
		vehNbrUse = vehUseRes.data.data || 0;
		vehNbrAvailable = vehAvailableRes.data.data || 0;
		vehNbrMaintenance = vehMaintenanceRes.data.data || 0;
	  } catch (error) {
		console.error("Error fetching data:", error);
	  }
	}
  
	onMount(async () => {
	  await fetchData();
  
	  const ctx = chartCanvas.getContext('2d');
	  const data = {
		labels: labels,
		datasets: [{
		  label: label,
		  data: [vehNbrUse, vehNbrMaintenance, vehNbrAvailable],
		  backgroundColor: backgroundColor,
		  hoverOffset: 4
		}]
	  };
  
	  const config = {
		type: 'doughnut',
		data: data,
	  };
  
	  new Chart(ctx, config);
	});
  </script>
  
  <div>
	<canvas bind:this={chartCanvas} id="myChart"></canvas>
  </div>
  