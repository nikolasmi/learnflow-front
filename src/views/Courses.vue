<template>
    <h1 class="text-3xl font-semibold text-center mb-8">Svi Kursevi</h1>
    <div class="flex">
        <input
            type="text"
            v-model="searchInput"
            placeholder="Pretrazi kurs..."
            class="border border-black rounded-full p-2 text-lg w-64 focus:outline-none focus:ring-2 focus:ring-black"
        />
    </div>
    <section class="my-8" v-if="courses?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="course in searchCourse"
          :key="course.courseId"
          :to="`/courses/${course.courseId}/lessons`"
          class="bg-white shadow-lg p-4 rounded-lg cursor-pointer hover:shadow-xl transition block"
        >
          <img
            :src="course.thumbnail?.imagePath
              ? `http://localhost:3000/assets/thumbnails/${course.thumbnail.imagePath}`
              : '/default-video.webp'"
            alt="Thumbnail za kurs"
            class="w-full h-40 object-cover mb-4 rounded-lg"
          />
          <h3 class="text-xl font-semibold">{{ course.title }}</h3>
          <p class="text-gray-600">{{ course.shortDescription }}</p>
        </RouterLink>
      </div>
    </section>
    <div v-else class="flex justify-center">
      <p class="mt-8 text-xl text-bold">Trenutno ne postoje kursevi za odabranu kategoriju</p>
    </div>
</template>

<script setup lang="ts">
import type { Course } from '@/types/Course';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';

const courses = ref<Course[] | null>(null)
const searchInput = ref('')
const loading = ref(false)

const route = useRoute()

const fetchCourses = async () => {
  try {
    loading.value = true
    const id = route.query.categoryId
    const categoryId = id ? Number(id) : null

    const url = categoryId
      ? `http://localhost:3000/api/course?categoryId=${categoryId}`
      : `http://localhost:3000/api/course`

    const { data } = await axios.get<Course[]>(url)
    courses.value = data
  } catch (e) {
    toast.error('Greška prilikom dohvatanja kurseva')
  } finally {
    loading.value = false
  }
}

watch(() => route.query.categoryId, fetchCourses, { immediate: true })

const searchCourse = computed(() => {
  return (courses.value || []).filter((course) =>
    course.title.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})
</script>