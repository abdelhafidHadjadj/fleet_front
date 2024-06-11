<script>
    import NavBar from "$lib/components/NavBar.svelte";
    import MapMobile from "$lib/components/maps/MapMobile.svelte";
    import BoxInfo from "$lib/components/BoxInfo.svelte";
    import axios from "axios";
    import { onMount } from "svelte";
    
    let id;
    let myRoute;
    let msg;
    let token;

    async function protectedRoute() {
        token = localStorage.getItem('tokenDriver');
        
        try {
            const res = await axios.get("http://127.0.0.1:8080/protected", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            id = res.data.id;
            console.log("id: ", id);
            await handleGet(); // Call handleGet after id is set
        } catch (error) {
            console.log(error);
        }
    }

    async function handleGet() {
        try {
            const res = await axios.get(`http://127.0.0.1:8080/api/route/my_routes/${id}`);
            myRoute = res.data.data[0];
            console.log('route: ', myRoute);
            msg = "Driver data retrieved successfully";
        } catch (error) {
            console.log(error);
            msg = "Failed to get driver data";
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            protectedRoute();
        }
    });
</script>

<NavBar/>

{#if myRoute}
    <BoxInfo depart={myRoute.departure_city} end={myRoute.arrival_city} dateDepart={myRoute.departure_date} dateArrive={myRoute.arrival_date}/>
    <MapMobile pointA={{ lat: myRoute.lat_start, lng: myRoute.lng_start }} pointB={{ lat: myRoute.lat_end, lng: myRoute.lng_end }}/>
{:else}
    <p>Loading route data...</p>
{/if}
