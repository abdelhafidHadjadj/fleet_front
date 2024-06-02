<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function handleClick() {
      dispatch('vehicleSelected', {
          id: vehicle.id
      });
  }
let search = '';
  let selectedId = null;
  let selectedType = '';

  let vehicleList = [
      {
          id: "1",
          name: "Dji",
          model: "Pro",
          type: "drone"
      },
      {
          id: "2",
          name: "Mav",
          model: "Pro",
          type: "drone"
      },
      {
          id: "3",
          name: "Audi",
          model: "RS3",
          type: "car"
      },
      {
          id: "4",
          name: "MAN",
          model: "6x4",
          type: "truck"
      }
  ];

  // Computed property to filter the vehicle list
  $: filteredVehicles = vehicleList.filter(vehicle =>
      (vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedType || vehicle.type === selectedType)
  );

  function handleItemClick(id) {
      selectedId = id;
      console.log('Selected ID:', id);
      dispatch('vehicleSelected', { id });
  }

  function filterByType(type) {
      selectedType = type;
  }

  console.log(search);
</script>

<div class="bg-[#F6F5FB] flex flex-col gap-5 p-4 absolute left-[6%] rounded-md shadow-xl top-[2%] z-10 w-[350px] h-[96%]">
  <div>
      <input type="text" placeholder="Search" bind:value={search} class="mt-5 mb-4 p-2 border border-gray-400 rounded w-full">
  </div>
  <div class="flex gap-2 mb-4">
      <button on:click={() => filterByType('')} class="p-2 border border-gray-400 rounded">All</button>
      <button on:click={() => filterByType('drone')} class="p-2 border border-gray-400 rounded">Drone</button>
      <button on:click={() => filterByType('car')} class="p-2 border border-gray-400 rounded">Car</button>
      <button on:click={() => filterByType('truck')} class="p-2 border border-gray-400 rounded">Truck</button>
  </div>
  <ul>
      {#each filteredVehicles as vehicle}
          <li 
              class="mb-2 p-2 bg-white border border-gray-300 rounded cursor-pointer" 
              on:click={() => handleItemClick(vehicle.id)}
              class:selected={vehicle.id === selectedId}
          >
              {vehicle.name} - {vehicle.model} ({vehicle.type})
          </li>
      {/each}
  </ul>
</div>

<style>
  .bg-slate-300 {
      background-color: #e2e8f0;
  }

  .selected {
      border-color: #00f; /* Change this to the color you prefer */
  }
</style>
