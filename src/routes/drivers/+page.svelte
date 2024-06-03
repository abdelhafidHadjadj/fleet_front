<script>
  import SearchInput from "$lib/components/SearchInput.svelte";
  import Delete from "$lib/components/Delete.svelte";
import axios from "axios";
import { onMount } from "svelte";


  let driverList = [];
  let searchTerm = '';
  let deleteModalOpen = false;
  let selectedDriverId = null;

async function fetchData() {
  try {
    const res = await axios.get("http://127.0.0.1:8080/api/driver/getall");
    driverList = res.data.data;
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
      selectedDriverId = id;
      deleteModalOpen = true;
      console.log(deleteModalOpen);
  }

$: filteredDrivers = driverList.filter(driver => {
  return  (driver.firstname && driver.firstname.toLowerCase().includes(searchTerm.toLowerCase())) || 
         (driver.lastname && driver.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (driver.register_number && driver.register_number.toLowerCase().includes(searchTerm.toLowerCase()));
        
        });


function handleDeleteSuccess(event) {
      const { id } = event.detail;
      driverList = driverList.filter(driver => driver.id !== id);
      deleteModalOpen = false;
  }


  function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
      return Math.abs(age_dt.getUTCFullYear() - 1970);
}



</script>
{#if deleteModalOpen}
<Delete open={deleteModalOpen} table="DRIVER" id={selectedDriverId} on:close={() => deleteModalOpen = false} on:deleteSuccess={handleDeleteSuccess}/>
{/if}

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-8">
<div class="flex items-center justify-between pb-6">
  <h1 class="border-b py-6 text-4xl font-semibold">Drivers</h1>
  <div class="flex items-center justify-between">
    <div class="ml-10 space-x-8 lg:ml-40">
    </div>
  </div>
</div>
<SearchInput on:search={handleSearch} link="drivers/adddriver"/>
<br>
<div class="overflow-y-hidden rounded-lg border">
  <div class="overflow-x-auto">
    <table class="w-[100%]">
      <thead>
        <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
          <th class="px-5 py-5">ID</th>
          <th class="px-5 py-3">Fullname</th>
          <th class="px-5 py-3">Register Number</th>
          <th class="px-2 py-3">Phone</th>
          <th class="px-2 py-3">Age</th>
          <th class="px-2 py-3">Status</th>
          <th class="px-2 py-3">Created By</th>
          <th class="px-2 py-3">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-500">
        {#each filteredDrivers as driver}

        <tr>
         
        <!--

          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <div class="flex items-center">
              <div class="h-20 w-30 flex-shrink-0">
                <img class="h-full w-full rounded-2" src="" alt="" />
              </div>
            </div>
          </td>
        -->
        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p class="whitespace-no-wrap">{driver.id}</p>
        </td>
          
        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p class="whitespace-no-wrap">{`${driver.firstname} ${driver.lastname}`}</p>
        </td>
        <td class="px-6 py-4 ">
            <div class="border-2 w-[130px] bg-blue-300 rounded-md px-1 border-black text-black flex items-center justify-center">
                {driver.register_number}
            </div>
        </td>
          <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{driver.phone}</span>
          </td>
          <td class="px-2 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{calculate_age(new Date(driver.date_of_birth))}</span>
          </td>
          <td class="border-b border-gray-200 bg-white px-2 py-5 text-sm">
            <p class="whitespace-no-wrap">{driver.status}</p>
          </td>
          <td class="border-b border-gray-200 bg-white px-2 py-5 text-sm">
            <p class="whitespace-no-wrap">{driver.created_by_username}</p>
          </td>
          <td class="px-2 py-4 whitespace-nowrap">
              <a href={`/drivers/edit/${driver.id}`} class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</a>
              <button on:click={() => openDeleteModal(driver.id)} class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </td>
         
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
</div>
