<template>
  <h1 class="text-3xl font-semibold text-center mb-8">Svi Kursevi</h1>

  <div class="flex mb-6">
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
        :to="`/courses/${course.courseId}/lessons/preview`"
        class="bg-white shadow-lg p-4 rounded-lg transition hover:shadow-xl flex flex-col"
      >
        <img
          :src="course.thumbnail?.imagePath
            ? `http://localhost:3000/assets/thumbnails/${course.thumbnail.imagePath}`
            : '/default-video.webp'"
          alt="Thumbnail za kurs"
          class="w-full h-40 object-cover mb-4 rounded-lg"
        />

        <h3 class="text-xl font-semibold">{{ course.title }}</h3>
        <p class="text-gray-600 mb-4">{{ course.shortDescription }}</p>
        <p class="text-black font-bold mb-4">${{ course.price }}</p>

        <div class="mt-auto flex gap-2">
          <button
            class="w-full px-4 py-2 rounded transition
                  text-white
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                  bg-green-600 hover:bg-green-700"
            :disabled="userPurchases.includes(course.courseId)"
            @click="buyCourse(course)"
          >
            {{ userPurchases.includes(course.courseId) ? 'Već kupljen' : 'Kupi' }}
          </button>
          <button
            class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            @click="addToWishlist(course.courseId)"
          >
            Lista želja
          </button>
        </div>
      </RouterLink>
    </div>
  </section>

  <div v-else class="flex justify-center">
    <p class="mt-8 text-xl font-bold">Trenutno ne postoje kursevi za odabranu kategoriju</p>
  </div>

  <PurchaseCourseModal
    v-if="isModalOpen && selectedCourse"
    :course-id="selectedCourse.courseId"
    :user-id="userId"
    :price="Number(selectedCourse.price)"
    @close="isModalOpen = false"
    @purchased="handlePurchase"
  />
</template>

<script setup lang="ts">
import type { Course } from '@/types/Course'
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import PurchaseCourseModal from '@/components/PurchaseCourseModal.vue'
import { useUserStore } from '@/stores/user'

const courses = ref<Course[] | null>(null)
const searchInput = ref('')
const loading = ref(false)

const isModalOpen = ref(false)
const selectedCourse = ref<Course | null>(null)

const userStore = useUserStore()
const userId = userStore.user?.id ?? 0
const isLoggedIn = computed(() => userStore.user !== null)
const userPurchases = ref<number[]>([])

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

const fetchUserPurchases = async () => {
  if (!isLoggedIn.value) {
    userPurchases.value = []
    return
  }
  try {
    const res = await axios.get(`http://localhost:3000/api/user-dashboard/${userId}`)
    userPurchases.value = res.data.recentPurchases.map((p: any) => Number(p.courseId))
  } catch {
    userPurchases.value = []
  }
}

const searchCourse = computed(() => {
  return (courses.value || []).filter((course) =>
  course.title.toLowerCase().includes(searchInput.value.toLowerCase())
)
})

const buyCourse = (course: Course) => {
  if (!isLoggedIn.value) {
    toast.warning('Морате бити пријављени да бисте купили курс.')
    return
  }
  if (userPurchases.value.includes(course.courseId)) {
    toast.info('Већ сте купили овај курс.')
    return
  }
  selectedCourse.value = course
  isModalOpen.value = true
}

const addToWishlist = (courseId: number) => {
  toast.success(`Kurs ${courseId} dodat u listu želja.`)
}

const handlePurchase = () => {
  toast.success('Kupovina uspešna! Kurs je dodat na dashboard')
}

watch(() => route.query.categoryId, fetchCourses, { immediate: true })
watch(() => userStore.user, fetchUserPurchases, { immediate: true })
</script>