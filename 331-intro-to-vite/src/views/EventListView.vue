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
  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCategoryOrganizer :event="event" />
      <EventCard :event="event" />
    </div>
  </div>
  <div class="pagination">
    <RouterLink
      id="page-prev"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }"
      rel="prev"
      v-if="page !== 1"
    >
      &#60; Prev Page
    </RouterLink>
    <RouterLink
      id="page-next"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }"
      rel="next"
      v-if="hasNexPage"
    >
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.pagination a {
  text-decoration: none;
  color: #2c3e50;
  padding: 8px 16px;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.pagination a:hover {
  background-color: #2c3e50;
  color: white;
}
</style>

