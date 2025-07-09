<template>
  <div>
    <form data-cy="registerForm" @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-3 p-4">
      <BaseInput name="name" :required="true" label="Име" />
      <BaseInput name="surname" :required="true" label="Презиме" />
      <BaseInput name="phone" :required="true" label="Телефон" />
      <BaseInput name="email" :required="true" label="Адреса е-поште" />
      <BaseInput name="password" :required="true" label="Лозинка" type="password" />
      <!-- <BaseCheckbox :required="true" name="termsOfUse" label="Прихватам све услове коришћења" :error-message="errors.termsOfUse" /> -->
      <BaseButton type="submit">
        <span>Региструј се</span>
      </BaseButton>
    </form>
    <div class="mt-6 px-4 text-center">
      <p class="font-semibold font-semicondensed text-lg">ПРИЈАВИТЕ СЕ</p>
      <ul class="list-disc text-gray-500 px-4 mt-4">
        <li class="pb-4">
          Ваши лични подаци ће се користити за управљање вашег налога и друге сврхе наведене на страници
          <RouterLink to="/terms-of-service" class="underline">политика приватности.</RouterLink>
        </li>
        <li class="pb-4">
          Регистрација на овом сајту вам омогућава да приступите статусу и историји поруџбине. Само попуните поља испод и ми ћемо вам за кратко време поставити
          нови налог. Тражићемо од вас само информације које су неопходне да би процес куповине био бржи и лакши.
        </li>
        <li class="pb-4">
          Регистрацијом добијате бржи и лакши процес поручивања као и уживање у низу других бесплатних погодности. Неопходно је да оставите све тачне податке
          јер ће вам у супротном функционисање сајта бити отежано. Обавезно користите или ћирилицу или латиницу са кукицама.
        </li>
        <li>
          Након регистрације, обавезно запамтите вашу e-mail адресу јер ћете преко ње моћи да у сваком тренутку рестартујете вашу лозинку уколико је заборавите.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { registerSchema } from '@/validation/registerSchema'
import { scrollToFirstError } from '@/utils/scrollToFirstError'
import BaseCheckbox from '../components/base/BaseCheckbox.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { toast } from 'vue3-toastify'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'vue-router'

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(registerSchema)
})
const router = useRouter()
const onSubmit = handleSubmit(async (values) => {
  try {
    await axios.post('http://localhost:3000/api/user', { ...values})
    await router.push({ path: '/login' })
    toast.success('Успешно сте се регистровали!')
  } catch (e) {
    if (e instanceof AxiosError) {
      setErrors(e.response?.data.fields)
      toast.error(e?.response?.data.message)
    } else toast.error('Догодила се грешка на серверу, молимо вас да покушате поново')
  }
}, scrollToFirstError)
</script>

<style scoped></style>
