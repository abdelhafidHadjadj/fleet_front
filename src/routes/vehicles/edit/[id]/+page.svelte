<script>
    import { onMount } from "svelte";
    import axios from "axios";
    export let data
    export let {vehicleDetails} = data;
  
    let msg;
    let vehicleType = ['car', 'drone', 'truck', 'van'];
    let chargeType = ['electric', 'fuel'];
    let vehicleStatus = ['available', 'use', 'maintenance'];
  
    async function handleUpdate(event) {
      event.preventDefault();
      try {
        const res = await axios.patch(`http://127.0.0.1:8080/api/vehicle/update/${vehicleDetails.id}`, vehicleDetails);
        console.log(res.data);
        msg = "Vehicle updated successfully";
        window.location.href = "/vehicles";
      } catch (error) {
        console.log(error);
        msg = "Failed to update vehicle";
      }
    }
  </script>
  
  <div class="flex items-center justify-center p-12">
    {#if msg}
      <p class="text-red-600">{msg}</p>
    {/if}
    <div class="mx-auto w-full max-w-[550px] bg-white">
      <form on:submit={handleUpdate}>
        <div class="rounded-t-lg h-32 overflow-hidden">
          <div class="object-cover object-top w-full"></div>
        </div>
        <!--
          <div class="mx-auto w-60 h-40 relative -mt-16 border-4 border-white overflow-hidden">
            <img class="object-cover object-center h-32" src="https://images.unsplash.com/photo-1580225599687-30d87d260b0b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Car">
          </div>
        -->
        <div class="mb-5">
          <label for="register_number" class="mb-3 block text-base font-medium text-[#07074D]">Registration number</label>
          <input type="text" name="register_number" id="register_number" placeholder="Registration number" bind:value={vehicleDetails.register_number} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" bind:value={vehicleDetails.name} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="model" class="mb-3 block text-base font-medium text-[#07074D]">Model</label>
          <input type="text" name="model" id="model" placeholder="Model" bind:value={vehicleDetails.model} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="type" class="mb-3 block text-base font-medium text-[#07074D]">Type</label>
          <select name="type" id="type" bind:value={vehicleDetails.type} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each vehicleType as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
        <div class="mb-5">
          <label for="type_charge" class="mb-3 block text-base font-medium text-[#07074D]">Charge Type</label>
          <select name="type_charge" id="type_charge" bind:value={vehicleDetails.type_charge} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each chargeType as charge}
              <option value={charge}>{charge}</option>
            {/each}
          </select>
        </div>
        <div class="mb-5">
          <label for="type_charge" class="mb-3 block text-base font-medium text-[#07074D]">Status</label>
          <select name="status" id="status" bind:value={vehicleDetails.status} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each vehicleStatus as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        <div>
          <button type="submit" class="hover:shadow-form w-full rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">Edit</button>
        </div>
      </form>
    </div>
  </div>
  