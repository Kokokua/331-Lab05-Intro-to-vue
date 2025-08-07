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
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>

    <!-- <h1>Events For Good</h1> -->

    <!-- new element -->
    <div>
      <h2>Set Page Size:</h2>
      <button @click="pageSize = 1">1</button>
      <button @click="pageSize = 2">2</button>
      <button @click="pageSize = 3">3</button>
      <button @click="pageSize = 4">4</button>
      <RouterView :pageSize="pageSize" />
    </div>
  </div>
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  padding: 30px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}

@keyframes yellofade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}

#flashMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
