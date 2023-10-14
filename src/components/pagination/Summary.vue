<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from 'vue-router'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
})

const route = useRoute()
const itemsPerPage = route.query.limit ?? 10
const page = route.query.page ?? 1
</script>

<template>
  <p class="text-sm text-gray-500">
    Showing
    <span class="font-medium">{{ page === 1 ? (total ? 1 : 0) : itemsPerPage * (page - 1) + 1 }}</span>
    to
    <span class="font-medium">{{ itemsPerPage * page > total ? total : itemsPerPage * page }}</span>
    of
    <span class="font-medium">{{ total }}</span>
    results
  </p>
</template>
