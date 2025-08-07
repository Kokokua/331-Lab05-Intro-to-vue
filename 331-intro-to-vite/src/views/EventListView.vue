<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventCategoryOrganizer from '@/components/EventCategoryOrganizer.vue'
import { ref, computed, watchEffect, onMounted } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { type Event } from '@/types'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: false,
    default: 3
  }
})

const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- <div>
    Page size:
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, pageSize: 2 } }">2</RouterLink> |
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, pageSize: 5 } }">5</RouterLink> |
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, pageSize: 10 } }">10</RouterLink>
  </div> -->
  <!-- <div>
      <h2>Set Page Size:</h2>
      <button @click="pageSize = 1">1</button>
      <button @click="pageSize = 2">2</button>
      <button @click="pageSize = 3">3</button>
      <button @click="pageSize = 4">4</button>
      <RouterView :pageSize="pageSize" />
    </div> -->
  <!-- </div> -->
  <div class="flex flex-col items-center">
    <div v-for="event in events" :key="event.id">
      <EventCategoryOrganizer :event="event" />
      <EventCard :event="event" />
    </div>
  </div>
  <div class="flex justify-center items-center gap-5 mt-5">
    <RouterLink
      id="page-prev"
      class="no-underline text-gray-700 px-4 py-2 border border-gray-700 rounded transition-colors duration-300 hover:bg-gray-700 hover:text-white"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }"
      rel="prev"
      v-if="page !== 1"
    >
      &#60; Prev Page
    </RouterLink>
    <RouterLink
      id="page-next"
      class="no-underline text-gray-700 px-4 py-2 border border-gray-700 rounded transition-colors duration-300 hover:bg-gray-700 hover:text-white"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }"
      rel="next"
      v-if="hasNexPage"
    >
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<style scoped>
/* All CSS has been converted to Tailwind classes */
</style>

