<script>
    import SearchInput from "$lib/components/SearchInput.svelte";
</script>
<SearchInput />
<div class="flex justify-center items-center h-screen">
  <table class="w-5/6 divide-y divide-gray-200 ">
    <thead>
        
        <tr>
            <th scope="col" class="py-3 px-4 pe-0">
              <div class="flex items-center h-5">
                  <input id="hs-table-pagination-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                  <label for="hs-table-pagination-checkbox-all" class="sr-only">Checkbox</label>
                </div>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicule</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Plate</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          </td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's image</td>
            <td class="px-6 py-4 whitespace-nowrap ">
              <div class="border-2  rounded-md py-1 px-2 bg-yellow-400 border-black text-black">  2365215</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's name</td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's driver</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
                <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </td>
        </tr>
        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          </td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's image</td>
            <td class="px-6 py-4 whitespace-nowrap ">
              <div class="border-2  rounded-md py-1 px-2 bg-yellow-400 border-black text-black">  2365215</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's name</td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's driver</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Maintenance</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
                <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </td>
        </tr>
        <tr>
          <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          </td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's image</td>
            <td class="px-6 py-4 whitespace-nowrap ">
              <div class="border-2  rounded-md py-1 px-2 bg-yellow-400 border-black text-black">  2365215</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's name</td>
            <td class="px-6 py-4 whitespace-nowrap">Vehicule's driver</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In use</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
                <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </td>
        </tr>
    </tbody>
</table>
</div>