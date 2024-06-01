<script>
  import { createEventDispatcher } from "svelte";
    export let link;

const dispatch = createEventDispatcher();

function handleInput(event) {
    const inputValue = event.target.value;
    dispatch('search', inputValue);
  }

</script>



<form class="max-w-lg mx-auto px-4 flex items-center space-x-2">   
    <div class="relative flex-grow">
        <input  on:input={handleInput} type="search" id="default-search" class="block w-full h-12 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 h-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    <button type="button" class="h-12 w-12 bg-gray-50 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm flex items-center justify-center dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 text-gray-900 dark:text-white">
        <i class="ph ph-sliders text-2xl text-gray-300"></i>
    </button>
    <a href={`${link}`} class="h-12 px-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white">
        <span class="text-2xl">+</span>
    </a>
</form>