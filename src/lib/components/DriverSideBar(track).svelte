<script>
    import SearchInput from './SearchInput.svelte';
    import DriverItem from './DriverItem(track).svelte';
  
    const data = [
      {
        id: "1",
        firstname: "Hadjadj",
        lastname: "abdel",
        avatar: ""
      },
      {
        id: "2",
        firstname: "Hadjadj",
        lastname: "abdel",
        avatar: ""
      }
    ];
  </script>
  
  <div class="driver-sidebar border w-[30%]" id="driverSidebar">
      <SearchInput />
      {#each data as item}
           {item.firstname} 
           <DriverItem avatar={item.avatar} fullname={`${item.firstname} ${item.lastname}`}/>
      {/each}
  </div>
  