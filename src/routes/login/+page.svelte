
<script>
	import axios from "axios";

let userRole;  
  let msg;
  let token;
  async function handleSubmit(e) {
    e.preventDefault()
    let data = {
      loginType: "user",
      email: e.target.email.value,
      password: e.target.password.value
    }
    console.log(data);
    await axios.post("http://127.0.0.1:8080/login", data).then(res => {
    console.log(res.data);
    token = res.data.token
    localStorage.setItem("token", res.data.token);
}).catch(err => {
    console.error(err);
    msg = "Invalid credentials"
  });
    
  protectedRoute()

  }


  async function protectedRoute() {
    try {
      const res = await axios.get("http://127.0.0.1:8080/protected", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      if (res.data.role == 'operator') {
        window.location.href = "/drivers"
      }
      if (res.data.role == 'admin') {
        window.location.href = "/dashboard"
      }

    } catch (error) {
      console.log(error);

    }
  }

</script>


<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <br>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome to fleet managment plateform!</h2>
  </div>
  
  <p class="font-semibold text-red-500 flex justify-center items-center">{msg? msg: ""}</p>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    
    <form class="space-y-6" on:submit={handleSubmit} >
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div class="mt-2">
          <input  id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="/" class="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input  id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Log in</button>
      </div>
    </form>
  </div>
</div>
