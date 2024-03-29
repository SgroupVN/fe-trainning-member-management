<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import TrashBin from '@/components/icons/TrashBin.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import CaretDownIcon from '@/components/icons/CaretDownIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import Summary from '@/components/pagination/Summary.vue'
import UserPopup from '@/components/popup/UserPopup.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useUsersStore } from '@/store'
import { storeToRefs } from 'pinia'
import { notify } from '@kyvg/vue3-notification'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const users = useUsersStore()
const { items, total, page, query, itemPerPage } = storeToRefs(users)

const selectAll = ref(false)
const togglePopup = ref(false)

users.page = route.query.page ?? 1
users.itemPerPage = route.query.limit ?? 10
users.query = route.query.query ?? ''

users.get(auth.token)

function onPageChange(type, payload) {
  const routeChange = {
    query: {
      page: payload ? payload - 0 : page.value - 0 + type,
    },
  }
  if (query.value) routeChange.query.query = query.value
  if (itemPerPage.value) routeChange.query.limit = itemPerPage.value
  router.push({
    name: route.name,
    ...routeChange,
  })
}

async function deleteUser(id) {
  if (id === !auth.user.id) return
  const res = await users.delete(auth.token, id)
  if (res) {
    notify({
      type: 'success',
      title: 'Success!',
      text: res.data.message,
    })
  }
}
</script>

<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <UserPopup :is-show="togglePopup" @toggle="togglePopup = false" @data-updated="users.get(auth.token)" />

    <!-- Title -->
    <h2 class="text-2xl text-gray-600">User List</h2>

    <!-- Breadcrumb -->
    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Users</span>
    </div>
  </div>

  <!-- UserList start -->
  <div class="p-4 mt-8 sm:px-8 sm:py-4">
    <div class="bg-white rounded">
      <div class="px-4 pt-4 flex justify-between">
        <!-- Search Input -->
        <div>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon />
            </span>
            <input
              id="search"
              name="search"
              type="search"
              class="w-full py-2 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10"
              placeholder="Search user"
            />
          </div>
        </div>

        <!-- Add new button -->
        <div>
          <div>
            <button
              class="flex items-center bg-green-500 p-2 text-white rounded text-sm hover:bg-green-600"
              @click="togglePopup = true"
            >
              <PlusIcon />
              Create New
            </button>
          </div>
        </div>
      </div>
      <table class="w-full mt-2 text-gray-500">
        <thead class="border-b">
          <tr>
            <th class="p-2 pl-4 text-left text-gray-600">
              <input
                v-model="selectAll"
                type="checkbox"
                class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
              />
            </th>
            <th class="text-left text-gray-600">USER</th>
            <th class="text-left text-gray-600">ROLE</th>
            <th class="text-left text-gray-600">STATUS</th>
            <th class="text-left text-gray-600">JOIN DATE</th>
            <th class="text-right text-gray-600 pr-4">ACTIONS</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in items" :key="user.id">
            <td class="pl-4 w-11">
              <input
                type="checkbox"
                class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
                :checked="selectAll"
              />
            </td>
            <td class="flex items-center py-4 w-80">
              <div class="w-10">
                <img
                  v-if="user.avatar"
                  class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  :src="user.avatar"
                  :alt="user.name"
                />
                <UserIcon v-else class="inline-block h-10 w-10 rounded-full ring-2 ring-black" />
              </div>
              <div class="px-4 w-[20rem] overflow-hidden cursor-pointer">
                <div
                  class="text-gray-600 font-bolder w-[20rem] block overflow-hidden whitespace-nowrap text-ellipsis"
                  @click="$router.push({ name: 'user-detail', params: { id: user.id } })"
                >
                  {{ user.name }}
                </div>
                <div class="font-bold text-sm w-[20rem] overflow-hidden whitespace-nowrap text-ellipsis">
                  {{ user.email }}
                </div>
              </div>
            </td>

            <!--  -->
            <td class="w-20">TODO</td>
            <td class="w-20">
              <span v-if="user.isActive" class="px-2 py-1 rounded text-xs text-white bg-green-500">Active</span>
              <span v-else class="px-2 py-1 rounded text-xs text-white bg-red-500">TODO</span>
            </td>
            <td class="w-24">{{ user.createdAt ? user.createdAt.split('T')[0] : '' }}</td>
            <td class="text-right pr-4 w-32">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Actions
                    <CaretDownIcon />
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-gray-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-violet-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Edit
                        </button>
                      </MenuItem>
                      <MenuItem v-if="user.id !== auth.user.id" v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-red-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                          @click="deleteUser(user.id)"
                        >
                          <TrashBin />
                          Delete
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>
          </tr>
        </tbody>
        <tfoot class="border-gray-200 border-t">
          <tr>
            <td colspan="7" class="py-2 px-4">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <Summary :page="users.page" :items-per-page="users.itemPerPage" :total="total" />
                </div>
                <div>
                  <Pagination
                    :total="users.total"
                    @prev="onPageChange(-1)"
                    @current-change="onPageChange(true, $event)"
                    @next="onPageChange(1)"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
