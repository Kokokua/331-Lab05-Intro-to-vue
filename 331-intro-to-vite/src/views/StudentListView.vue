<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref([])

onMounted(() => {
  StudentService.getStudents().then(response => {
    students.value = response.data
  })
})
</script>

<template>
  <div>
    <h1>Student List</h1>
    <div v-for="student in students" :key="student.id" class="card">
      <p><strong>Name:</strong> {{ student.name }}</p>
      <p><strong>Surname:</strong> {{ student.surname }}</p>
      <p><strong>GPA:</strong> {{ student.gpa }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 8px;
  box-shadow: 2px 2px 8px #eee;
}
</style>