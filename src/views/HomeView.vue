<template>
  <div class="px-6 py-8">
    <!-- Hero sekcija -->
    <section class="bg-[#222b36] text-white p-16 text-center rounded-lg">
      <h1 class="text-4xl font-bold mb-4">Učite online, bilo gde, bilo kada</h1>
      <p class="text-xl mb-8">
        Pronađite kurseve u najrazličitijim kategorijama, kreirajte svoj put ka uspehu.
      </p>
      <RouterLink to="/courses" class="bg-white text-[#222b36] px-6 py-3 rounded-full text-lg">
        Pogledajte kurseve
      </RouterLink>
    </section>

    <!-- Popularne kategorije -->
    <section class="my-16" v-if="categories?.length">
      <h2 class="text-3xl font-semibold text-center mb-8">Popularne Kategorije</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="category in categories"
          :key="category.categoryId"
          :to="{ path: '/courses', query: { categoryId: category.categoryId } }"
          class="bg-gray-200 p-6 rounded-lg shadow-md cursor-pointer block hover:shadow-lg transition"
        >
          <h3 class="text-2xl text-center font-semibold mb-4">{{ category.name }}</h3>
        </RouterLink>
      </div>
      <div class="flex justify-center">
        <RouterLink to="/categories">
          <button class="mt-8 text-slate-900 text-xl py-2 px-4 border-2 rounded-xl bg-slate-300">
            Pogledaj sve
          </button>
        </RouterLink>
      </div>
    </section>

    <!-- Najpopularniji kursevi -->
    <section class="my-16" v-if="popularCourses?.length">
      <h2 class="text-3xl font-semibold text-center mb-8">Najpopularniji Kursevi</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="course in popularCourses"
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
          <p class="text-black font-bold">${{ course.price }}</p>
        </RouterLink>
      </div>
      <div class="flex justify-center">
        <RouterLink to="/courses">
          <button class="mt-8 text-slate-900 text-xl py-2 px-4 border-2 rounded-xl bg-slate-300">
            Pogledaj sve
          </button>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { Course } from '@/types/Course'
import type { Category } from '@/types/Category'
import { toast } from 'vue3-toastify'

const popularCourses = ref<Course[] | null>(null)
const categories = ref<Category[] | null>(null)

;(async () => {
  try {
    const [coursesResult, categoriesResult] = await Promise.allSettled([
      axios.get<Course[]>('http://localhost:3000/api/course/popular'),
      axios.get<Category[]>('http://localhost:3000/api/category/popular'),
    ])

    if (coursesResult.status === 'fulfilled') {
      popularCourses.value = coursesResult.value.data
    } else {
      toast.error("Greška pri dohvatanju kurseva")
    }

    if (categoriesResult.status === 'fulfilled') {
      categories.value = categoriesResult.value.data
    } else {
      toast.error("Greška pri dohvatanju kategorija")
    }
  } catch (error) {
    toast.error('Greška pri dohvatanju podataka.')
  }
})()
</script>

<style scoped>
</style>
