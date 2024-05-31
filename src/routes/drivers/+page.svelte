<script>
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Delete from "$lib/components/Delete.svelte";
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-8">
  <div class="flex items-center justify-between pb-6">
    <h1 class="border-b py-6 text-4xl font-semibold">Drivers</h1>
    <div class="flex items-center justify-between">
      <div class="ml-10 space-x-8 lg:ml-40">
      </div>
    </div>
  </div>
  <SearchInput />
  <br>
  <div class="overflow-y-hidden rounded-lg border">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th class="px-5 py-3"></th>
            <th class="px-5 py-3">ID</th>
            <th class="px-5 py-5">Full Name</th>
            <th class="px-5 py-3">Username</th>
            <th class="px-5 py-3">Vehicule's Licence Plate</th>
            <th class="px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-500">
          <tr>
            <td class="py-3 ps-4">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">001</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div class="flex items-center">
                <div class="h-20 w-20 flex-shrink-0">
                  <img class="h-full w-full rounded-full" src="/src/routes/drivers/driver.png" alt="" />
                </div>
                <div class="ml-3">
                  <p class="whitespace-no-wrap">Khadraoui Kamel</p>
                </div>
              </div>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">K.Khadraoui</p>
            </td>
            <td class="px-6 py-4 ">
                <div class="border-2 w-40 rounded-md py-1 px-2 bg-yellow-400 border-black text-black flex items-center justify-center">
                    2365215
                </div>
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
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">003</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div class="flex items-center">
                <div class="h-20 w-20 flex-shrink-0">
                  <img class="h-full w-full rounded-2" src="/src/routes/drivers/Ellipse 9.png" alt="" />
                </div>
                <div class="ml-3">
                  <p class="whitespace-no-wrap">Mohamed AMINE</p>
                </div>
              </div>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">M.AMINE</p>
            </td>
            <td class="px-6 py-4 ">
                <div class="border-2 w-40 rounded-md py-1 px-2 bg-yellow-400 border-black text-black flex items-center justify-center">
                    2365215
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
                <button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Delete />
</div>
body