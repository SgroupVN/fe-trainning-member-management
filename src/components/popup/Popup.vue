<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Popup Title',
  },
  submitText: {
    type: String,
    default: 'Submit',
  },
})
</script>
<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="opacity opacity-0"
    enter-to-class="opacity opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="opacity opacity-100"
    leave-to-class="opacity opacity-0"
  >
    <div
      v-if="isShow"
      class="fixed inset-0 z-10 flex justify-center align-middle bg-popup backdrop-blur-lg overflow-y-auto"
      @click="$emit('toggle')"
    >
      <div class="w-[70vw] absolute top-10 mb-10 bg-white rounded-[10px]" @click.stop="">
        <form>
          <div class="px-11 pt-11 pb-[22px] border-b border-[#eaeaea]">
            <h2 class="text-[18px] text-header">{{ title }}</h2>
          </div>
          <div class="flex flex-wrap p-6">
            <slot name="body" />
          </div>
          <div class="px-11 pt-[22px] pb-[27px] flex justify-end">
            <slot name="action">
              <button
                type="cancel"
                class="flex justify-center items-center w-fit h-10 px-3 rounded-md min-w-[120px] bg-gray-300 hover:bg-gray-400 transition-all text-white uppercase font-bold text-sm"
                @click.prevent="$emit('cancel')"
              >
                <span>cancel</span>
              </button>
              <button
                type="submit"
                class="ml-[18px] flex justify-center items-center w-fit h-10 px-3 rounded-md min-w-[120px] bg-green-500 hover:bg-green-600 transition-all text-white uppercase font-bold text-sm"
                @click.prevent="$emit('submit')"
              >
                <span>{{ submitText }}</span>
              </button>
            </slot>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
