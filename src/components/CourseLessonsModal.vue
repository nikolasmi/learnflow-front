<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white border-2 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
      <h2 class="text-xl font-semibold mb-4">Lekcije za: {{ course.title }}</h2>

      <div class="mb-4 flex justify-end">
        <button
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          @click="isAddLessonModalOpen = true"
        >
          Dodaj lekciju
        </button>
      </div>

      <div v-if="isLoading">Učitavanje lekcija...</div>
      <div v-else-if="lessons.length === 0">Kurs trenutno nema nijednu lekciju.</div>

      <ul v-else class="space-y-4">
        <li v-for="lesson in lessons" :key="lesson.lessonId" class="border rounded p-4">
          <div>
            <h3 class="font-bold">{{ lesson.title }}</h3>
            <p class="text-sm text-gray-600 mb-1">Opis: {{ lesson.description || 'Nema opisa' }}</p>
            <p class="text-sm text-gray-600">Redosled: {{ lesson.orderNumber }}</p>

            <video
              v-if="lesson.videoUrl"
              :src="getVideoUrl(lesson.videoUrl)"
              controls
              class="w-full mt-2 rounded"
            />

            <div class="mt-4 flex gap-2 justify-end">
              <button
                class="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                @click="openEditLesson(lesson)"
              >
                Izmeni
              </button>
              <button
                class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                @click="onDeleteLesson(lesson.lessonId)"
              >
                Obriši
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div class="mt-6 text-right">
        <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" @click="$emit('close')">
          Zatvori
        </button>
      </div>
    </div>
  </div>

  <EditLessonModal
    v-if="isEditLessonModalOpen && lessonBeingEdited"
    :lesson="lessonBeingEdited"
    @close="isEditLessonModalOpen = false"
    @updated="fetchLessons"
  />

  <AddLessonModal
    v-if="isAddLessonModalOpen"
    :course-id="props.course.courseId"
    @close="isAddLessonModalOpen = false"
    @added="fetchLessons"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import type { Lesson } from '@/types/Lesson'
import EditLessonModal from './EditLessonModal.vue'
import AddLessonModal from './AddLessonModal.vue'

const props = defineProps<{
  course: {
    courseId: number
    title: string
  }
}>()

const emit = defineEmits(['close', 'editLesson', 'deleteLesson'])

const lessons = ref<Lesson[]>([])
const isLoading = ref(true)
const isEditLessonModalOpen = ref(false)
const isAddLessonModalOpen = ref(false)
const lessonBeingEdited = ref<Lesson | null>(null)

const openEditLesson = (lesson: Lesson) => {
  lessonBeingEdited.value = lesson
  isEditLessonModalOpen.value = true
}

const fetchLessons = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`http://localhost:3000/api/lesson/${props.course.courseId}/lessons`)
    if (Array.isArray(response.data)) {
      lessons.value = response.data
    } else {
      lessons.value = []
      //toast.info(response.data.message)
    }
  } catch (error) {
    toast.error('Greška pri dohvatanju lekcija.')
  } finally {
    isLoading.value = false
  }
}

const onDeleteLesson = async (lessonId: number) => {
  try {
    await emit('deleteLesson', lessonId)
    await fetchLessons()
  } catch {
    toast.error('Greška pri osvežavanju lekcija nakon brisanja.')
  }
}

watch(() => props.course.courseId, fetchLessons, { immediate: true })

const getVideoUrl = (videoUrl: string) => {
  return `http://localhost:3000/assets/lessons/${videoUrl}`
}
</script>
