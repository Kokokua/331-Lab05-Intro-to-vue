<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const saveEdit = () => {
  // Simulate saving the edit
  store.updateMessage('Data has been updated')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
    <p>Edit event here</p>
    <button @click="saveEdit">Save Edit</button>
</template>
