<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/50">
    <div class="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
      <h2 class="text-xl font-semibold mb-4">Kreiraj novi kurs</h2>

      <form @submit.prevent="handleSubmitForm" class="space-y-4">
        <BaseInput name="title" label="Наслов" :required="true" />
        <BaseInput name="shortDescription" label="Кратак опис" :required="true" />
        <BaseInput name="description" label="Опис" :required="true" />
        <BaseInput name="price" label="Цена" type="number" :required="true" />
        <BaseInput name="categoryId" label="Категорија (ID)" type="number" :required="true" />

        <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="bg-gray-300 px-4 py-2 rounded" @click="$emit('close')">Откажи</button>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Креирај</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import BaseInput from '@/components/base/BaseInput.vue'
import { courseSchema } from '../validation/courseSchema'

const emit = defineEmits(['close', 'created'])

const userStore = useUserStore()
const userId = userStore.user?.id

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(courseSchema)
})

const handleSubmitForm = handleSubmit(async (values) => {
  if (!userId) return
  try {
    await axios.post('http://localhost:3000/api/course', {
      ...values,
      userId
    })
    toast.success('Курс је успешно креиран')
    emit('created')
    emit('close')
  } catch (e) {
    toast.error('Грешка при креирању курса')
  }
})
</script>

