<template>
  <div class="p-6 max-w-4xl mx-auto">
    <section v-if="lesson" class="text-center">
      <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{{ lesson.title }}</h1>

      <p class="text-lg mb-4 text-gray-900 dark:text-white">{{ lesson.description }}</p>

      <video
        v-if="lesson.videoUrl"
        class="w-full max-w-3xl mx-auto rounded-lg shadow"
        controls
        preload="metadata"
        :src="getVideoUrl(lesson.videoUrl)"
      ></video>
    </section>

    <p v-else class="text-center text-gray-500 text-lg mt-12">Lekcija nije pronađena.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { Lesson } from '@/types/Lesson'

const route = useRoute()
const lessonId = Number(route.params.id)
const lesson = ref<Lesson | null>(null)
const loading = ref(false)

const fetchLesson = async () => {
  try {
    loading.value = true
    const response = await axios.get(`http://localhost:3000/api/lesson/${lessonId}`)
    lesson.value = response.data
  } catch (error) {
    toast.error('Greška pri dohvatanju lekcije')
  } finally {
    loading.value = false
  }
}

fetchLesson()

const getVideoUrl = (videoUrl: string) => {
  return `http://localhost:3000/assets/lessons/${videoUrl}`
}
</script>

<style scoped>
</style>
