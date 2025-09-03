<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">Potvrda kupovine</h2>

      <p class="mb-2"><strong>Kurs ID:</strong> {{ courseId }}</p>
      <p class="mb-2"><strong>Cena:</strong> ${{ price }}</p>

      <form @submit.prevent="submitPurchase" class="space-y-4 mt-4">
        <BaseInput
          name="cardNumber"
          label="Broj kartice"
          placeholder="Broj kartice"
          :required="true"
          v-model="values.cardNumber"
          :error-message="errors.cardNumber"
        />
        <BaseInput
          name="cardHolder"
          label="Ime vlasnika kartice"
          placeholder="Ime vlasnika kartice"
          :required="true"
          v-model="values.cardHolder"
          :error-message="errors.cardHolder"
        />
        <BaseInput
          name="expiry"
          label="Datum isteka (MM/YY)"
          placeholder="MM/YY"
          :required="true"
          v-model="values.expiry"
          :error-message="errors.expiry"
        />
        <BaseInput
          name="cvv"
          label="CVV"
          placeholder="CVV"
          :required="true"
          v-model="values.cvv"
          :error-message="errors.cvv"
        />

        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            name="terms"
            :checked="values.terms"
            @change="e => setFieldValue('terms', (e.target as HTMLInputElement).checked)"
            class="accent-primary cursor-pointer"
          />
          <span>
            Slažem se sa
            <RouterLink to="/terms-of-service" class="underline text-blue-600">uslovima korišćenja</RouterLink>
          </span>
        </label>
        <div v-if="errors.terms" class="text-red-500 text-xs mt-1">{{ errors.terms }}</div>

        <div class="flex justify-end gap-2">
          <button type="button" class="px-4 py-2 bg-gray-300 rounded" @click="emit('close')">
            Otkaži
          </button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Kupi
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { purchaseSchema } from '@/validation/purchaseSchema'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import { defineEmits, defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'

const props = defineProps({
  userId: Number,
  courseId: Number,
  price: Number,
})

const emit = defineEmits(['close', 'purchased'])

const { handleSubmit, errors, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(purchaseSchema),
  initialValues: {
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    terms: false,
  },
})

const closeModal = () => {
  emit('close')
}

const submitPurchase = handleSubmit(async () => {
  try {
    const payload = {
      userId: props.userId,
      courseId: props.courseId,
      price: props.price,
    }

    const { data } = await axios.post('http://localhost:3000/api/purchase', payload)
    emit('purchased', data)
    emit('close')
  } catch (error) {
    toast.error('Greška pri kupovini kursa.')
  }
})
</script>
