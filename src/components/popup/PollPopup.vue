<script setup>
import { reactive } from 'vue'
import { usePollsStore, useAuthStore } from '@/store/index'
import Popup from './Popup.vue'
import XIcon from '@/components/icons/XIcon.vue'
import { notify } from '@kyvg/vue3-notification'
import PlusIcon from '../icons/PlusIcon.vue'

const polls = usePollsStore()
const auth = useAuthStore()

const emit = defineEmits(['cancel', 'toggle', 'dataUpdated'])

let pollObj = reactive({
  poll: {
    name: '',
    detail: '',
  },
  options: [
    {
      label: '',
    },
    {
      label: '',
    },
  ],
})

const isValid = reactive({
  name: {
    state: true,
    text: 'Name must not be blank',
  },
  options: {
    state: true,
    text: 'Poll must have at least 2 options and option can not be blank',
  },
})

function addOption() {
  isValid.options.state = true
  pollObj.options.push({
    label: '',
  })
}
function deleteOption(index) {
  if (pollObj.options.length <= 2) return (isValid.options.state = false)
  pollObj.options = pollObj.options.filter((_, i) => i !== index)
}

function resetPoll() {
  emit('toggle')

  pollObj.poll = {
    name: '',
    detail: '',
  }
  pollObj.options = [
    {
      label: '',
    },
    {
      label: '',
    },
  ]

  isValid.name.state = true
  isValid.options.state = true
}

function validate() {
  let valid = true
  if (!pollObj.poll.name) {
    isValid.name.state = false
    valid = false
  }
  if (pollObj.options.length < 2) {
    isValid.options.state = false
    valid = false
  } else {
    pollObj.options.forEach((el) => {
      if (!el.label) {
        isValid.options.state = false
        valid = false
      }
    })
  }

  return valid
}

async function submitPoll() {
  if (!validate()) return
  const data = {
    poll: pollObj.poll,
    options: pollObj.options,
  }
  const res = await polls.add(auth.token, data)
  if (res) {
    resetPoll()
    emit('dataUpdated')
    notify({
      type: 'success',
      title: 'Success!',
      text: res.message,
    })
  }
}
</script>
<template>
  <Popup :title="'Add Poll'" @toggle="resetPoll" @cancel="resetPoll" @submit="submitPoll">
    <template #body>
      <div v-for="(_, key) in pollObj.poll" :key="key" class="w-full mb-[6px]">
        <div class="relative group text-gray-400">
          <label class="block capitalize focus-within:text-indigo-500" :for="key">
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
              v-model="pollObj.poll[key]"
              class="p-4 w-full rounded-md text-gray-700 border border-gray-300 border-opacity-50 hover:border-opacity-100 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'outline outline-1 outline-red-500 border-red-500': !isValid[key] && key !== 'detail' }"
              type="text"
              @input="
                () => {
                  isValid[key] ? (isValid[key].state = true) : null
                  return
                }
              "
            />
          </label>
        </div>
      </div>

      <!-- Options -->
      <div class="w-full pl-4 mb-[6px] text-gray-400">
        <span>Options</span>
        <span class="text-xs text-gray-300 italic normal-case" :class="{ 'text-red-500': !isValid.options.state }">
          *{{ isValid.options.text }}
        </span>
      </div>
      <div v-for="(_, i) in pollObj.options" :key="i" class="w-full mb-[6px]">
        <div class="relative group text-gray-400">
          <label class="block capitalize focus-within:text-indigo-500" :for="'option-' + i">
            <span class="absolute left-4 top-1/2 -translate-y-1/2">
              {{ i + 1 + '.' }}
            </span>
            <input
              :id="'option-' + i"
              v-model="pollObj.options[i].label"
              class="p-4 pl-8 pr-9 w-full rounded-md text-gray-700 placeholder:text-gray-400 border border-gray-300 border-opacity-50 hover:border-opacity-100 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              :placeholder="'Option ' + (i + 1)"
              @input="
                () => {
                  isValid.options.state = true
                  return
                }
              "
            />
            <span class="absolute right-2 top-1/2 -translate-y-1/2" @click="deleteOption(i)">
              <XIcon class="!fill-current hover:!fill-black cursor-pointer" />
            </span>
          </label>
        </div>
      </div>

      <!-- Option input -->
      <div class="w-full">
        <div class="relative group text-gray-400">
          <label class="block capitalize focus-within:text-indigo-500" for="add-option">
            <button id="input" class="text-gray-700 opacity-50 hover:opacity-100 flex" @click.prevent="addOption">
              <PlusIcon />
              Add option
            </button>
          </label>
        </div>
      </div>
    </template>
  </Popup>
</template>
