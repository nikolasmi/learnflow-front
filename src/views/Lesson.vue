<template>
  <div class="p-6 max-w-5xl mx-auto">
    <section v-if="course" class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{{ course.title }}</h1>
      <p class="text-lg text-gray-600 mb-2 dark:text-white">{{ course.shortDescription }}</p>
      <p class="mb-4 text-gray-700 dark:text-white">{{ course.description }}</p>
    </section>

    <section v-if="course?.lessons?.length">
      <h2 class="text-3xl font-bold text-center mb-10 text-[#222b36] dark:text-white">Lekcije</h2>
      <div class="space-y-6">
        <div
          v-for="lesson in course.lessons"
          :key="lesson.lessonId"
          class="p-4 border border-gray-300 rounded-xl shadow hover:shadow-md cursor-pointer bg-white transition flex justify-between items-center"
          @click="goToLesson(lesson.lessonId)"
        >
          <h3 class="text-xl font-semibold text-gray-800">
            #{{ lesson.orderNumber }} - {{ lesson.title }}
          </h3>
          <span class="text-2xl text-gray-400 group-hover:text-gray-600 transition">→</span>
        </div>
      </div>
    </section>

    <p v-else class="text-center text-gray-500 text-lg mt-12">Ovaj kurs još nema lekcija.</p>
  </div>
  <CourseComments v-if="courseId" :courseId="courseId" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { Course } from '@/types/Course'
import CourseComments from '@/components/CourseComments.vue'

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.id)
const course = ref<Course | null>(null)
const loading = ref(false)

const fetchLessons = async () => {
  try {
    loading.value = true
    const response = await axios.get(`http://localhost:3000/api/course/${courseId}`)
    course.value = response.data
  } catch (error) {
    toast.error('Greška pri dohvatanju podataka o kursu')
  } finally {
    loading.value = false
  }
}

fetchLessons()

const goToLesson = (lessonId: number) => {
  router.push({ path: `/lessons/${lessonId}` })
}
</script>

<style scoped>
</style>
