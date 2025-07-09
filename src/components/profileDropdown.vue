<template>
  <ul
    ref="dropdownContent"
    class="absolute divide-y border z-[9999] w-80 bg-white shadow-md top-10 rounded right-1 dark:bg-dark-lighter-variant dark:border-none dark:divide-dark"
  >
    <li class="px-4 py-2 cursor-default">
      Корисник: <span class="font-semibold">{{ userStore.user?.identity }}</span>
    </li>
    <li class="flex flex-col">
      <RouterLink
        to="/account"
        class="py-2 px-4 text-primary dark:text-dark-primary hover:bg-primary/[.10] cursor-pointer flex gap-x-2"
        @click="emit('closeMenu', false)"
      >
        <IconProfile class="fill-primary dark:fill-dark-primary" /> Профил
      </RouterLink>
      <RouterLink
        to="/account/change-password"
        class="py-2 px-4 text-primary dark:text-dark-primary hover:bg-primary/[.10] cursor-pointer flex gap-x-2"
        @click="emit('closeMenu', false)"
      >
        <IconChangePassword class="fill-primary dark:fill-dark-primary" /> Промени шифру
      </RouterLink>
      <button
        @click="handleLogout"
        class="text-left py-2 px-4 text-primary dark:text-dark-primary hover:bg-primary/[.10] cursor-pointer flex gap-x-2"
      >
        <IconLogout class="fill-primary dark:fill-dark-primary" /> Излогуј се
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useClickOutside } from '../composables/useClickOutside'
import { ref } from 'vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import IconChangePassword from '@/components/icons/IconChangePassword.vue'
import { useUserStore } from '@/stores/user'

const emit = defineEmits<{
  closeMenu: [val: boolean]
}>()

const userStore = useUserStore()
const dropdownContent = ref<HTMLElement | null>(null)

const handleLogout = () => {
  userStore.logout()
  emit('closeMenu', false)
}

useClickOutside(dropdownContent, () => {
  emit('closeMenu', false)
})
</script>
