<script>
  import SearchInput from "$lib/components/SearchInput.svelte";
  import Delete from "$lib/components/Delete.svelte"; 
  import axios from "axios";
  import { onMount } from "svelte";


  let operatorList = [];
  let searchTerm = '';
  let deleteModalOpen = false;
  let selectedOperatorId = null;

async function fetchData() {
  try {
    const res = await axios.get("http://127.0.0.1:8080/api/user/operators");
    operatorList = res.data.data;
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
      selectedOperatorId = id;
      deleteModalOpen = true;
      console.log(deleteModalOpen);
  }

$: filteredOperators = operatorList.filter(operator => {
  return  (operator.firstname && operator.firstname.toLowerCase().includes(searchTerm.toLowerCase())) || 
         (operator.lastname && operator.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (operator.email && operator.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (operator.register_number && operator.register_number.toLowerCase().includes(searchTerm.toLowerCase()));
        
        });


function handleDeleteSuccess(event) {
      const { id } = event.detail;
      operatorList = operatorList.filter(op => op.id !== id);
      deleteModalOpen = false;
  }


</script>
{#if deleteModalOpen}
<Delete open={deleteModalOpen} table="USER" id={selectedOperatorId} on:close={() => deleteModalOpen = false} on:deleteSuccess={handleDeleteSuccess}/>
{/if}

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-8">
<div class="flex items-center justify-between pb-6">
  <h1 class="border-b py-6 text-4xl font-semibold">Operators</h1>
  <div class="flex items-center justify-between">
    <div class="ml-10 space-x-8 lg:ml-40">
    </div>
  </div>
</div>
<SearchInput on:search={handleSearch} link="operators/addoperator"/>
<br>
<div class="overflow-y-hidden rounded-lg border">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
       
          <th class="px-5 py-5">ID</th>
          <th class="px-5 py-3">Fullname</th>
          <th class="px-5 py-3">Email</th>
          <th class="px-5 py-3">Phone</th>
          <th class="px-5 py-3">Status</th>
          <th class="px-5 py-3">Created At</th>
          <th class="px-5 py-3">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-500">
        {#each filteredOperators as operator}

        <tr>
          
        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p class="whitespace-no-wrap">{operator.id}</p>
        </td>
          
        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p class="whitespace-no-wrap">{`${operator.firstname} ${operator.lastname}`}</p>
        </td>
        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p class="whitespace-no-wrap">{operator.email}</p>
        </td>
          <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{operator.phone}</span>
          </td>
          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{operator.status}</span>
          </td>
          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p class="whitespace-no-wrap">{operator.created_at}</p>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
              <a href={`/operators/edit/${operator.id}`} class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</a>
              <button on:click={() => openDeleteModal(operator.id)} class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </td>
         
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
</div>
