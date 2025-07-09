<template>
  <div class="flex justify-center items-center h-screen p-6 flex-col gap-y-4 bg-white">
    <form class="flex flex-col gap-y-4 items-center w-full max-w-sm" @submit.prevent="submit">
      <p class="text-2xl font-bold">Пријава</p>
      <p>Унесите мејл и шифру како бисте приступили налогу.</p>

      <div class="w-full flex flex-col gap-y-4">
        <BaseInput name="email" label="Е-маил" :required="true" type="email"/>
        <BaseInput name="password" label="Шифра" :required="true" type="password" />
      </div>

      <BaseButton class="w-full flex justify-center" type="submit">
        <span class="flex gap-x-1">Пријава</span>
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { loginSchema } from '@/validation/loginSchema'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { SESSION_TOKEN } from '@/constants'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import type { LoginForm } from '../types/AuthForm'

const userStore = useUserStore()
const router = useRouter()

const { handleSubmit, setErrors } = useForm<LoginForm>({
  validationSchema: toTypedSchema(loginSchema)
})

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await axios.post('http://localhost:3000/auth/user/login', {
      email: values.email,
      password: values.password
    })

    localStorage.setItem(SESSION_TOKEN, data.token)
    userStore.loadUserFromToken()
    await userStore.fetchProfile()

    toast.success('Успешна пријава')
    router.push('/')
  } catch (error) {
    toast.error('Неуспешна пријава. Проверите податке.')
  }
})


</script>
