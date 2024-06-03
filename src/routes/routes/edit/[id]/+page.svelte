<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import axios from 'axios';
    import MapRoute from "../../../../lib/components/maps/MapRoute.svelte";
    export let data;
    export let { routeData } = data;

    const dispatch = createEventDispatcher();
    let id;
    let token = localStorage.getItem('token');
    let msg;
    let vehicles = [];
    let drivers = [];
    let inputDriver = "";
    let inputVehicle = "";
    let showDriverDropdown = false;
    let showVehicleDropdown = false;

    async function getVehicles() {
        try {
           let res = await axios.get('http://127.0.0.1:8080/api/vehicle/getall');
           vehicles = res.data.data;
           // Set initial vehicle input value
           const selectedVehicle = vehicles.find(v => v.id.toString() === routeData.vehicle_id);
           if (selectedVehicle) {
               inputVehicle = `${selectedVehicle.name} ${selectedVehicle.model} ${selectedVehicle.register_number}`;
           }
        } catch (error) {
            console.log(error);
        }
    }

    async function getDrivers() {
        try {
            let res = await axios.get('http://127.0.0.1:8080/api/driver/getall');
            drivers = res.data.data;
            // Set initial driver input value
            const selectedDriver = drivers.find(d => d.id.toString() === routeData.driver_id);
            if (selectedDriver) {
                inputDriver = `${selectedDriver.firstname} ${selectedDriver.lastname} ${selectedDriver.register_number}`;
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    onMount(() => {
        protectedRoute();
        getDrivers();
        getVehicles();
    });

    function handleInputDriverChange(event) {
        inputDriver = event.target.value;
        showDriverDropdown = true;
    }
    
    function handleInputVehicleChange(event) {
        inputVehicle = event.target.value;
        showVehicleDropdown = true;
    }

    function selectDriver(driver) {
        inputDriver = `${driver.firstname} ${driver.lastname} ${driver.register_number}`;
        routeData.driver_id = driver.id.toString();
        showDriverDropdown = false;
        console.log(driver.id);
        dispatch('driverSelected', driver);
    }

    function selectVehicle(vehicle) {
        inputVehicle = `${vehicle.name} ${vehicle.model} ${vehicle.register_number}`;
        routeData.vehicle_id = vehicle.id.toString();
        showVehicleDropdown = false;
        console.log(routeData.vehicle_id);
        dispatch('vehicleSelected', vehicle);
    }

    function handleStartingPlaceChanged(event) {
        const arr = event.detail.startingPlace;
        console.log(arr);
        routeData.lat_start = arr[1].toString();
        routeData.lng_start = arr[0].toString();
    }

    function handleDestinationChanged(event) {
        const arr = event.detail.destination;
        routeData.lat_end = arr[1].toString();
        routeData.lng_end = arr[0].toString();
    }

    async function handleUpdate(event) {
        event.preventDefault();
        try {
            const res = await axios.patch(`http://127.0.0.1:8080/api/route/update/${routeData.id}`, routeData);
            console.log(res.data);
            msg = "Route updated successfully";
            window.location.href = "/routes";
        } catch (error) {
            console.log(error);
            msg = "Failed to update route";
        }
    }
</script>

<form on:submit={handleUpdate} class="flex justify-center gap-10 mx-auto max-w-7xl px-2 py-8 sm:px-8 pt-10">
    <div class="flex-col w-[40%]">
        <div class="flex items-center w-full">
            <h1 class="w-[350px]">Add the informations</h1>
            <hr class="border border-1 border-black w-full">
        </div>
        <div class="flex items-center mt-10 gap-5">
            <div class="mb-5">
                <label for="text" class="mb-1 block text-base font-medium text-[#07074D]">Start Address</label>
                <input required type="text" placeholder="Start Address" bind:value={routeData.departure_city} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="text" class="mb-1 block text-base font-medium text-[#07074D]">End Address</label>
                <input required type="text"  placeholder="End Address" bind:value={routeData.arrival_city} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
        </div>
       
        <div class="flex items-center mt-5 gap-5">
            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">Start Date</label>
                <input required type="date" placeholder="Start Date" bind:value={routeData.departure_date} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">End Date</label>
                <input required type="date" placeholder="Start Date" bind:value={routeData.arrival_date} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
        </div>
        <div class="flex items-center mt-5 gap-5">
            <div class="flex relative flex-col gap-1">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">Select Vehicle</label>
                <input class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" type="text" placeholder="Select Vehicle" bind:value={inputVehicle} on:input={handleInputVehicleChange} required>
                {#if inputVehicle && showVehicleDropdown}
                <ul class="border w-full top-[90px] absolute rounded-md border-[#e0e0e0] bg-white py-3 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
                    {#each vehicles.filter(vehicle => 
                    vehicle.register_number && vehicle.register_number.toLowerCase().includes(inputVehicle.toLowerCase()) ||
                    vehicle.name && vehicle.name.toLowerCase().includes(inputVehicle.toLowerCase()) ||
                    vehicle.name && vehicle.model.toLowerCase().includes(inputVehicle.toLowerCase())
                    ) as filteredVehicle}
                    <li class="px-2 border-b-2 w-full" on:click={() => selectVehicle(filteredVehicle)}>{filteredVehicle.name} {filteredVehicle.model} ({filteredVehicle.register_number})</li>
                    {/each}
                </ul>
                {/if}
            </div>
            <div class="flex relative flex-col gap-1">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">Select Driver</label>
                <input class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" type="text" placeholder="Select Driver" bind:value={inputDriver} on:input={handleInputDriverChange} required>
                {#if inputDriver && showDriverDropdown}
                <ul class="border w-full top-[90px] absolute rounded-md border-[#ea8e8e] bg-white py-3 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
                    {#each drivers.filter(driver => 
                        driver.firstname  && driver.firstname.toLowerCase().includes(inputDriver.toLowerCase()) ||
                        driver.lastname && driver.lastname.toLowerCase().includes(inputDriver.toLowerCase()) ||
                        driver.register_number && driver.register_number.toLowerCase().includes(inputDriver.toLowerCase())
                    ) as filteredDriver}
                    <li class="px-2 border-b-2 w-full" on:click={() => selectDriver(filteredDriver)}>
                        {filteredDriver.firstname} {filteredDriver.lastname} ({filteredDriver.register_number})
                    </li>
                    {/each}
                </ul>
                {/if}
            </div>
        </div>
        <div>
            <button type="submit" class="hover:shadow-form w-full mt-5 rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">Add Route</button>
        </div>
    </div>
    <div class="w-full h-[600px] flex flex-col">
        <div class="flex items-center mb-10">
            <h1 class="w-[400px]">Select the start and end points</h1>
            <hr class="border border-1 border-black w-full">
        </div>
        <MapRoute on:startingPlaceChanged={handleStartingPlaceChanged} on:destinationChanged={handleDestinationChanged} startingPlace={[parseFloat(routeData.lng_start), parseFloat(routeData.lat_start)]} destination={[parseFloat(routeData.lng_end), parseFloat(routeData.lat_end)]}/>
    </div>
</form>
