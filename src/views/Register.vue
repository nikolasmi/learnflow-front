<template>
  <div>
    <div class="flex justify-center">
      <div class="w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4">Registracija</h2>
        <form
          data-cy="registerForm"
          @submit.prevent="onSubmit"
          class="grid grid-cols-1 gap-y-3 p-4 bg-white rounded-xl shadow-md"
        >
          <BaseInput name="name" :required="true" label="Ime" />
          <BaseInput name="surname" :required="true" label="Prezime" />
          <BaseInput name="phone" :required="true" label="Telefon" />
          <BaseInput name="email" :required="true" label="Adresa e-pošte" />
          <BaseInput name="password" :required="true" label="Lozinka" type="password" />
          <BaseButton type="submit" class="w-full">
            <span>Registruj se</span>
          </BaseButton>
        </form>
      </div>
    </div>
    <div class="mt-6 px-4 text-center">
      <p class="font-semibold font-semicondensed text-lg">PRIJAVITE SE</p>
      <ul class="list-disc text-gray-500 mt-4 mb-4 pl-5 text-left">
        <li class="pb-4">
          Vaši lični podaci će se koristiti za upravljanje vašeg naloga i druge svrhe navedene na stranici
          <RouterLink to="/terms-of-service" class="underline">politika privatnosti.</RouterLink>
        </li>
        <li class="pb-4">
          Registracija na ovom sajtu vam omogućava da pristupite statusu i istoriji kupovine. Samo popunite polja ispod i mi ćemo vam za kratko vreme postaviti
          novi nalog. Tražićemo od vas samo informacije koje su neophodne da bi proces kupovine bio brži i lakši.
        </li>
        <li class="pb-4">
          Registracijom dobijate brži i lakši proces kupovine kao i uživanje u nizu drugih pogodnosti. Neophodno je da ostavite sve tačne podatke
          jer će vam u suprotnom funkcionisanje sajta biti otežano. Obavezno koristite ili latinicu sa kvačicama ili ćirilicu.
        </li>
        <li>
          Nakon registracije, obavezno zapamtite vašu e-mail adresu jer ćete preko nje moći da u svakom trenutku restartujete vašu lozinku ukoliko je zaboravite.
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
    toast.success('Uspešno ste se registrovali!')
  } catch (e) {
    if (e instanceof AxiosError) {
      setErrors(e.response?.data.fields)
      toast.error(e?.response?.data.message)
    } else toast.error('Dogodila se greška na serveru, molimo vas pokušajte ponovo')
  }
}, scrollToFirstError)
</script>

<style scoped></style>
