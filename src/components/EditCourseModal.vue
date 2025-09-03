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

        <div class="flex justify-end gap-3">
          <BaseButton @click="$emit('close')" class="bg-gray-500 hover:bg-gray-600">
            Otkaži
          </BaseButton>
          <BaseButton type="submit">Sačuvaj izmene</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { courseSchema } from '../validation/courseSchema'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import BaseInput from './base/BaseInput.vue'
import BaseButton from './base/BaseButton.vue'
import type { EditCourse } from '@/types/EditCourse'

const props = defineProps<{
  course: EditCourse
}>()

const emit = defineEmits(['close', 'updated'])

const categories = ref<{ categoryId: number; name: string }[]>([])

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/category')
    categories.value = res.data
  } catch {
    toast.error('Greška pri učitavanju kategorija')
  }
}

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(courseSchema),
  initialValues: {
    title: props.course.title,
    shortDescription: props.course.shortDescription,
    description: props.course.description,
    price: Number(props.course.price),
    categoryId: props.course.categoryId, // ovde ce se selektovati trenutna kategorija
  }
})

// Ako se prosleđeni kurs promeni, update-uj formu
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

onMounted(fetchCategories)
</script>
