
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<head>
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
  </head>

<script>
    import Logout from "./Logout.svelte";
    import "./Style.css";
    import { onMount } from "svelte";
    import axios from "axios";
    
    let logoutModalOpen = false;
    let userRole = null; // Add a variable to store the user's role
    let token;

    function openLogoutModal() {
        logoutModalOpen = true;
        console.log(logoutModalOpen);
    }

    // Fetch the user's role from the protected route
    async function protectedRoute() {
        token = localStorage.getItem('token');
        
        try {
            const res = await axios.get("http://127.0.0.1:8080/protected", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            userRole = res.data.role;
            console.log("User role: ", userRole);
        } catch (error) {
            console.log(error);
        }
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            protectedRoute();
        }
    });
</script>
<aside class="sidebar">
    <div></div>
        
    {#if userRole == 'admin'}
    <ul class="nav-list mt-20 mb-20 h-full">
        
            <li class="relative my-8">
                <a href="/dashboard">
                    <i class="bx bx-grid-alt text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                    <span class="link_name">Dashboard</span>
                </a>
                <span class="tooltip">Dashboard</span>
            </li>
            
        <li class="relative my-8">
            <a href="/tracking">
                <i class="bx bx-map text-white h-16 leading-16 min-w-12 text-lg text-center" id="driver"></i>
                <span class="link_name">Tracking</span>
            </a>
            <span class="tooltip">Tracking</span>
        </li>
        <li class="relative my-8">
            <a href="/vehicles">
                <i class="bx bx-car text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                <span class="link_name">Vehicles</span>
            </a>
            <span class="tooltip">Vehicles</span>
        </li>
        <li class="relative my-8">
            <a href="/drivers" class="">
                <i class="bx bx-user text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                <span class="link_name">Drivers</span>
            </a>
            <span class="tooltip">Drivers</span>
        </li>
        <li class="relative my-8">
            <a href="/routes">
                <i class="ph ph-path text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                <span class="link_name">Routes</span>
            </a>
            <span class="tooltip">Routes</span>
        </li>
                    <li class="relative my-8">
                <a href="/operators">
                    <i class="bx bx-user text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                    <span class="link_name">Operators</span>
                </a>
                <span class="tooltip">Operators</span>
            </li>
            
            <li class="relative my-8">
                <a href="/settings">
                <i class="bx bx-cog text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                <span class="link_name">Settings</span>
            </a>
            <span class="tooltip">Settings</span>
        </li>
        <li class="relative my-8">
            <button on:click={openLogoutModal}>
                <i class="bx bx-log-out-circle text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
            </button>
            <span class="tooltip">Log out</span>
        </li>
    </ul>
    


        {/if}
        {#if userRole == 'operator'}
        
        <ul class="nav-list  mt-24 mb-20 h-full">
            
            <li class="relative my-8">
                <a href="/drivers">
                    <i class="bx bx-user text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                    <span class="link_name">Drivers</span>
                </a>
                <span class="tooltip">Drivers</span>
            </li>
            
            <li class="relative my-8">
                <a href="/vehicles">
                <i class="bx bx-car text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
                <span class="link_name">Vehicles</span>
            </a>
            <span class="tooltip">Vehicles</span>
        </li>
    
    <li class="relative my-8">
        <a href="/tracking">
            <i class="bx bx-map text-white h-16 leading-16 min-w-12 text-lg text-center" id="driver"></i>
            <span class="link_name">Tracking</span>
        </a>
        <span class="tooltip">Tracking</span>
    </li>
    <li class="relative my-8">
        <a href="/routes">
            <i class="ph ph-path text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
            <span class="link_name">Routes</span>
        </a>
        <span class="tooltip">Routes</span>

    
    <li class="relative my-8">
        <a href="/settings">
            <i class="bx bx-cog text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
            <span class="link_name">Settings</span>
        </a>
        <span class="tooltip">Settings</span>
    </li>
    <li class="relative my-8">
        <button on:click={openLogoutModal}>
            <i class="bx bx-log-out-circle text-white h-16 leading-16 min-w-12 text-lg text-center"></i>
            <span class="link_name">Log out</span>
        </button>
    </li>
</ul>

    
    {/if}
</aside>
{#if logoutModalOpen}
<Logout open={logoutModalOpen} on:close={() => logoutModalOpen = false}/>
{/if}