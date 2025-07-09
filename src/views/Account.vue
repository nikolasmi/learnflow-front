<template>
  <div class="flex lg:flex-row lg:gap-x-6 flex-col gap-y-6">
    <div class="px-9 py-6 bg-white dark:bg-dark-lighter-variant rounded shadow-xl flex flex-grow-0 h-fit">
      <div class="flex flex-col w-full">
        <RouterLink to="/account" class="py-2 flex gap-x-2 items-center" :class="[currRoute === '/account' && 'bg-[#7b2e2e] text-white rounded p-1']">
          <IconProfile class="fill-dark" :class="currRoute === '/account' && '!fill-white'" />
          Профил
        </RouterLink>
        <!-- <RouterLink to="/" class="py-2 flex gap-x-2 items-center" active-class="bg-primary text-white rounded"
          ><IconEditProfile class="fill-dark" :class="currRoute === '/account/preferences' && '!fill-white'" /> Preferences</RouterLink
        > -->
        <RouterLink to="/account/change-password" class="py-2 flex gap-x-2 items-center" active-class="bg-[#7b2e2e] text-white rounded"
          ><IconChangePassword class="fill-dark" :class="currRoute === '/account/change-password' && '!fill-white'" /> Шифра</RouterLink
        >
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import IconProfile from '@/components/icons/IconProfile.vue'
import IconChangePassword from '@/components/icons/IconChangePassword.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currRoute = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    currRoute.value = newPath
  }
)
</script>

<style scoped></style>
