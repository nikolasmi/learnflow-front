<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white border-2 rounded-lg p-6 w-full max-w-xl relative">
      <h2 class="text-xl font-semibold mb-4">Dodaj novu lekciju</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block font-semibold">Naslov</label>
          <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label class="block font-semibold">Opis</label>
          <textarea v-model="form.description" rows="3" class="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label class="block font-semibold">Redosled</label>
          <input v-model="form.orderNumber" type="number" min="1" class="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label class="block font-semibold">Video fajl</label>
          <input type="file" accept="video/*" @change="handleFileUpload" required />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Otkaži
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Dodaj
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

const props = defineProps<{
  courseId: number
}>()

const emit = defineEmits(['close', 'added'])

const form = ref({
  title: '',
  description: '',
  orderNumber: 1,
})

const videoFile = ref<File | null>(null)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    videoFile.value = target.files[0]
  }
}

const handleSubmit = async () => {
  if (!videoFile.value) {
    toast.error('Video fajl je obavezan.')
    return
  }

  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('orderNumber', form.value.orderNumber.toString())
  formData.append('video', videoFile.value)

  try {
    await axios.post(`http://localhost:3000/api/course/${props.courseId}/upload-lesson`, formData)
    toast.success('Lekcija uspešno dodata.')
    emit('added')
    emit('close')
  } catch (error) {
    toast.error('Greška prilikom dodavanja lekcije.')
  }
}
</script>
