<script>
    import axios from "axios";
    import { onMount } from "svelte";

    let id;
    let token;
    let driverData = {
        register_number: "",
        firstname: "",
        lastname: "",
        date_of_birth: "",
        phone: "",
        email: "",
        password: "",
     
    };
    let msg = "";

    async function protectedRoute() {
        token = localStorage.getItem('tokenDriver')
        try {
            const res = await axios.get("http://127.0.0.1:8080/protected", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            id = res.data.id;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleGet() {
        try {
            const res = await axios.get(`http://127.0.0.1:8080/api/driver/get/${id}`);
            driverData = res.data.data;
            console.log(driverData);
            msg = "Driver data retrieved successfully";
        } catch (error) {
            console.log(error);
            msg = "Failed to get driver data";
        }
    }

    async function handleUpdate(event) {
        event.preventDefault();
        try {
            const res = await axios.patch(`http://127.0.0.1:8080/api/driver/update/${driverData.id}`, driverData);
            console.log(res.data);
            msg = "Driver updated successfully";
        } catch (error) {
            console.log(error);
            msg = "Failed to update driver";
        }
    }

    onMount(async () => {
        await protectedRoute();
        await handleGet();
    });
</script>

<div>
    <div class="w-full flex justify-center items-center bg-[#0F0127] h-[120px]">
        <h1 class="text-white  font-semibold text-3xl">My Profile</h1>
    </div>
    <div class="w-full flex justify-center">
        <form class="w-[80%]" on:submit={handleUpdate}>
        
            <!-- Repeat for other fields -->
            <div class="mb-5">
                <label for="firstname" class="mb-1 block text-base font-medium text-[#07074D]">First Name</label>
                <input type="text" name="firstname" id="firstname" placeholder="First Name" bind:value={driverData.firstname} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="lastname" class="mb-1 block text-base font-medium text-[#07074D]">Last Name</label>
                <input type="text" name="lastname" id="lastname" placeholder="Last Name" bind:value={driverData.lastname} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="date_of_birth" class="mb-1 block text-base font-medium text-[#07074D]">Date of Birth</label>
                <input type="date" name="date_of_birth" id="date_of_birth" bind:value={driverData.date_of_birth} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="phone" class="mb-1 block text-base font-medium text-[#07074D]">Phone</label>
                <input type="tel" name="phone" id="phone" placeholder="Phone" bind:value={driverData.phone} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="email" class="mb-1 block text-base font-medium text-[#07074D]">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" bind:value={driverData.email} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="password" class="mb-1 block text-base font-medium text-[#07074D]">New Password</label>
                <input type="password" name="password" id="password" placeholder="Password" bind:value={driverData.password} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
            </div>
        </form>
        
    </div>
</div>
