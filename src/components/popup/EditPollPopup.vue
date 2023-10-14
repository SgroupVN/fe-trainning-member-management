<script setup>
import { computed, ref } from 'vue'
import { usePollStore, useAuthStore } from '@/store/index'
import Popup from './Popup.vue'
import XIcon from '@/components/icons/XIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { useDebounceFn } from '@vueuse/core'

const poll = usePollStore()
const auth = useAuthStore()
const emit = defineEmits(['cancel', 'toggle', 'dataUpdated'])

const isEditting = ref(false)
const pollObj = computed(() => poll.poll)
const options = computed(() => (pollObj.value.options ? pollObj.value.options.filter((o) => !o.isDeleted) : []))

const deboundVote = useDebounceFn(async (id) => {
  await poll.vote(auth.token, id)
}, 500)
function handleVote(id) {
  const option = pollObj.value.options.find((o) => o.id === id)
  option.is_voted = option.is_voted ? 0 : 1
  poll.poll.totalVotes = poll.poll.options.reduce((acc, cur) => acc + cur.is_voted, 0)
  pollObj.value.options.forEach(
    (o) => (o.percent = Math.round((o.users.length + o.is_voted / poll.poll.totalVotes) * 100))
  )
  deboundVote(id)
}

function addOption() {
  pollObj.value.options.push({
    label: '',
    isCreated: true,
  })
}
function getOption(id) {
  return options.value.find((o) => o.id === id).is_voted
}
function deleteOption(id) {
  pollObj.value.options.find((o) => o.id === id).isDeleted = true
}

function resetPoll(isClose = false) {
  if (isClose) emit('toggle')
  isEditting.value = false
  pollObj.value.options = pollObj.value.options.filter((o) => !o.isCreated)
}

async function updatePoll() {
  isEditting.value = false

  pollObj.value.options = pollObj.value.options.filter((o) => o.label.trim() !== '')

  // add new options
  const addedOptions = pollObj.value.options.reduce((acc, cur) => {
    if (cur.isCreated && cur.label.trim() !== '') {
      acc.push({ label: cur.label })
      cur.isCreated = false
    }
    return acc
  }, [])
  if (addedOptions.length) poll.add(auth.token, addedOptions)

  // delete options
  const deletedOptions = pollObj.value.options.reduce((acc, cur) => {
    if (cur.isDeleted) {
      acc.push(cur.id)
    }
    return acc
  }, [])
  if (deletedOptions.length) poll.delete(auth.token, deletedOptions)
}
</script>
<template>
  <Popup
    :title="pollObj.name"
    :submit-text="'Update'"
    @toggle="resetPoll(true)"
    @cancel="resetPoll"
    @submit="updatePoll"
  >
    <template #body>
      <div class="w-full mb-[6px]">
        <div class="relative group text-gray-400">
          <div class="pl-4">
            <div class="mb-[6px]">Detail</div>
            <div class="mb-[6px] text-gray-700">
              <span>{{ pollObj.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full pl-4 mb-[6px] text-gray-400">
        <span>Options</span>
        <span class="text-xs text-gray-300 italic normal-case" :class="{ 'text-red-500': !isValid.options.state }">
          *{{ isValid.options.text }}
        </span>
      </div>

      <!-- Options -->
      <div v-for="(o, i) in options" :key="o.id + o.label" class="w-full mb-[6px]">
        <div class="relative group text-gray-400 border border-gray-300 border-opacity-50 rounded-md">
          <template v-if="o.isCreated">
            <label class="relative flex capitalize p-4 pl-12" :for="'option-' + o.id">
              <span
                class="absolute -translate-y-1/2 left-4 top-1/2 bg-transparent rounded-full w-5 h-5 cursor-pointer border border-gray-700 border-solid"
              ></span>
              <span class="text-gray-700 mr-1"> {{ i + 1 + '.' }} </span>
              <input
                :id="'option-' + o.id"
                v-model="pollObj.options[i].label"
                class="w-full p-0 rounded-md text-gray-700 border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent"
                type="text"
              />
            </label>
          </template>
          <template v-else>
            <label class="block relative capitalize p-4 pl-12 cursor-pointer z-10" :for="'option-' + o.id">
              <span class="text-gray-700 mr-1"> {{ i + 1 + '.' }} </span>
              <span class="text-gray-700"> {{ o.label }} </span>
              <input
                :id="'option-' + o.id"
                :checked="getOption(o.id)"
                class="absolute -translate-y-1/2 left-4 top-1/2 bg-transparent rounded-full w-5 h-5 cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent"
                type="checkbox"
                :disabled="isEditting"
                :placeholder="'Option ' + (i + 1)"
                @change="handleVote(o.id)"
              />
              <span v-if="isEditting" class="absolute right-2 top-1/2 -translate-y-1/2" @click="deleteOption(o.id)">
                <XIcon class="!fill-current hover:!fill-black cursor-pointer" />
              </span>
            </label>
            <div
              v-if="o.percent"
              class="absolute inset-0 rounded-md bg-indigo-500 opacity-50 z-0"
              :style="{ width: o.percent + '%' }"
            ></div>
          </template>
        </div>
      </div>

      <!-- Option input -->
      <div v-if="isEditting" class="w-full">
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

    <!-- Replace actions -->
    <template v-if="!isEditting" #action>
      <button
        type="submit"
        class="ml-[18px] flex justify-center items-center w-fit h-10 px-3 rounded-md min-w-[120px] bg-green-500 hover:bg-green-600 transition-all text-white uppercase font-bold text-sm"
        @click.prevent="isEditting = true"
      >
        <span>Edit</span>
      </button>
    </template>
  </Popup>
</template>
