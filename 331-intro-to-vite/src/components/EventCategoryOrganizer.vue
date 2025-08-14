<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="flex flex-col items-end text-base mb-2.5">
    <span class="text-right text-base">{{ event.category }}</span>
    <span class="text-right text-base">{{ event.organizer }}</span>
  </div>
</template>

<style scoped>
/* All CSS has been converted to Tailwind classes */
</style>
