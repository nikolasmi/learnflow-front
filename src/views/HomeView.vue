<template>
  <div class="px-6 py-8">
    <section class="bg-[#222b36] text-white p-16 text-center rounded-lg">
      <h1 class="text-4xl font-bold mb-4">Učite online, bilo gde, bilo kada</h1>
      <p class="text-xl mb-8">
        Pronađite kurseve u najrazličitijim kategorijama, kreirajte svoj put ka uspehu.
      </p>
      <RouterLink to="/courses" class="bg-white text-[#222b36] px-6 py-3 rounded-full text-lg">
        Pogledajte kurseve
      </RouterLink>
    </section>
    <PopularCategories :categories="categories" />
    <PopularCourses :courses="popularCourses" :isLoggedIn="isLoggedIn" :userPurchases="userPurchases"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { Course } from '@/types/Course'
import type { Category } from '@/types/Category'
import { toast } from 'vue3-toastify'
import PopularCategories from '@/components/PopularCategories.vue'
import PopularCourses from '@/components/PopularCourses.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isLoggedIn = userStore.user !== null
const userId = userStore.user?.id ?? 0

const userPurchases = ref<number[]>([])
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
      toast.error("Greška pri dohvatanju popularnih kurseva")
    }

    if (categoriesResult.status === 'fulfilled') {
      categories.value = categoriesResult.value.data
    } else {
      toast.error("Greška pri dohvatanju popularnih kategorija")
    }
  } catch (error) {
    toast.error('Greška pri dohvatanju podataka.')
  }
})()

if (isLoggedIn) {
  axios.get(`http://localhost:3000/api/user-dashboard/${userId}`)
    .then(res => {
      userPurchases.value = res.data.recentPurchases.map((p: any) => parseInt(p.courseId))
    })
    .catch(() => {
      userPurchases.value = []
    })
}
</script>

