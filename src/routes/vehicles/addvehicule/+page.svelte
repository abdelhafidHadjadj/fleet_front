
<div class="flex items-center justify-center p-12">
    <!-- Author: FormBold Team -->
    <div class="mx-auto w-full max-w-[550px] bg-white">
        <form>
            <div class="rounded-t-lg h-32 overflow-hidden">
                <div class="object-cover object-top w-full"></div>
            </div>
            <div class="mx-auto w-60 h-40 relative -mt-16 border-4 border-white overflow-hidden">
                <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1580225599687-30d87d260b0b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Car'>
            </div>


            
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                    Registration number
                </label>
                <input type="text" name="name" id="name" placeholder="Registration number"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                    Name
                </label>
                <input type="text" name="name" id="name" placeholder="Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                    Model
                </label>
                <input type="text" name="name" id="name" placeholder="Model"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="type" class="mb-3 block text-base font-medium text-[#07074D]">
                    Type
                </label>
                <select name="type" id="type" value="vehicule"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md">
                    <option value="car">
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.68 5.7l-1.84-1.84a2 2 0 0 0-2.83 0L15 5.29m-9.9 9.9l-1.83-1.83M4.96 14H2v4h3.5l1.03-1.03M21 10.1V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.2"></path>
                        </svg> Car
                    </option>
                    <option value="truck">
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3-3h4l3 3m-6 0V4m0 2h4m-4 5v4m0-4h4m5-2l3 3h4l3-3m-6 0v4m0-4h4m-14 6v3m0 0h3m-3 0l-1 5h16l-1-5m-15 2h16v6H5v-6z"></path>
                        </svg> Truck
                    </option>
                    <option value="motorcycle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.36 6L16 13l-1 3-2 2H6.64L4 17c-.97-.33-1.33-.97-1.64-1.64C2.02 14 2 13 2 12c0-1 1-3 3-3l.82-.02L6 5l1.46-2.92C7.79 2.36 8.35 2 9 2h4c.64 0 1.21.36 1.54.92L16 5l-.18 1H13l1-3h1l3-1h2l2 1h1l1 1v2.01l-2-.01"></path>
                        </svg> Motorcycle
                    </option>
                    <option value="drone">
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.88 9.59l1.42 1.42-6.2 6.2a2 2 0 0 1-2.83 0l-3.88-3.88a2 2 0 0 1 0-2.83l6.2-6.2 1.42 1.42-6.2 6.2"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11v3m4-3v3m4-3v3"></path>
                        </svg> Drone
                    </option>
                </select>
            </div>

            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                    Charge Type
                </label>
                <input type="text" name="name" id="name" placeholder="Charge Type"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-700 focus:shadow-md" />
            </div>
            <div>
                <button
                    class="hover:shadow-form w-full rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Save
                </button>
            </div>
        </form>
    </div>
</div>