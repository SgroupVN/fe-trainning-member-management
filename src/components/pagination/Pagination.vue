<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const defaultClass =
  'border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-1 border text-sm font-medium'
const currentClass =
  'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-1 border text-sm font-medium'

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
})
const route = useRoute()

const numberOfPage = computed(() => {
  const limit = route.query.limit ?? 10
  return Math.ceil(props.total / limit)
})

const pages = computed(() => {
  const currentPage = route.query.page ?? 1
  const pageToDisplay = 4
  const sidePageToDisplay = 1
  const list = []
  const isLeftSideVisible = currentPage >= pageToDisplay / 2 + 2
  const isRightSideVisible =
    numberOfPage.value > pageToDisplay + 1 && currentPage < numberOfPage.value - pageToDisplay / 2 - 1

  if (isLeftSideVisible) {
    for (let i = 1; i <= sidePageToDisplay; i++) {
      list.push({
        type: 'page',
        value: i,
      })
    }

    list.push({
      type: 'dot',
    })
  } else if (1 < currentPage && currentPage == 3) {
    list.push({
      type: 'page',
      value: 1,
    })
  }

  for (let i = 1; i < pageToDisplay / 2 && currentPage > 1; i++) {
    list.push({
      type: 'page',
      value: currentPage - i,
    })
  }

  list.push({
    type: 'current',
    value: currentPage - 0,
  })

  for (let i = 1; i < pageToDisplay / 2 && currentPage < numberOfPage.value; i++) {
    list.push({
      type: 'page',
      value: currentPage - 0 + i,
    })
  }

  if (isRightSideVisible) {
    list.push({
      type: 'dot',
    })

    list.push({
      type: 'page',
      value: numberOfPage,
    })
  } else if (currentPage < numberOfPage.value - 1) {
    list.push({
      type: 'page',
      value: numberOfPage,
    })
  }
  return list
})
</script>

<template>
  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <a
      href="#"
      class="relative inline-flex items-center px-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50"
      @click="route.query.page === 1 ? false : $emit('prev')"
    >
      <span class="sr-only">Previous</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </a>

    <template v-for="p in pages" :key="p">
      <a v-if="p.type === 'page'" href="#" :class="defaultClass" @click="$emit('currentChange', p.value)">{{
        p.value
      }}</a>
      <a v-else-if="p.type === 'dot'" href="#" :class="defaultClass">...</a>
      <span v-else :class="currentClass">{{ p.value }}</span>
    </template>

    <a
      href="#"
      class="relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50"
      @click="route.query.page === numberOfPage ? false : $emit('next')"
    >
      <span class="sr-only">Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </nav>
</template>
