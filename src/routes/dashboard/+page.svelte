<script>
  import Line from "$lib/components/charts/line.svelte";
  import Pie from "$lib/components/charts/pie.svelte";
  import axios from "axios";
  import { onMount, onDestroy } from "svelte";

  let messages = [];
  let socket;
  let operatorNumber = 0;
  let vehicleNumber = 0;
  let droneNumber = 0;
 
  let routeNumber = 0;
  let driverNumber = 0;

  // Function to initialize WebSocket connection
  function initWebSocket() {
    socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      messages = [...messages, event.data];
      console.log(messages);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  async function fetchData() {
    try {
      const [
        operatorRes,
        vehicleRes,
        droneRes,
        routeRes,
        driverRes,
      ] = await Promise.all([
        axios.get("http://127.0.0.1:8080/api/user/operators_number"),
        axios.get("http://127.0.0.1:8080/api/vehicle/vehicles_number"),
        axios.get("http://127.0.0.1:8080/api/vehicle/drones_number"),
          axios.get("http://127.0.0.1:8080/api/route/route_number"),
        axios.get("http://127.0.0.1:8080/api/driver/driver_number"),
      ]);

      operatorNumber = operatorRes.data.data || 0;
      vehicleNumber = vehicleRes.data.data || 0;
      droneNumber = droneRes.data.data || 0;
      routeNumber = routeRes.data.data || 0;
      driverNumber = driverRes.data.data || 0;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Call the function to initialize WebSocket connection on component mount
  onMount(() => {
    initWebSocket();

   fetchData()

  });

  onDestroy(() => {
    if (socket) {
      socket.close();
    }
  });
</script>

<!-- Container to center the content -->
<div class="container flex flex-col">
  <div class="cardBox">
    <div class="card">
      <div>
        <div class="numbers flex items-center">
          <div class="numbers flex items-center"><span class="mr-4">{operatorNumber}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class= "text-gray-600 text-opacity-100" width="70px" height="70px"  viewBox="0 0 16 16"><path fill="currentColor" d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.735 6c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139z"/></svg>
          </div>
        </div>
        <div class="cardName flex items-center justify-center text-2xl">
          <b><span>Operators</span></b>
        </div>
      </div>
    </div>

    <div class="card">
      <div>
        <div class="numbers flex items-center">
          <span class="mr-4">{vehicleNumber}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-600 text-opacity-100" width="70px" height="70px" viewBox="0 0 24 24">
            <path fill="currentColor" d="m20.772 10.155l-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845M7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6M5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16m13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16"/>
          </svg>
        </div>
        <div class="cardName flex items-center justify-center text-2xl">
          <b><span>Vehicles</span></b>
        </div>
      </div>
    </div>

    <div class="card">
      <div>
        <div class="numbers flex items-center">
          <div class="numbers flex items-center"><span class="mr-4">{droneNumber}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class= "text-gray-600 text-opacity-100" width="70px" height="70px"  viewBox="0 0 256 256"><path fill="currentColor" d="M189.66 66.34a8 8 0 0 0-11.32 0L148.69 96h-41.38L77.66 66.34a8 8 0 0 0-11.32 11.32L96 107.31v41.38l-29.66 29.65a8 8 0 0 0 11.32 11.32L107.31 160h41.38l29.65 29.66a8 8 0 0 0 11.32-11.32L160 148.69v-41.38l29.66-29.65a8 8 0 0 0 0-11.32M112 112h32v32h-32Zm26.51-50.67a44 44 0 1 1 56.16 56.16a7.9 7.9 0 0 1-2.67.51a8 8 0 0 1-2.67-15.54a28 28 0 1 0-35.74-35.74a8 8 0 1 1-15.08-5.34ZM224 180a44 44 0 0 1-85.49 14.67a8 8 0 0 1 15.08-5.34a28 28 0 1 0 35.74-35.74a8 8 0 0 1 5.34-15.08A44.07 44.07 0 0 1 224 180m-106.51 14.67a44 44 0 1 1-56.16-56.16a8 8 0 0 1 5.34 15.08a28 28 0 1 0 35.74 35.74a8 8 0 0 1 15.08 5.34M32 76a44 44 0 0 1 85.49-14.67a8 8 0 1 1-15.08 5.34a28 28 0 1 0-35.74 35.74A8 8 0 0 1 64 118a7.9 7.9 0 0 1-2.67-.46A44.07 44.07 0 0 1 32 76"/></svg>
          </div>
        </div>
        <div class="cardName flex items-center justify-center text-2xl">
          <b><span>UAV</span></b>
        </div>
      </div>
    </div>

    <div class="card">
      <div>
        <div class="numbers flex items-center">
          <div class="numbers flex items-center"><span class="mr-4">{driverNumber}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class= "text-gray-600 text-opacity-100" width="70px" height="70px"  viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"/></svg>
          </div>
        </div>
        <div class="cardName flex items-center justify-center text-2xl">
          <b><span>Drivers</span></b>
        </div>
      </div>
    </div>

    <div class="card">
      <div>
        <div class="numbers flex items-center">
          <div class="numbers flex items-center"><span class="mr-8">{routeNumber}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class= "text-gray-600 text-opacity-100" width="70px" height="70px" viewBox="0 0 100 100"><path fill="currentColor" d="M21 32C9.459 32 0 41.43 0 52.94c0 4.46 1.424 8.605 3.835 12.012l14.603 25.244c2.045 2.672 3.405 2.165 5.106-.14l16.106-27.41c.325-.59.58-1.216.803-1.856A20.668 20.668 0 0 0 42 52.94C42 41.43 32.544 32 21 32m0 9.812c6.216 0 11.16 4.931 11.16 11.129c0 6.198-4.944 11.127-11.16 11.127c-6.215 0-11.16-4.93-11.16-11.127c0-6.198 4.945-11.129 11.16-11.129M87.75 0C81.018 0 75.5 5.501 75.5 12.216c0 2.601.83 5.019 2.237 7.006l8.519 14.726c1.193 1.558 1.986 1.262 2.978-.082l9.395-15.99c.19-.343.339-.708.468-1.082a12.05 12.05 0 0 0 .903-4.578C100 5.5 94.484 0 87.75 0m0 5.724c3.626 0 6.51 2.876 6.51 6.492c0 3.615-2.884 6.49-6.51 6.49c-3.625 0-6.51-2.875-6.51-6.49c0-3.616 2.885-6.492 6.51-6.492"/><path fill="currentColor" fill-rule="evenodd" d="M88.209 37.412c-2.247.05-4.5.145-6.757.312l.348 5.532a126.32 126.32 0 0 1 6.513-.303zm-11.975.82c-3.47.431-6.97 1.045-10.43 2.032l1.303 5.361c3.144-.896 6.402-1.475 9.711-1.886zM60.623 42.12a24.52 24.52 0 0 0-3.004 1.583l-.004.005l-.006.002c-1.375.866-2.824 1.965-4.007 3.562c-.857 1.157-1.558 2.62-1.722 4.35l5.095.565c.038-.406.246-.942.62-1.446h.002v-.002c.603-.816 1.507-1.557 2.582-2.235l.004-.002a19.64 19.64 0 0 1 2.388-1.256zM58 54.655l-3.303 4.235c.783.716 1.604 1.266 2.397 1.726l.01.005l.01.006c2.632 1.497 5.346 2.342 7.862 3.144l1.446-5.318c-2.515-.802-4.886-1.576-6.918-2.73c-.582-.338-1.092-.691-1.504-1.068m13.335 5.294l-1.412 5.327l.668.208l.82.262c2.714.883 5.314 1.826 7.638 3.131l2.358-4.92c-2.81-1.579-5.727-2.611-8.538-3.525l-.008-.002l-.842-.269zm14.867 7.7l-3.623 3.92c.856.927 1.497 2.042 1.809 3.194l.002.006l.002.009c.372 1.345.373 2.927.082 4.525l5.024 1.072c.41-2.256.476-4.733-.198-7.178c-.587-2.162-1.707-4.04-3.098-5.548M82.72 82.643a11.84 11.84 0 0 1-1.826 1.572h-.002c-1.8 1.266-3.888 2.22-6.106 3.04l1.654 5.244c2.426-.897 4.917-1.997 7.245-3.635l.006-.005l.003-.002a16.95 16.95 0 0 0 2.639-2.287zm-12.64 6.089c-3.213.864-6.497 1.522-9.821 2.08l.784 5.479c3.421-.575 6.856-1.262 10.27-2.18zm-14.822 2.836c-3.346.457-6.71.83-10.084 1.148l.442 5.522c3.426-.322 6.858-.701 10.285-1.17zm-15.155 1.583c-3.381.268-6.77.486-10.162.67l.256 5.536c3.425-.185 6.853-.406 10.28-.678zm-15.259.92c-2.033.095-4.071.173-6.114.245l.168 5.541a560.1 560.1 0 0 0 6.166-.246z" color="currentColor"/></svg>
          </div>
        </div>
        <div class="cardName flex items-center justify-center text-2xl">
          <b><span>Routes</span></b>
        </div>
      </div>
    </div>
  </div>

  <div class="flex">
    <Line 
      borderColor={'rgb(255, 99, 132)'}
      months={12}
      label="Vehicles Created By Month"
    />

    <Pie 
    backgroundColor={[
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ]}
    labels={[
      'Available',
      'Maintenance',
      'In Use'
    ]}
    label="Vehicle Status"
  />

  </div>
</div>

<style>
 
  .container {
    display: flex;
    align-items: center; 
    width: 90%;
    gap: 50px;
    height: 100vh; 
    margin-left: 10%; 
    margin-top: 50px;
  }
  
  .cardBox {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  
  .card {
    flex: 0 1 calc(20% - 20px);
    background: var(--white);
    padding: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  }
  
  .card .numbers {
    font-weight: 500;
    font-size: 2.5rem;
    color: var(--blue);
  }
  
  .card .cardName {
    color: var(--black2);
    font-size: 1.1rem;
    margin-top: 5px;
  }
  
  .card:hover {
    background: var(--blue);
  }
  
  .card:hover .numbers,
  .card:hover .cardName {
    color: var(--white);
  }
  
  .icon {
    width: 70px;
    height: 70px;
  }
</style>
