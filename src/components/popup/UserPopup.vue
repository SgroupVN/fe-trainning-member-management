<script setup>
import { reactive } from 'vue'
import { useUsersStore, useAuthStore } from '@/store/index'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { notify } from '@kyvg/vue3-notification'
import Popup from './Popup.vue'
import CaretDownIcon from '../icons/CaretDownIcon.vue'

const users = useUsersStore()
const auth = useAuthStore()

const emit = defineEmits(['cancel', 'toggle', 'dataUpdated'])
// const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

const user = reactive({
  username: '',
  name: '',
  age: '',
  gender: null,
  password: '',
})

const validTemplate = {
  username: {
    state: true,
    text: 'Must be at least 6 characters',
  },
  name: {
    state: true,
    text: 'Not required',
  },
  age: {
    state: true,
    text: 'Must be over 18',
  },
  gender: {
    state: true,
    text: 'Not required',
  },
  password: {
    state: true,
    text: 'Must be at least 6 characters',
  },
}

const isValid = reactive(validTemplate)

function resetUser() {
  emit('toggle')
  for (let k in user) {
    isValid.state[k] = true
    if (k === 'gender') {
      user[k] = null
    } else user[k] = ''
  }
}

function validateString(str) {
  return str && str.length > 5
}

function validateAge() {
  if (user.age === '') return true
  const age = parseInt(user.age)
  if (isNaN(age)) return false
  if (age < 18) return false
  return true
}

function validate() {
  const isUserNameValid = validateString(user.username)
  if (!isUserNameValid) isValid.username = false

  const isPasswordValid = validateString(user.password)
  if (!isPasswordValid) isValid.password = false

  const isAgeValid = validateAge()
  if (!isAgeValid) isValid.age = false

  return isUserNameValid && isPasswordValid && isAgeValid
}

async function submitUser() {
  const isDataValid = validate()
  if (!isDataValid) return
  const data = {
    username: user.username,
    password: user.password,
    name: user.name,
    age: user.age,
    gender: user.gender,
  }
  const res = await users.add(auth.token, data)
  if (res) {
    resetUser()
    emit('dataUpdated')
    notify({
      type: 'success',
      title: 'Success!',
      text: res.data.message,
    })
  }
}
</script>
<template>
  <Popup :title="'Add User'" @toggle="$emit('toggle')" @cancel="resetUser" @submit="submitUser">
    <template #body>
      <div v-for="(data, key) in user" :key="key" :class="['p-3', key === 'password' ? 'w-full' : 'w-1/2']">
        <div class="relative group text-gray-400">
          <label
            class="block capitalize"
            :class="{
              'focus-within:text-indigo-500': key !== 'gender',
            }"
            :for="key"
          >
            <template v-if="key !== 'gender'">
              <div class="pl-4 mb-[6px]">
                <span>{{ key }}</span>
                <span
                  v-if="isValid[key] && isValid[key].text"
                  class="text-xs text-gray-300 italic normal-case"
                  :class="{ 'text-red-500': !isValid[key].state }"
                >
                  *{{ isValid[key].text }}
                </span>
              </div>
              <input
                :id="key"
                v-model="user[key]"
                class="p-4 w-full rounded-md text-gray-700 border border-gray-300 border-opacity-50 hover:border-opacity-100 focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'outline outline-1 outline-red-500 border-red-500': !isValid[key] }"
                type="text"
              />
            </template>
            <Listbox v-else v-slot="{ open }" v-model="user[key]">
              <div class="pl-4 mb-[6px]" :class="{ 'text-indigo-500': open }">
                <span>{{ key }}</span>
                <span
                  v-if="isValid[key] && isValid[key].text"
                  class="text-xs text-gray-300 italic normal-case"
                  :class="{ 'text-red-500': !isValid[key].state }"
                >
                  *{{ isValid[key].text }}
                </span>
              </div>
              <ListboxButton
                class="relative p-4 w-full rounded-md border border-gray-300 border-opacity-50 hover:border-opacity-100 ui-open:border-indigo-500 ui-open:outline-indigo-500 ui-open:outline-1 ui-open:outline text-left"
                :class="{ 'italic text-gray-500': !user[key], 'text-gray-700': user[key] }"
                >{{ user[key] ?? '---' }}
                <CaretDownIcon class="absolute ui-open:text-indigo-500 right-4 top-1/2 transform -translate-y-1/2" />
              </ListboxButton>
              <ListboxOptions
                class="absolute z-10 top-full mt-1 w-full rounded-md text-gray-700 bg-white border border-gray-300 border-opacity-50 hover:border-opacity-100 text-left"
              >
                <ListboxOption class="px-4 py-3 cursor-pointer hover:bg-gray-200" :value="null">---</ListboxOption>
                <ListboxOption class="px-4 py-3 cursor-pointer hover:bg-gray-200" :value="1">Male</ListboxOption>
                <ListboxOption class="px-4 py-3 cursor-pointer hover:bg-gray-200" :value="0">Female</ListboxOption>
              </ListboxOptions>
            </Listbox>
          </label>
        </div>
      </div>
    </template>
  </Popup>
</template>
