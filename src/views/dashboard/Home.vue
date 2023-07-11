<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-center uppercase p-10 text-2xl">This is home</div>
  <div class="">{{ counterStore.count }}</div>
  <button @click="increment">Increment</button>
</template>
<script>
import { useCounterStore } from '@/store'
import { mapStores } from 'pinia'
export default {
  computed: {
    ...mapStores(useCounterStore),
  },
  methods: {
    increment() {
      this.counterStore.increment()
    },
  },
}
</script>
