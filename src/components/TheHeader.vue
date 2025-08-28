<template>
  <div class="flex p-4 shadow-sm justify-between items-center relative bg-secondary">
    <div class="flex items-center gap-x-4 z-10">
      <IconBurgerMenu class="fill-white cursor-pointer" />
      <p class="font-semibold text-dark dark:text-white">{{ pageName }}</p>
    </div>
    <RouterLink to="/" class="absolute left-1/2 transform -translate-x-1/2 z-0">
      <!-- <img alt="princip-logo" src="/learnflow-logo.png" class="h-8" /> -->
       <h1 class="text-xl md:text-5xl font-extrabold tracking-wide text-[#222b36] dark:text-white font-logo">LEARNFLOW</h1>
    </RouterLink>
    <div class="flex items-center gap-x-4 z-10">
      <RouterLink to="/terms-of-service">
        <IconBook class="fill-black cursor-pointer"></IconBook>
      </RouterLink>
      <!-- <IconDarkMode class="fill-white cursor-pointer" @click="themeStore.setDarkMode" v-if="themeStore.theme !== 'dark'" /> -->
      <!-- <IconLightMode class="fill-white cursor-pointer" @click="themeStore.setLightMode" v-else /> -->
      <RouterLink :to="`/user-dashboard/${userId}`">
        <IconStats class="fill-white dark:fill-white cursor-pointer" />
      </RouterLink>
      
      <button
        class="relative w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-300 flex justify-center items-center cursor-pointer"
        @click.stop="isProfileDropdownOpened = !isProfileDropdownOpened"
      >
        <p>{{ nameInitials }}</p>
        <ProfileDropdownConent v-if="isProfileDropdownOpened" @close-menu="isProfileDropdownOpened = false" @click.stop />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import IconDarkMode from '@/components/icons/IconDarkMode.vue'
import IconBurgerMenu from '@/components/icons/IconBurgerMenu.vue'
import IconLightMode from '@/components/icons/IconLightMode.vue'
import ProfileDropdownConent from '../components/profileDropdown.vue'
import { useUserStore } from '@/stores/user'
import { useThemeStore } from '../stores/theme'
import IconStats from './icons/IconStats.vue'
import IconBook from './icons/IconBook.vue'

const route = useRoute()
const userStore = useUserStore()
const themeStore = useThemeStore()
const isProfileDropdownOpened = ref(false)

const nameInitials = computed(() => {
  const email = userStore.user?.identity || ''
  return email ? email[0].toUpperCase() : '?'
})

const pageName = computed(() =>
  route.name ? route.name.toString().charAt(0).toUpperCase() + route.name.toString().slice(1) : ''
)

const userId = computed(() => userStore.user?.id)
</script>
