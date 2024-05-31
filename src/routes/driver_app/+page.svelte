
<body class="bg-gray-100">
    <div class="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg max-w-sm">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-meduim">Edit Profile</h2>
            <div>
                <button class="bg-violet-100 hover:bg-blue-700 text-blue-950 font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline" type="button">
                    Save
                </button>
            </div>
        </div>
        <form class="mx-auto max-w-lg">
    <div class="rounded-t-lg h-20 overflow-hidden">
        <div class="object-cover object-top w-full"></div>
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img id="profileImage" class="object-cover object-center h-32 w-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front'>
        <input type="file" id="imageUpload" accept="image/*" class="hidden" >
    </div>
    <br>
    <div class="mb-4 flex justify-between">
        <div class="w-1/2 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950">
            <input type="text" placeholder="First Name" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
        <div class="w-1/2 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950">
            <input type="text" placeholder="Last Name" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
    </div>
    <div class="mb-4">
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950">
            <input type="email" placeholder="Email" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
    </div>
    <div class="mb-4">
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950">
            <input type="text" placeholder="Phone" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
    </div>
    <div class="mb-4">
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950">
            <input type="date" placeholder="Date of birth" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
    </div>
    <br>
    <div class="mb-8"> 
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Changer le mot de passe
        </label>
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950">
            <input type="password" placeholder="Current Password" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-950 mt-4"> <!-- Ajout de la classe mt-4 pour espacer vers le bas -->
            <input type="password" placeholder="New Password" class="w-full border-none bg-transparent outline-none text-sky-950  focus:outline-none">
        </div>
    </div>
</form>
        <div class="flex items-center justify-between mb-6">
            <div class="flex flex-col items-center mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                    class="w-12 h-12 text-gray-800">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/>
                        <path d="m12 17l-1-4l-4-1l9-4z"/>
                    </g>
                </svg>
                <p class="mt-2 text-lg font-semibold text-gray-800">Route</p>
            </div>
            <div class="flex flex-col items-center mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                    class="w-12 h-12 text-gray-800">
                    <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/>
                        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21"/>
                    </g>
                </svg>
                <p class="mt-2 text-lg font-semibold text-gray-800">Profil</p>
            </div>
        </div>
    </div>
</body>

