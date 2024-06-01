<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import axios from 'axios';
    import MapRoute from "$lib/components/maps/MapRoute.svelte";

    const dispatch = createEventDispatcher();
    let id;
    let token = localStorage.getItem('token');
    let msg;

    const vehicles = [
        { 
            id: '1',
            register_number: '1',
            name: 'veh1',
        },
        { 
            id: '2',
            register_number: '1',
            name: 'veh1',
        },
        { 
            id: '3',
            register_number: '1',
            name: 'veh1',
        }
    ];
    
    const drivers = [
        { 
            id: '1',
            register_number: '1',
            firstname: 'veh1',
            lastname: 'vvv2',
        },
        { 
            id: '2',
            register_number: '1',
            firstname: 'veh1',
            lastname: 'vvv2',
        },
        { 
            id: '3',
            register_number: '1',
            firstname: 'veh1',
            lastname: 'vvv2',
        }
    ];

    let routeData = {
        departure_city: "",
        arrival_city: "",
        departure_date: "",
        arrival_date: "",
        lat_start: "",
        lng_start: "",
        lat_end: "",
        lng_end: "",
        driver_id: "",
        vehicle_id: "",
        created_by: ""
    };

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

    let inputDriver = "";
    let inputVehicle = "";

    function handleInputDriverChange(event) {
        inputDriver = event.target.value;
    }

    function handleInputVehicleChange(event) {
        inputVehicle = event.target.value;
    }

    function selectDriver(driver) {
    inputDriver = `${driver.firstname} ${driver.lastname}`;
    routeData.driver_id = driver.id;
    console.log(driver.id);
    dispatch('driverSelected', driver);
}

    function selectVehicle(vehicle) {
        inputVehicle = `${vehicle.name} ${vehicle.model}`;
        routeData.vehicle_id = vehicle.id;
        dispatch('vehicleSelected', vehicle);
    }

    function handleStartingPlaceChanged(event) {
        const { lat, lng } = event.detail.startingPlace;
        routeData.lat_start = lat;
        routeData.lng_start = lng;
    }

    function handleDestinationChanged(event) {
        const { lat, lng } = event.detail.destination;
        routeData.lat_end = lat;
        routeData.lng_end = lng;
    }

    function handleRouteChanged(event) {
        routeData.distance = event.detail.distance;
        routeData.duration = event.detail.duration;
    }

    async function handleAdd(event) {
        event.preventDefault();
        try {
            const res = await axios.post(`http://127.0.0.1:8080/api/route/add`, routeData);
            console.log(res.data);
            msg = "route added successfully";
            window.location.href = "/routes";
        } catch (error) {
            console.log(error);
            msg = "Failed to add route";
        }
    }
</script>

<form on:submit={handleAdd} class="mx-auto max-w-7xl px-4 py-8 sm:px-8">
    <!-- Vos éléments de formulaire ici -->
</form>

<form on:submit={handleAdd} class="flex gap-10 mx-auto max-w-7xl px-4 py-8 sm:px-8">
    <div class="flex-col w-[30%]">
        <div class="flex items-center">
            <h1>Add the informations</h1>
            <hr>
        </div>
        <div class="flex items-center">

            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">Start Address</label>
                <input type="text" placeholder="Start Address" bind:value={routeData.departure_city} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">End Address</label>
                <input type="text"  placeholder="End Address" bind:value={routeData.arrival_city} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
        </div>
       
        <div>
            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">Start Date</label>
                <input type="date" placeholder="Start Date" bind:value={routeData.departure_date} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>

            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">Start Date</label>
                <input type="date" placeholder="Start Date" bind:value={routeData.arrival_date} class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
        </div>
        <div class="flex items-center">
            <div>
                <input class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" type="text" placeholder="Select Vehicle" bind:value={inputVehicle} on:input={handleInputVehicleChange} required>
                <ul class="border  rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
                    {#each vehicles.filter(vehicle => vehicle.register_number.toLowerCase().includes(inputVehicle.toLowerCase())) as filteredVehicle}
                    <li class="border  rounded-md border-[#ea8e8e] bg-white " on:click={() => selectVehicle(filteredVehicle)}>{filteredVehicle.register_number}</li>
                    {/each}
                </ul>
            </div>
            <div>
                <input class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" type="text" placeholder="Select Driver" bind:value={inputDriver} on:input={handleInputDriverChange} required>
                <ul class="border  rounded-md border-[#ea8e8e] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
                    {#each drivers.filter(driver => 
                        driver.firstname.toLowerCase().includes(inputDriver.toLowerCase()) ||
                        driver.lastname.toLowerCase().includes(inputDriver.toLowerCase())
                    ) as filteredDriver}
                    <li on:click={() => selectDriver(filteredDriver)}>
                        {filteredDriver.firstname} {filteredDriver.lastname}
                    </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div>
            <button class="hover:shadow-form w-full rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">Add Route</button>
        </div>
    </div>
    <div class="w-[70%] h-[400px] flex flex-col">
        <div class="flex items-center">
            <h1>Select the start and end points</h1>
            <hr>
        </div>
        <MapRoute on:startingPlaceChanged={handleStartingPlaceChanged} on:destinationChanged={handleDestinationChanged} on:routeChanged={handleRouteChanged}/>
    </div>
</form>
