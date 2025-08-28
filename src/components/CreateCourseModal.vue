<template>
  <div 
    class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/50"
    @click.self="closeModal"
  >
    <div class="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
      <h2 class="text-xl font-semibold mb-4">Kreiraj novi kurs</h2>

      <form @submit.prevent="handleSubmitForm" class="space-y-4">
        <BaseInput name="title" label="Naslov" :required="true" />
        <BaseInput name="shortDescription" label="Kratak opis" :required="true" />
        <BaseInput name="description" label="Opis" :required="true" />
        <BaseInput name="price" label="Cena" type="number" :required="true" />

        <div>
          <label for="categoryId" class="block mb-1 font-medium">Kategorija</label>
          <Field
            as="select"
            name="categoryId"
            id="categoryId"
            class="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Izaberite kategoriju --</option>
            <option
              v-for="category in categories"
              :key="category.categoryId"
              :value="category.categoryId"
            >
              {{ category.name }}
            </option>
          </Field>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" class="bg-gray-300 px-4 py-2 rounded" @click="$emit('close')">Otkaži</button>
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Kreiraj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import BaseInput from '@/components/base/BaseInput.vue'
import { courseSchema } from '../validation/courseSchema'

const emit = defineEmits(['close', 'created'])

const userStore = useUserStore()
const userId = userStore.user?.id

const categories = ref<{ categoryId: number; name: string }[]>([])

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(courseSchema)
})

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/category')
    categories.value = res.data
  } catch {
    toast.error('Greška pri učitavanju kategorija')
  }
}

const closeModal = () => {
  emit('close')
}

const handleSubmitForm = handleSubmit(async (values) => {
  if (!userId) return
  try {
    await axios.post('http://localhost:3000/api/course', {
      ...values,
      userId
    })
    toast.success('Kurs je uspešno kreiran')
    emit('created')
    emit('close')
  } catch {
    toast.error('Greška pri kreiranju kursa')
  }
})

fetchCategories()
</script>
