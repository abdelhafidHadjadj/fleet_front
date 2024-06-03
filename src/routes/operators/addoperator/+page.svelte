<script>
    import { onMount } from "svelte";
    import axios from "axios";
  
    let msg;
    let operatorStatus = ['work', 'leave'];
    let id;
    let token = localStorage.getItem('token')
    
    let operatorData = {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        role: "operator",
        status: ""
        };
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
    } catch (error) {
      console.log(error);
    }
  }

  onMount(() => protectedRoute());


  
    async function handleAdd(event) {

      event.preventDefault();
     console.log("operator: ", operatorData);
      try {
        const res = await axios.post(`http://127.0.0.1:8080/api/user/add`, operatorData);
        console.log(res.data);
        msg = "Operator added successfully";
        window.location.href = "/operators";
      } catch (error) {
        console.log(error);
        msg = "Failed to add operator";
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
            <img class="object-cover object-center h-32" src="https://res.cloudinary.com/gestionprojet/image/upload/v1717358543/PikPng.com_profile-icon-png_805068_kzyori.png" alt="Car">
          </div>
        -->
    
        <div class="mb-5">
          <label for="firstname" class="mb-3 block text-base font-medium text-[#07074D]">Firstname</label>
          <input type="text" name="firstname" id="firstname" placeholder="Firstname" bind:value={operatorData.firstname} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="lastname" class="mb-3 block text-base font-medium text-[#07074D]">Lastname</label>
          <input type="text" name="lastname" id="lastname" placeholder="Lastname" bind:value={operatorData.lastname} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
     
        <div class="mb-5">
          <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">Phone</label>
          <input type="tel"  id="phone" placeholder="Phone" bind:value={operatorData.phone} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">Email</label>
          <input type="email" id="email" placeholder="Email" bind:value={operatorData.email} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="password" class="mb-3 block text-base font-medium text-[#07074D]">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" bind:value={operatorData.password} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
        </div>
       
       
        <div class="mb-5">
          <label for="status" class="mb-3 block text-base font-medium text-[#07074D]">Status</label>
          <select name="status" id="status" bind:value={operatorData.status} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
            {#each operatorStatus as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        <div>
          <button type="submit" class="hover:shadow-form w-full rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">Add Operator</button>
        </div>
      </form>
    </div>
  </div>
  