<template>
  <div class="bg-white dark:bg-dark-lighter-variant shadow-xl rounded p-6 w-full max-w-5xl">
    <p class="text-xl pb-6 border-b dark:border-b-dark border-b-slate-200 dark:text-white">Izmenite svoju šifru</p>
    <form class="flex flex-col gap-y-6 mt-6" @submit.prevent="onSubmit">
      <div class="flex">
        <BaseInput name="password" label="Trenutna šifra" class="w-full" type="password" />
      </div>
      <div class="flex sm:gap-x-6 gap-y-6 sm:flex-nowrap flex-wrap">
        <BaseInput name="newPassword" label="Nova šifra" class="sm:basis-6/12 basis-full" type="password" />
        <BaseInput name="confirmNewPassword" label="Potvrdi šifru" class="sm:basis-6/12 basis-full" type="password" />
      </div>
      <div class="flex justify-center">
        <BaseButton type="submit">
          <span>Sačuvaj</span>
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { changePasswordSchema } from '../validation/changePasswordSchema'
import { scrollToFirstError } from '@/utils/scrollToFirstError'
import type { ChangePasswordForm } from '../types/ChangePasswordForm'
import { toast } from 'vue3-toastify'
import axios, { AxiosError } from 'axios'
import { useUserStore } from '@/stores/user'

const { handleSubmit } = useForm<ChangePasswordForm>({
  validationSchema: toTypedSchema(changePasswordSchema)
})

const userStore = useUserStore()
const userId = userStore.user?.id

const onSubmit = handleSubmit(async (values) => {
  try {
    await axios.put<string>(`http://localhost:3000/api/user/${userId}/password`, {
      password: values.newPassword
    })
    toast.success('Šifra je uspešno promenjena')
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.response?.data.message)
    } else {
      toast.error('Došlo je do greške prilikom promene lozinke. Pokušajte ponovo.')
    }
  }
}, scrollToFirstError)
</script>


<style scoped></style>
