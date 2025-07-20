<template>
  <div class="p-6 max-w-5xl mx-auto">
    <section v-if="course" class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4 text-gray-900">{{ course.title }}</h1>
      <p class="text-lg text-gray-600 mb-2">{{ course.shortDescription }}</p>
      <p class="mb-4 text-gray-700">{{ course.description }}</p>
    </section>

    <section v-if="course?.lessons?.length">
      <h2 class="text-3xl font-bold text-center mb-10 text-[#222b36]">Lekcije</h2>
      <div class="space-y-6">
        <div
          v-for="lesson in course.lessons"
          :key="lesson.lessonId"
          class="p-4 border border-gray-300 rounded-xl shadow bg-white flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
          @click="showPurchaseWarning"
        >
          <h3 class="text-xl font-semibold text-gray-800">
            #{{ lesson.orderNumber }} - {{ lesson.title }}
          </h3>
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
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { Course } from '@/types/Course'
import CourseComments from '@/components/CourseComments.vue'

const route = useRoute()
const courseId = Number(route.params.id)
const course = ref<Course | null>(null)
const loading = ref(false)

const fetchCourse = async () => {
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

fetchCourse()

const showPurchaseWarning = () => {
  toast.warning('Morate kupiti kurs da biste mogli da gledate lekcije.')
}
</script>

<style scoped>
</style>
