<template>
  <section class="my-16">
    <h2 class="text-3xl font-semibold text-center mb-8">Moja Lista Želja</h2>

    <div v-if="courses?.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in courses"
        :key="item.wishlistId"
        class="block bg-white shadow-lg p-4 rounded-lg flex flex-col"
      >
        <RouterLink
          :to="`/courses/${item.course.courseId}/lessons/preview`"
          class="no-underline mb-4"
        >
          <img
            :src="item.course.thumbnail?.imagePath
              ? `http://localhost:3000/assets/thumbnails/${item.course.thumbnail.imagePath}`
              : '/default-video.webp'"
            alt="Thumbnail za kurs"
            class="w-full h-40 object-cover rounded-lg"
          />
          <h3 class="text-xl font-semibold text-gray-900">{{ item.course.title }}</h3>
          <p class="text-gray-600 mb-2">{{ item.course.shortDescription }}</p>
          <p class="text-black font-bold">${{ item.course.price }}</p>
        </RouterLink>

        <button
          class="w-full px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          @click="removeFromWishlist(item.wishlistId)"
        >
          Ukloni iz liste želja
        </button>
      </div>
    </div>

    <p v-else class="text-center text-gray-600 mt-16 text-xl">Lista želja je prazna.</p>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
  courses: Array<{
    wishlistId: number
    userId: number
    courseId: number
    course: {
      courseId: number
      title: string
      shortDescription: string
      price: string
      thumbnail?: { imagePath: string }
    }
  }> | null
}>()

const emit = defineEmits<{
  (e: 'wishlistUpdated'): void
}>()

const removeFromWishlist = async (wishlistId: number) => {
  try {
    await axios.delete(`http://localhost:3000/api/wishlist/${wishlistId}`)
    toast.success('Kurs je uklonjen iz liste želja.')
    emit('wishlistUpdated')
  } catch (error) {
    toast.error('Greška prilikom uklanjanja kursa iz liste želja.')
  }
}
</script>
