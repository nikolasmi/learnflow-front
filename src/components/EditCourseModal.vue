<template>
  <div 
    class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/50"
    @click.self="closeModal"
  >
    <div class="bg-white rounded p-6 max-w-lg w-full">
      <h2 class="text-xl font-bold mb-4">Izmeni kurs</h2>
      <form @submit.prevent="handleSubmitForm" class="space-y-4">
        <BaseInput name="title" label="Naslov" :required="true" />
        <BaseInput name="shortDescription" label="Kratak opis" :required="true" />
        <BaseInput name="description" label="Opis" :required="true" />
        <BaseInput name="price" label="Cena" type="number" :required="true" />
        <BaseInput name="categoryId" label="ID kategorije" type="number" :required="true" />

        <div class="flex justify-end gap-3">
            <BaseButton @click="$emit('close')" class="bg-gray-500 hover:bg-gray-600">Otkaži</BaseButton>
            <BaseButton type="submit">Sačuvaj izmene</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { courseSchema } from '../validation/courseSchema'
import { watch } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import BaseInput from './base/BaseInput.vue'
import BaseButton from './base/BaseButton.vue'
import type { EditCourse } from '@/types/EditCourse'

const props = defineProps<{
  course: EditCourse
}>()

const emit = defineEmits(['close', 'updated'])

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(courseSchema),
  initialValues: {
    title: props.course.title,
    shortDescription: props.course.shortDescription,
    description: props.course.description,
    price: Number(props.course.price),
    categoryId: props.course.categoryId,
  }
})

watch(
  () => props.course,
  (newCourse) => {
    setValues({
      title: newCourse.title,
      shortDescription: newCourse.shortDescription,
      description: newCourse.description,
      price: Number(newCourse.price),
      categoryId: newCourse.categoryId,
    })
  },
  { deep: true }
)

const closeModal = () => {
  emit('close')
}

const handleSubmitForm = handleSubmit(async (values) => {
  try {
    await axios.put(`http://localhost:3000/api/course/${props.course.courseId}`, {
      ...values,
      userId: props.course.userId
    })
    toast.success('Kurs uspešno izmenjen')
    emit('updated')
    emit('close')
  } catch (error) {
    toast.error('Greška pri izmeni kursa')
  }
})
</script>
