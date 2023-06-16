Vue.component("sidebar", {
  template: `
  <aside class="hidden w-80 bg-gray-800 sm:block h-full">
  <div class="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
      <a href="/" class="text-white">Tailmin</a>
  </div>

  <nav class="text-sm text-gray-300">
      <ul class="flex flex-col">
          <li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Section</li>

          <li class="px-4 cursor-pointer hover:bg-gray-700">
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
              </a>
          </li>

          <li>
              <div class="pl-4 pr-2 py-3 flex items-center w-full hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  User Management
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                          d="M10 17a7 7 0 100-14 7 7 0 000 14zm1-8a1 1 0 11-2 0V7a1 1 0 112 0v2zm0 4a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd" />
                  </svg>
              </div>
              <ul v-show="open" class="ml-8">
                  <li class="py-2">
                      <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                  d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fill-rule="evenodd"
                                  d="M10 4a8 8 0 100 16 8 8 0 000-16zm0 18a10 10 0 100-20 10 10 0 000 20zM3 10a7 7 0 0110-6.33 1 1 0 10-1.38-1.44A9 9 0 0010 19a9 9 0 110-18 1 1 0 10.69 1.86A7 7 0 013 10z"
                                  clip-rule="evenodd" />
                          </svg>
                          User List
                      </a>
                  </li>
                  <li class="py-2">
                      <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                  d="M13 6a1 1 0 011 1v5a1 1 0 01-2 0V7a1 1 0 011-1z" />
                              <path
                                  d="M4 10a2 2 0 012-2h4a2 2 0 012 2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5zm6-2a1 1 0 00-1-1H6a1 1 0 00-1 1v1h5V8z" />
                          </svg>
                          Add User
                      </a>
                  </li>
                  <li class="py-2">
                      <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path fill-rule="evenodd"
                                  d="M10 4a8 8 0 00-8 8v2a1 1 0 102 0v-2a6 6 0 1112 0v2a1 1 0 102 0v-2a8 8 0 00-8-8zm-1 10a1 1 0 11-2 0 1 1 0 012 0zm1-8a1 1 0 00-2 0v6a1 1 0 102 0V6z"
                                  clip-rule="evenodd" />
                          </svg>
                          Edit User
                      </a>
                  </li>
              </ul>
          </li>
      </ul>
  </nav>
</aside>

<main class="min-h-screen bg-gray-100">
  <header class="bg-white shadow">
      <div class="flex items-center justify-between px-4 py-3">
          <button class="text-gray-500 focus:outline-none sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
          </button>

          <h1 class="text-lg font-semibold">Dashboard</h1>

          <div class="flex items-center">
              <button class="text-gray-500 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                  </svg>
              </button>
              <button class="ml-4 text-gray-500 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                  </svg>
              </button>
          </div>
      </div>
  </header>

</main>
</div>`,
  data() {
    return {
      open: false,
    };
  },
});

const app = new Vue({
  el: "#app",
  data: {
    tableColumns: [
      "user",
      "role",
      "status",
      "last activity",
      "join date",
      "actions",
    ],
    userData: [
      {
        name: "John Doe",
        email: "johnDoe@gmail.com",
        avatar: "https://i.pravatar.cc/300",
        role: "admin",
        status: "active",
        lastActivity: "1 min ago",
        joinDate: "2023-06-16T02:56:02.677Z",
      },
      {
        name: "John User",
        email: "johnDoe@gmail.com",
        avatar: "https://i.pravatar.cc/300",
        role: "user",
        status: "suspended",
        lastActivity: "1 min ago",
        joinDate: "2023-06-16T02:56:02.677Z",
      },
      {
        name: "John Admin",
        email: "johnDoe@gmail.com",
        avatar: "https://i.pravatar.cc/300",
        role: "admin",
        status: "active",
        lastActivity: "1 min ago",
        joinDate: "2023-06-16T02:56:02.677Z",
      },
    ],
  },
  methods: {},
});

