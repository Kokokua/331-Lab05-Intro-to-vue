<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
</script>

<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<style scoped>
@keyframes yellofade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}

#flashMessage {
  animation: yellofade 3s ease-in-out;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}
</style>
