<template>
  <Component :is="route.meta.layout || 'div'" :key="route.meta?.layout?.name || route.meta?.layout?.__file">
    <RouterView />
  </Component>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useUserStore } from './stores/user'
import { SESSION_TOKEN } from './constants'
import { jwtDecode } from 'jwt-decode'
import type { User } from './types/User'

const route = useRoute()
const userStore = useUserStore()

const token = localStorage.getItem(SESSION_TOKEN)
if (token) {
  const user = jwtDecode<User>(token)
  userStore.setUser(user)
}
</script>
