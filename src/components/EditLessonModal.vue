<template>
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-lg relative">
      <h2 class="text-xl font-semibold mb-4">Izmeni lekciju</h2>

      <form @submit.prevent="submitEdit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Naslov</label>
          <input v-model="form.title" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Opis</label>
          <textarea v-model="form.description" class="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Redosled</label>
          <input v-model="form.orderNumber" type="number" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Video fajl (opciono)</label>
          <input type="file" @change="handleFileChange" accept="video/*" />
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Otkaži
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sačuvaj
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import type { Lesson } from '@/types/Lesson'

const props = defineProps<{
  lesson: Lesson
}>()

const emit = defineEmits(['close', 'updated'])

const form = ref({
  title: props.lesson.title,
  description: props.lesson.description || '',
  orderNumber: props.lesson.orderNumber,
})

const videoFile = ref<File | null>(null)

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    videoFile.value = files[0]
  }
}

const closeModal = () => {
  emit('close')
}

const submitEdit = async () => {
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('orderNumber', form.value.orderNumber.toString())

    if (videoFile.value) {
      formData.append('video', videoFile.value)
    }

    await axios.put(`http://localhost:3000/api/lesson/${props.lesson.lessonId}/edit`, formData)

    toast.success('Lekcija je uspešno izmenjena.')
    emit('updated')
    emit('close')
  } catch (error) {
    toast.error('Greška pri izmeni lekcije.')
  }
}
</script>
