<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useMessageStore } from '@/message'
import { storeToRefs } from 'pinia'

const pageSize = ref(1)
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header class="leading-relaxed max-h-screen">
      <div id="flashMessage" v-if="message">
        <div id="flashMessage" v-if="message" class="animate-fade">
          <h4>{{ message }}</h4>
        </div>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
            >Event</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
            >About</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'student-list-view' }"
            >Students</RouterLink
          >
        </nav>
      </div>
    </header>

    <!-- <h1>Events For Good</h1> -->

    <!-- new element -->
    <div>
      <h2 class="text-xl">Set Page Size:</h2>
      <button @click="pageSize = 1">1</button>
      <button @click="pageSize = 2">2</button>
      <button @click="pageSize = 3">3</button>
      <button @click="pageSize = 4">4</button>
      <RouterView :pageSize="pageSize" />
    </div>
  </div>
</template>

<style>
/* All CSS has been converted to Tailwind classes */
</style>
