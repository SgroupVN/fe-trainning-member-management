<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import DotIcon from '@/components/icons/DotIcon.vue'
import PollsIcon from '@/components/icons/PollsIcon.vue'
import CaretRightIcon from '@/components/icons/CaretRightIcon.vue'
import GearIcon from '@/components/icons/GearIcon.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useAuthStore } from '@/store'

const route = useRoute()
const auth = useAuthStore()

const isUserManagementActive = computed(() => {
  const names = ['user-list', 'user-detail']

  return names.includes(route.name)
})
const isUserActive = computed(() => {
  const names = ['user-list', 'user-detail']
  return names.includes(route.name)
})

const isPollManagementActive = computed(() => {
  const names = ['poll-list', 'poll-detail']

  return names.includes(route.name)
})
</script>

<template>
  <aside class="hidden max-w-[16rem] w-full bg-gray-800 sm:block">
    <div class="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
      <router-link to="/" class="text-white">FE</router-link>
    </div>

    <nav class="text-sm text-gray-300">
      <ul class="flex flex-col">
        <li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Section</li>
        <router-link v-slot="{ isExactActive, href, navigate }" to="/" custom>
          <li class="px-4 cursor-pointer" :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']">
            <a class="py-3 flex items-center" :href="href" @click="navigate">
              <HomeIcon />
              Dashboard
            </a>
          </li>
        </router-link>

        <li>
          <Disclosure v-slot="{ open }" :default-open="isUserManagementActive">
            <DisclosureButton
              class="px-4 py-3 flex items-center w-full hover:bg-gray-700"
              :class="open ? 'bg-gray-700' : ''"
            >
              <UsersIcon />
              User Management
              <span class="ml-auto">
                <CaretRightIcon :class="open ? 'transform rotate-90' : ''" />
              </span>
            </DisclosureButton>
            <DisclosurePanel>
              <ul>
                <li>
                  <Disclosure v-slot="{ open }" :default-open="isUserActive">
                    <DisclosureButton
                      class="pl-8 pr-4 py-3 flex items-center w-full hover:bg-gray-700"
                      :class="open ? 'bg-gray-700' : ''"
                    >
                      <DotIcon />
                      Users
                      <span class="ml-auto">
                        <CaretRightIcon :class="open ? 'transform rotate-90' : ''" />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul>
                        <router-link v-slot="{ isExactActive, href, navigate }" to="/users" custom>
                          <li
                            class="pl-12"
                            :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']"
                          >
                            <a class="py-3 flex items-center" :href="href" @click="navigate">
                              <DotIcon />
                              User List
                            </a>
                          </li>
                        </router-link>
                        <router-link
                          v-slot="{ href, navigate }"
                          :to="{
                            name: 'user-detail',
                            params: {
                              id: auth.user.id,
                            },
                          }"
                          custom
                        >
                          <li
                            class="pl-12"
                            :class="[route.name === 'user-detail' ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']"
                          >
                            <a class="py-3 flex items-center" :href="href" @click="navigate">
                              <DotIcon />
                              User Detail
                            </a>
                          </li>
                        </router-link>
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </li>

        <li>
          <Disclosure :default-open="isPollManagementActive">
            <router-link v-slot="{ isExactActive, href, navigate }" to="/polls" custom>
              <DisclosureButton
                class="px-4 py-3 flex items-center w-full hover:bg-gray-700"
                :class="isExactActive ? 'bg-gray-700' : ''"
              >
                <a class="flex items-center w-full" :href="href" @click="navigate">
                  <PollsIcon />
                  Poll Management
                </a>
              </DisclosureButton>
            </router-link>
          </Disclosure>
        </li>

        <li class="px-4 py-2 mt-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Settings</li>

        <li class="px-4 cursor-pointer hover:bg-gray-700">
          <router-link :to="{ name: 'login' }" class="py-2 flex items-center">
            <GearIcon />
            Settings
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
