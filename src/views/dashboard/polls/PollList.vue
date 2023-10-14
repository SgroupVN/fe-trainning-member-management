<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import TrashBin from '@/components/icons/TrashBin.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import CaretDownIcon from '@/components/icons/CaretDownIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import Summary from '@/components/pagination/Summary.vue'
import PollPopup from '@/components/popup/PollPopup.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, usePollsStore, usePollStore } from '@/store'
import { storeToRefs } from 'pinia'
import { notify } from '@kyvg/vue3-notification'
import EditPollPopup from '@/components/popup/EditPollPopup.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const polls = usePollsStore()
const { items, total, page, query, itemPerPage } = storeToRefs(polls)

const selectAll = ref(false)
const togglePopup = ref(false)
const toggleEditPopup = ref(false)

polls.page = route.query.page ?? 1
polls.itemPerPage = route.query.limit ?? 10
polls.query = route.query.query ?? ''

polls.get(auth.token)

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

async function deletePoll(id) {
  if (id === !auth.user.id) return
  const res = await polls.delete(auth.token, id)
  if (res) {
    polls.get(auth.token)
    notify({
      type: 'success',
      title: 'Success!',
      text: res.message,
    })
  }
}

function editPoll(id) {
  const poll = usePollStore()
  if (poll.poll.id !== id) poll.get(auth.token, id)
  toggleEditPopup.value = true
}
</script>

<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <PollPopup :is-show="togglePopup" @toggle="togglePopup = false" @data-updated="polls.get(auth.token)" />
    <EditPollPopup :is-show="toggleEditPopup" @toggle="toggleEditPopup = false" />

    <!-- Title -->
    <h2 class="text-2xl text-gray-600">User List</h2>

    <!-- Breadcrumb -->
    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Polls</span>
    </div>
  </div>

  <!-- UserList start -->
  <div class="p-4 mt-8 sm:px-8 sm:py-4">
    <div class="p-4 bg-white rounded">
      <div class="flex justify-between">
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
            <th class="p-2 text-left text-gray-600">
              <input
                v-model="selectAll"
                type="checkbox"
                class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
              />
            </th>
            <th class="text-left text-gray-600">NAME</th>
            <th class="text-left text-gray-600">CREATED AT</th>
            <th class="text-left text-gray-600">CREATED BY</th>
            <th class="text-right text-gray-600">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="poll in items" :key="poll.id">
            <td class="p-2">
              <input
                type="checkbox"
                class="h-5 w-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0"
                :checked="selectAll"
              />
            </td>
            <td>
              <div>
                <a href="#" class="text-gray-600 font-bolder" @click.prevent="editPoll(poll.id)">{{ poll.name }}</a>
              </div>
            </td>
            <!-- Created At -->
            <td>{{ poll.createdAt }}</td>

            <!-- Created By -->
            <td class="flex items-center py-4">
              <img
                v-if="poll.createdBy.avatar"
                class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                :src="poll.createdBy.avatar"
                :alt="poll.createdBy.username"
              />
              <UserIcon v-else class="inline-block h-10 w-10 rounded-full ring-2 ring-black" />
              <div class="px-4">
                <div>
                  <a href="#" class="text-gray-600 font-bolder">{{ poll.createdBy.name || 'ass min' }}</a>
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="text-right">
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
                          @click="editPoll(poll.id)"
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
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-red-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                          @click="deletePoll(poll.id)"
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

        <!-- Table Footer -->
        <tfoot>
          <tr>
            <td colspan="7" class="py-2">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <Summary :total="total" />
                </div>
                <div>
                  <Pagination
                    :total="total"
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
