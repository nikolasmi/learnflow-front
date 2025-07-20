<template>
  <div class="relative flex justify-center items-center h-screen p-6 flex-col gap-y-4 bg-white">
    <RouterLink
      to="/"
      class="absolute top-4 right-4 flex flex-col items-center p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Назад на почетну"
    >
      <IconOut class="w-6 h-6 text-gray-700" fill="black"/>
      <span class="text-sm mt-1 text-gray-700 select-none">Назад на почетну</span>
    </RouterLink>

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

    <div class="flex flex-col items-center gap-y-2 mt-4">
      <p>
        Немате налог? 
        <RouterLink to="/register" class="text-blue-600 hover:underline focus:outline-none">
          Региструјте се
        </RouterLink>
      </p>
    </div>
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
import IconOut from '@/components/icons/IconOut.vue'

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
