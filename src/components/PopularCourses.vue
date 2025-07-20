<template>
  <section class="my-16" v-if="props.courses?.length">
    <h2 class="text-3xl font-semibold text-center mb-8">Najpopularniji Kursevi</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="course in props.courses"
        :key="course.courseId"
        :to="`/courses/${course.courseId}/lessons/preview`"
        class="block bg-white shadow-lg p-4 rounded-lg transition hover:shadow-xl flex flex-col no-underline"
      >
        <img
          :src="course.thumbnail?.imagePath
            ? `http://localhost:3000/assets/thumbnails/${course.thumbnail.imagePath}`
            : '/default-video.webp'"
          alt="Thumbnail za kurs"
          class="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <h3 class="text-xl font-semibold text-gray-900">{{ course.title }}</h3>
        <p class="text-gray-600 mb-2">{{ course.shortDescription }}</p>
        <p class="text-black font-bold mb-4">${{ course.price }}</p>

        <div class="mt-auto flex gap-2">
          <button
            class="w-full px-4 py-2 rounded transition
                  text-white
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                  bg-green-600 hover:bg-green-700"
            :disabled="props.userPurchases.includes(course.courseId)"
            @click.stop.prevent="buyCourse(course)"
          >
            {{ props.userPurchases.includes(course.courseId) ? 'Već kupljen' : 'Kupi' }}
          </button>
          <button
            class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            @click.stop.prevent="addToWishlist(course.courseId)"
          >
            Lista želja
          </button>
        </div>
      </RouterLink>
    </div>

    <PurchaseCourseModal
      v-if="isModalOpen && selectedCourse"
      :course-id="selectedCourse.courseId"
      :userId="userId"
      :price="Number(selectedCourse.price)"
      @close="isModalOpen = false"
      @purchased="handlePurchase"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { Course } from '@/types/Course'
import PurchaseCourseModal from './PurchaseCourseModal.vue'
import { useUserStore } from '@/stores/user';

const props = defineProps<{ 
  courses: Course[] | null;
  isLoggedIn: boolean;
  userPurchases: number[];
}>()

const isModalOpen = ref(false)
const selectedCourse = ref<Course | null>(null)

const userStore = useUserStore()
const userId = userStore.user?.id ?? 0

const buyCourse = (course: Course) => {
  if (!props.isLoggedIn) {
    toast.warning('Морате бити пријављени да бисте купили курс.')
    return
  }
  if (props.userPurchases.includes(course.courseId)) {
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
  toast.success('Kupovina uspešna, kurs je dodat u dahsboard')
}
</script>
