<script>
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Delete from "$lib/components/Delete.svelte";
  import axios from "axios";
  import { onMount } from "svelte";


    let vehicleList = [];
    let searchTerm = '';
    let deleteModalOpen = false;
    let selectedVehicleId = null;

  async function fetchData() {
    try {
      const res = await axios.get("http://127.0.0.1:8080/api/vehicle/getall");
      vehicleList = res.data.data;
      console.log(res.data.data);
      
    } catch (error) {
      console.log(error);
    }
  }


onMount(() => fetchData())
function handleSearch(event) {
    searchTerm = event.detail;
    console.log('Search term:', searchTerm); // Log search term

  }

  function openDeleteModal(id) {
        selectedVehicleId = id;
        deleteModalOpen = true;
        console.log(deleteModalOpen);
    }

  $: filteredVehicles = vehicleList.filter(vehicle => {
    return (vehicle.driver && vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (vehicle.name && vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (vehicle.register_number && vehicle.register_number.toLowerCase().includes(searchTerm.toLowerCase()));
  });


  function handleDeleteSuccess(event) {
        const { id } = event.detail;
        vehicleList = vehicleList.filter(vehicle => vehicle.id !== id);
        deleteModalOpen = false;
    }
</script>
{#if deleteModalOpen}
<Delete open={deleteModalOpen} table="VEHICLE" id={selectedVehicleId} on:close={() => deleteModalOpen = false} on:deleteSuccess={handleDeleteSuccess}/>
{/if}

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-8">
  <div class="flex items-center justify-between pb-6">
    <h1 class="border-b py-6 text-4xl font-semibold">Vehicules</h1>
    <div class="flex items-center justify-between">
      <div class="ml-10 space-x-8 lg:ml-40">
      </div>
    </div>
  </div>
  <SearchInput on:search={handleSearch} link="/vehicles/addvehicle"/>
  <br>
  <div class="overflow-y-hidden rounded-lg border">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th class="px-5 py-3"><div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div></th>
            <th class="px-5 py-5">Vehicule</th>
            <th class="px-5 py-3">License Plate</th>
            <th class="px-5 py-3">Model</th>
            <th class="px-5 py-3">Driver</th>
            <th class="px-5 py-3">Status</th>
            <th class="px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-500">
          {#each filteredVehicles as vehicle}

          <tr>
            <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div class="flex items-center">
                <div class="h-20 w-30 flex-shrink-0">
                  <img class="h-full w-full rounded-2" src="" alt="" />
                </div>
              </div>
            </td>
            
            <td class="px-6 py-4 ">
                <div class="border-2 w-40 rounded-md py-1 px-2 bg-yellow-400 border-black text-black flex items-center justify-center">
                    {vehicle.register_number}
                </div>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">{`${vehicle.name} (${vehicle.model})`}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">{vehicle.type}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{vehicle.status}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <a href={`/vehicles/edit/${vehicle.id}`} class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</a>
                <button on:click={() => openDeleteModal(vehicle.id)} class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
              </td>
           
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
