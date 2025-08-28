<template>
  <div class="bg-white dark:bg-dark-lighter-variant shadow-xl rounded p-6 w-full max-w-5xl relative">
    <p class="text-xl pb-6 border-b dark:border-b-dark border-b-slate-200 dark:text-white">Izmeni profil</p>
    <div class="mt-6 flex items-center gap-x-6" :class="[userStore.isLoaing && '!invisible']">
      <!-- <button
        class="relative rounded-full bg-gray-100 dark:bg-gray-300 bg:white size-20 flex items-center justify-center cursor-pointer"
        @click="handleOpeningFiles"
      >
        <IconCamera class="dark:fill-dark fill-dark" v-if="!userStore.profile?.imageUrl" />
        <img v-else :src="profileStore.profile?.imageUrl" class="rounded-full size-20 cursor-pointer" />
        <div class="flex absolute items-center justify-center" v-if="isImageUploading">
          <Spinner class="!w-10 !h-10 border-4" />
        </div>
        <input type="file" class="hidden" @change="handleFileUploading" ref="fileInput" />
      </button> -->
      <p v-show="userStore.profile" class="text-xl font-bold">{{ fullName }}</p>
    </div>
    <form class="relative flex flex-col gap-y-6 mt-6" @submit.prevent="onSubmit" :class="[userStore.isLoaing && '!invisible']">
      <div class="flex gap-x-6">
        <BaseInput name="name" label="Ime" class="basis-6/12" />
        <BaseInput name="surname" label="Prezime" class="basis-6/12" />
      </div>
      <div class="flex gap-x-6">
        <BaseInput name="email" label="Email" class="basis-6/12" />
        <BaseInput name="phone" label="Broj telefona" class="basis-6/12" />
      </div>
      <div class="flex justify-center">
        <BaseButton type="submit" :loading="isSubmitting">
          <span>Sačuvaj</span>
        </BaseButton>
      </div>
    </form>
    <div v-if="userStore.isLoaing" class="absolute inset-0 flex justify-center items-center">
      <Spinner class="w-10 h-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { profileSchema } from '../validation/profileSchema'
import type { Profile } from '@/types/Profile'
import BaseButton from '@/components/base/BaseButton.vue'
import { scrollToFirstError } from '../utils/scrollToFirstError'
import { computed, watch } from 'vue'
import Spinner from '../components/Spinner.vue'
import { toast } from 'vue3-toastify'
import { errorHandler } from '../utils/errorHandler'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const { handleSubmit, resetForm, isSubmitting, setErrors } = useForm<Profile>({
  validationSchema: toTypedSchema(profileSchema)
})
// const isImageUploading = ref(false)
// const fileInput = ref<HTMLInputElement | null>(null)
const userStore = useUserStore()
const userId = userStore.user?.id
const fullName = computed(() => `${userStore.profile?.name} ${userStore.profile?.surname}`)

const onSubmit = handleSubmit(async (values) => {
  try {
    const { data } = await axios.put<Profile>(`http://localhost:3000/api/user/${userId}/details`, values)
    if (userStore.profile?.name) userStore.setProfile(data)
    toast.success('Korisnik je uspešno izmenjen')
  } catch (e) {
    const [data, message] = errorHandler(e)
    toast.error(message)
    if (data) setErrors(data)
  }
}, scrollToFirstError)

// const handleOpeningFiles = () => {
//   fileInput.value?.click()
// }

// const handleFileUploading = async () => {
//   if (fileInput.value?.files) {
//     const { files } = fileInput.value
//     const form = new FormData()
//     form.set('ImageFile', files[0])
//     try {
//       isImageUploading.value = true
//       const { data } = await httpClient.put<string>('/v1/users/profile/upload-image', form)
//       if (profileStore.profile?.imageUrl) profileStore.setProfileImage(data)
//       toast.success('Профилна слика је успешно измењена')
//     } catch (e) {
//       toast.error('Није могуће поставити профилну слику. Молимо вас покушајте поново')
//     } finally {
//       isImageUploading.value = false
//     }
//   }
// }

watch(
  () => userStore.profile,
  (newProfile) => {
    resetForm({
      values: {
        name: newProfile?.name,
        surname: newProfile?.surname,
        phone: newProfile?.phone,
        email: newProfile?.email
      }
    })
  },
  { immediate: true, once: true }
)
</script>

<style scoped></style>
