<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    export let label;
    export let borderColor;
    export let months; // Nombre de mois à afficher
    let vehNumberPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
    let chartCanvas;
    
    async function fetchData() {
      try {
        const vehPerMonthRes = await axios.get("http://127.0.0.1:8080/api/vehicle/vehicles/created_by_month");
  
        vehPerMonthRes.data.data.forEach((item) => {
          const monthIndex = parseInt(item.month.split("-")[1]) - 1;
          vehNumberPerMonth[monthIndex] = item.count;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    // Fonction pour générer les noms des mois
    function generateMonths(count) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(monthNames[i % 12]); // Répète les noms des mois si le count > 12
      }
      return result;
    }
  
    onMount(async () => {
      await fetchData();
  
      const ctx = chartCanvas.getContext('2d');
      const data = {
        labels: generateMonths(months),
        datasets: [{
          label: label,
          data: vehNumberPerMonth,
          fill: false,
          borderColor: borderColor,
          tension: 0.2
        }]
      };
  
      const config = {
        type: 'line',
        data: data,
      };
  
      new Chart(ctx, config); // Créez le graphique
    });
  </script>
  
  <div>
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
  </div>
  
<style>
    #myChart {
        width: 550px;
        height: 550px;
    }
</style>


