<template>
  <Modal :isOpen="isOpen" @close="closeModal">
    <template #header>
      <h2 class="text-xl font-bold">Izmeni Thumbnail</h2>
    </template>

    <template #body>
      <div class="flex flex-col items-center gap-4">
        <div class="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img
            :src="thumbnailPreview || currentThumbnail || '/default-video.webp'"
            class="w-full h-full object-cover"
            alt="Thumbnail preview"
          />
        </div>

        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleFileChange"
          class="hidden"
        />
        <button
          type="button"
          @click="fileInput?.click()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {{ thumbnailPreview ? 'Izaberi drugu sliku' : 'Izaberi sliku' }}
        </button>

        <button
          v-if="thumbnailPreview || currentThumbnail"
          type="button"
          @click="removeThumbnail"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Ukloni thumbnail
        </button>
      </div>
    </template>

    <template #footer>
      <button
        type="button"
        @click="closeModal"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition mr-3"
      >
        Otkaži
      </button>
      <button
        type="button"
        @click="saveThumbnail"
        :disabled="!hasChanges || isSaving"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        <span v-if="isSaving">Čuvanje...</span>
        <span v-else>Sačuvaj</span>
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const props = defineProps({
  isOpen: Boolean,
  courseId: {
    type: Number,
    required: true
  },
  currentThumbnail: String
})

const emit = defineEmits(['close', 'updated'])

interface Refs {
  fileInput: HTMLInputElement
}

const fileInput = ref<HTMLInputElement | null>(null)
const thumbnailPreview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const isSaving = ref(false)

const hasChanges = computed(() => {
  return selectedFile.value !== null || thumbnailPreview.value === null
})

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnailPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(input.files[0])
  }
}

const removeThumbnail = () => {
  selectedFile.value = null
  thumbnailPreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const closeModal = () => {
  // Resetujemo izmene prilikom zatvaranja
  thumbnailPreview.value = null
  selectedFile.value = null
  emit('close')
}

const saveThumbnail = async () => {
  if (!hasChanges.value) return

  isSaving.value = true

  try {
    if (selectedFile.value) {
      // Upload novog thumbnaila
      const formData = new FormData()
      formData.append('thumbnail', selectedFile.value)
      
      await axios.post(
        `http://localhost:3000/api/course/${props.courseId}/upload-thumbnail`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } else if (thumbnailPreview.value === null) {
      // Brisanje thumbnaila
      await axios.delete(`http://localhost:3000/api/course/${props.courseId}/thumbnail`)
    }

    toast.success('Thumbnail je uspešno ažuriran')
    emit('updated')
    closeModal()
  } catch (error) {
    toast.error('Došlo je do greške prilikom ažuriranja thumbnaila')
    console.error(error)
  } finally {
    isSaving.value = false
  }
}
</script>