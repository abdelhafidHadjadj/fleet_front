<!-- App.svelte -->
<script>
  import MapTracking from "../../lib/components/maps/MapTracking.svelte";
  import SideBarTrack from "../../lib/components/DriverSideBar(track).svelte";

  let id = null;
  
  function handleSelected(event) {
      id = event.detail.id;
      console.log('Selected ID:', id);
  }

</script>

<SideBarTrack on:vehicleSelected={handleSelected}/>
<MapTracking selectedId={id}/>
