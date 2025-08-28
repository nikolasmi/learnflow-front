<template>
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
      <h2 class="text-xl font-semibold mb-4">Izmeni thumbnail za: {{ course.title }}</h2>

      <div v-if="course.thumbnailUrl" class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Trenutni thumbnail:</p>
        <img
          :src="`http://localhost:3000/assets/thumbnails/${course.thumbnailUrl.imagePath}`"
          alt="Thumbnail"
          class="w-full h-40 object-cover rounded"
        />
      </div>
      <p>Odaberi fajl</p>
      <input type="file" accept="image/*" @change="handleFileChange" />

      <div class="mt-4 flex justify-end gap-2">
        <button
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          @click="$emit('close')"
        >
          Otkaži
        </button>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          :disabled="!course.thumbnailUrl"
          @click="deleteThumbnail"
          title="Obriši postojeći thumbnail"
        >
          Obriši thumbnail
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          :disabled="!selectedFile"
          @click="uploadThumbnail"
        >
          Sačuvaj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  course: {
    courseId: number
    title: string
    thumbnailUrl: {
      thumbnailId: number
      courseId: number
      imagePath: string
    } | null
  }
}>()

const emit = defineEmits(['close', 'updated'])
const selectedFile = ref<File | null>(null)

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const closeModal = () => {
  emit('close')
}

const uploadThumbnail = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('thumbnail', selectedFile.value)

  try {
    // Prvo obriši stari thumbnail ako postoji
    if (props.course.thumbnailUrl) {
      await axios.delete(
        `http://localhost:3000/api/course/${props.course.courseId}/deleteThumbnail/${props.course.thumbnailUrl.thumbnailId}`
      )
    }

    // Zatim uploaduj novi
    await axios.post(
      `http://localhost:3000/api/course/${props.course.courseId}/upload-thumbnail`,
      formData
    )

    toast.success('Thumbnail je uspešno izmenjen.')
    emit('updated')
    emit('close')
  } catch (error) {
    toast.error('Greška pri promeni thumbnail slike.')
  }
}

const deleteThumbnail = async () => {
  if (!props.course.thumbnailUrl) return

  try {
    await axios.delete(
      `http://localhost:3000/api/course/${props.course.courseId}/deleteThumbnail/${props.course.thumbnailUrl.thumbnailId}`
    )
    toast.success('Thumbnail je uspešno obrisan.')
    emit('updated')
    emit('close')
  } catch (error) {
    toast.error('Greška pri brisanju thumbnail slike.')
  }
}
</script>
