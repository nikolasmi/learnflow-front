<template>
  <section>
    <h2 class="text-2xl font-semibold mb-4">Moji kursevi</h2>
    <div class="flex justify-end mb-4">
      <BaseButton @click="$emit('openCreateModal')">Kreiraj kurs</BaseButton>
    </div>
    <div v-if="courses?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="course in courses"
        :key="course.courseId"
        class="bg-white p-6 rounded-lg shadow border flex flex-col"
      >
        <img
          :src="course.thumbnailUrl?.imagePath ? `http://localhost:3000/assets/thumbnails/${course.thumbnailUrl.imagePath}` : '/default-video.webp'"
          alt="Thumbnail kursa"
          class="w-full h-40 object-cover rounded mb-4"
        />
        <h3 class="text-xl font-bold mb-2">{{ course.title }}</h3>
        <p class="text-sm text-gray-600 mb-1">Kreiran: {{ formatDate(course.createdAt) }}</p>
        <p class="text-sm text-gray-600 mb-4">Lekcija: {{ course.lessonCount }}</p>

        <div class="mt-auto flex flex-col md:flex-row gap-y-2 md:gap-x-3">
          <button
            @click="$emit('openEditModal', course)"
            class="w-full px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Izmeni kurs
          </button>
          <button
            @click="$emit('openEditThumbnailModal', course)"
            class="w-full px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
            Izmeni thumbnail
            </button>
          <button
            @click="$emit('openCourseLessons', course)"
            class="w-full text-center px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Lekcije
          </button>
          <button
            @click="$emit('deleteCourse', course.courseId)"
            class="w-full px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Obriši kurs
          </button>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">Niste još kreirali nijedan kurs.</p>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import type { CreatedCourse } from '@/types/CreatedCourse';

defineProps<{
  courses: CreatedCourse[] | undefined
}>()

defineEmits(['openCreateModal', 'openEditModal', 'openEditThumbnailModal', 'deleteCourse', 'openCourseLessons'])

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>