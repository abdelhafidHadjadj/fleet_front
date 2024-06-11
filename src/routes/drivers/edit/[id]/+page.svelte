<script>
    import { onMount } from "svelte";
    import axios from "axios";
    export let data
    export let {driverData} = data;
  
    let msg;
    let driverStatus = ['work', 'leave'];
  
    async function handleUpdate(event) {
      event.preventDefault();
      try {
        const res = await axios.patch(`http://127.0.0.1:8080/api/driver/update/${driverData.id}`, driverData);
        console.log(res.data);
        msg = "Driver updated successfully";
        window.location.href = "/drivers";
      } catch (error) {
        console.log(error);
        msg = "Failed to update driver";
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
          <input type="text" name="register_number" id="register_number" placeholder="Registration number" bind:value={driverData.register_number} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">Firstname</label>
          <input type="text" name="firstname" id="name" placeholder="Firstname" bind:value={driverData.firstname} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="model" class="mb-3 block text-base font-medium text-[#07074D]">Lastname</label>
          <input type="text" name="model" id="model" placeholder="Model" bind:value={driverData.lastname} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
            <label for="model" class="mb-3 block text-base font-medium text-[#07074D]">Date of birth</label>
            <input type="date" id="date_of_birth" placeholder="date_of_birth" bind:value={driverData.date_of_birth} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">Phone</label>
          <input type="tel"  id="phone" placeholder="Phone" bind:value={driverData.phone} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">Email</label>
          <input type="email" name="model" id="email" placeholder="Email" bind:value={driverData.email} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        

            <div class="mb-5">
                <label for="password" class="mb-3 block text-base font-medium text-[#07074D]">New Password</label>
                <input type="password" name="password" id="password" placeholder="Password" bind:value={driverData.password} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
       
        <div class="mb-5">
          <label for="status" class="mb-3 block text-base font-medium text-[#07074D]">Status</label>
          <select name="status" id="status" bind:value={driverData.status} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each driverStatus as status}
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
  