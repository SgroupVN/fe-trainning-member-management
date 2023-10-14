<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore, useAuthStore } from '@/store/index'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { notify } from '@kyvg/vue3-notification'

import UserIcon from '@/components/icons/UserIcon.vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'

// eslint-disable-next-line no-useless-escape, prettier/prettier
const route = useRoute()
const user = useUserStore()
const auth = useAuthStore()

user.get(auth.token, route.params.id)

const state = computed(() => {
  return {
    username: user.userInfo.username,
    name: user.userInfo.name,
    email: user.userInfo.email,
    age: user.userInfo.age,
    gender: user.userInfo.gender,
  }
})

const userDt = reactive({
  username: {
    label: 'username',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>',
  },
  name: {
    label: 'name',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>',
    state: true,
    text: 'Name must not contain number or special character',
  },
  email: {
    label: 'email',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
  },
  age: {
    label: 'age',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"></path><path d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z"></path><path d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z"></path></svg>',
  },
  gender: {
    label: 'gender',
  },
})

const isDataChanged = computed(() => {
  if (!user.userInfo.username) return false
  let res = false

  for (const k in state.value) {
    if (userDt[k].value && userDt[k].value !== user.userInfo[k]) res = true
  }
  return res
})

function handleGender(param) {
  if (param === 'male') return 1
  if (param === 'female') return 1
  if (param === '---') return null
}

async function submitUser() {
  if (!isDataChanged.value) return
  const data = {}
  for (const k in userDt) {
    if (userDt[k].value && userDt[k].value !== user.userInfo[k]) data[k] = userDt[k].value
  }
  if (data.gender) data.gender = handleGender(data.gender)
  const res = await user.updateDetail(auth.token, data)
  if (res)
    notify({
      type: 'success',
      title: 'Success!',
      text: res.data.message,
    })
}
</script>
<template>
  <div class="p-4 mt-8 sm:px-8 sm:py-4">
    <div class="bg-white rounded-xl">
      <h2 class="p-6 text-xl font-bold">Account details</h2>
      <!-- User Image -->
      <div class="flex p-6 pt-0">
        <div class="w-[100px] h-[100px] flex-none mr-3">
          <img v-if="user.avatar" class="object-cover rounded-2xl" :src="avatar" alt="" />
          <UserIcon v-else class="h-full w-full rounded-2xl ring-2 ring-black" />
        </div>
        <form class="flex flex-col justify-center gap-5" @submit.prevent="changeDetail()">
          <button
            class="flex justify-center items-center w-fit h-10 px-3 rounded-md min-w-[68px] bg-green-500 hover:bg-green-600 transition-all text-white"
            type="button"
            for="file"
            @click="openFileInput"
          >
            <span class="block md:hidden">
              <UploadIcon />
            </span>
            <span class="hidden md:block"> Upload new photo </span>
          </button>
          <input id="file" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden />
          <p>Allowed JPG, GIF or PNG. Max size of 800K</p>
        </form>
      </div>

      <hr />

      <!-- User Form -->
      <div class="p-6">
        <form class="mt-6" @submit.prevent="submit">
          <!-- Form Inputs -->
          <div class="flex flex-wrap">
            <div
              v-for="(f, k) in state"
              :key="userDt[k].label"
              class="w-1/2 p-3 relative"
              :class="[k === 'gender' ? 'w-full' : 'w-1/2']"
            >
              <div class="relative group text-gray-400">
                <label v-if="k !== 'gender'" class="focus-within:text-indigo-500" :for="k">
                  <div class="mb-[6px]">
                    <span class="capitalize mb-[6px]">{{ userDt[k].label }}</span>
                    <span
                      v-if="userDt[k].text"
                      class="text-xs text-gray-300 italic normal-case"
                      :class="{ 'text-red-500': !userDt[k].state }"
                    >
                      *{{ userDt[k].text }}
                    </span>
                  </div>
                  <div class="relative">
                    <span
                      v-if="userDt[k].icon"
                      class="absolute inset-y-0 left-0 flex items-center pl-2"
                      v-html="userDt[k].icon"
                    ></span>
                    <input
                      :id="k"
                      :value="userDt[k].value === 0 ? 0 : userDt[k].value || f"
                      class="p-4 pl-10 w-full rounded-md text-gray-700 border border-gray-300 border-opacity-50 placeholder:capitalize"
                      :class="[
                        userDt[k].label === 'username'
                          ? 'bg-gray-200'
                          : 'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-opacity-100',
                      ]"
                      type="text"
                      :disabled="k === 'username'"
                      @input="userDt[k].value = $event.target.value"
                    />
                  </div>
                </label>
                <Listbox
                  v-else
                  v-slot="{ open }"
                  :value="userDt[k].value || f"
                  as="div"
                  @update:model-value="userDt[k].value = $event"
                >
                  <div class="mb-[6px] capitalize" :class="{ 'text-indigo-500': open }">
                    <span>{{ userDt[k].label || '---' }}</span>
                    <span
                      v-if="userDt[k].text"
                      class="text-xs text-gray-300 italic normal-case"
                      :class="{ 'text-red-500': !userDt[k].state }"
                    >
                      *{{ userDt[k].text }}
                    </span>
                  </div>
                  <ListboxButton
                    class="p-4 w-full rounded-md border border-gray-300 border-opacity-50 hover:border-opacity-100 ui-open:border-indigo-500 ui-open:outline-indigo-500 ui-open:outline-1 ui-open:outline text-left capitalize"
                    value="---"
                    >{{ userDt[k].value || f }}</ListboxButton
                  >
                  <ListboxOptions
                    class="absolute z-10 top-full mt-1 w-full rounded-md text-gray-700 bg-white border border-gray-300 border-opacity-50 hover:border-opacity-100 text-left"
                  >
                    <ListboxOption class="px-4 py-3 cursor-pointer hover:bg-gray-200 capitalize" value="---"
                      >---</ListboxOption
                    >
                    <ListboxOption class="px-4 py-3 cursor-pointer hover:bg-gray-200 capitalize" value="male"
                      >male</ListboxOption
                    >
                    <ListboxOption class="px-4 py-3 cursor-pointer hover:bg-gray-200 capitalize" value="female"
                      >female</ListboxOption
                    >
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="w-full basis-full p-3 flex gap-4 justify-end">
              <button
                type="submit"
                class="relative flex justify-center items-center w-fit h-10 px-3 rounded-md min-w-[68px] text-white uppercase font-bold text-sm"
                :class="[isDataChanged ? 'bg-green-500 hover:bg-green-600' : ' bg-green-100']"
                @click.prevent="submitUser"
              >
                <span>save changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
