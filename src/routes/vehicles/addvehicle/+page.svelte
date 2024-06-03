<script>
    import { onMount } from "svelte";
    import axios from "axios";
  
    let msg;
    let vehicleType = ['car', 'drone', 'truck', 'van'];
    let chargeType = ['electric', 'fuel'];
    let vehicleStatus = ['available', 'use', 'maintenance'];
    let id;
    let token = localStorage.getItem('token')
    console.log(token);
    async function protectedRoute() {
    try {
      const res = await axios.get("http://127.0.0.1:8080/protected", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      id = res.data.id;
      console.log('created by ', id);
      vehicleData.created_by = id;
    } catch (error) {
      console.log(error);
    }
  }
  console.log('id = ', id);

  onMount(() => protectedRoute());


    let vehicleData = {
      register_number: '',
      name: '',
      model: '',
      type: '',
      type_charge: "",
      current_charge: "0",
      charge_capacity: "0",
      current_distance: "0",
      current_position: "0",
      status: "",
      connection_key: "",
      created_by: ""
    };
  
    async function handleAdd(event) {
      event.preventDefault();
      try {
        const res = await axios.post(`http://127.0.0.1:8080/api/vehicle/add`, vehicleData);
        console.log(res.data);
        msg = "Vehicle added successfully";
        window.location.href = "/vehicles";
      } catch (error) {
        console.log(error);
        msg = "Failed to add vehicle";
      }
    }
  </script>
  
  <div class="flex items-center justify-center p-12">
    {#if msg}
      <p class="text-red-600">{msg}</p>
    {/if}
    <div class="mx-auto w-full max-w-[550px] bg-white">
      <form on:submit={handleAdd}>
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
          <input type="text" name="register_number" id="register_number" placeholder="Registration number" bind:value={vehicleData.register_number} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" bind:value={vehicleData.name} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="model" class="mb-3 block text-base font-medium text-[#07074D]">Model</label>
          <input type="text" name="model" id="model" placeholder="Model" bind:value={vehicleData.model} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="type" class="mb-3 block text-base font-medium text-[#07074D]">Type</label>
          <select name="type" id="type" bind:value={vehicleData.type} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each vehicleType as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
        <div class="mb-5">
          <label for="type_charge" class="mb-3 block text-base font-medium text-[#07074D]">Charge Type</label>
          <select name="type_charge" id="type_charge" bind:value={vehicleData.type_charge} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each chargeType as charge}
              <option value={charge}>{charge}</option>
            {/each}
          </select>
        </div>
        <div class="mb-5">
          <label for="status" class="mb-3 block text-base font-medium text-[#07074D]">Status</label>
          <select name="status" id="status" bind:value={vehicleData.status} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each vehicleStatus as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        <div>
          <button type="submit" class="hover:shadow-form w-full rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">Add Vehicle</button>
        </div>
      </form>
    </div>
  </div>
  