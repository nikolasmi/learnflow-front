import { createRouter, createWebHistory } from 'vue-router'
import allRoutes from '@/router/routes'
import { jwtDecode } from 'jwt-decode'
import type { User } from '../types/User.ts'
import { useUserStore } from '../stores/user.ts'
import { SESSION_TOKEN } from '../constants/index.ts'
import { toast } from 'vue3-toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const token = localStorage.getItem(SESSION_TOKEN)

  if (token) {
    try {
      const user: User = jwtDecode(token)
      userStore.setUser(user)
    } catch {
      // Nevalidan token — očisti usera
      localStorage.removeItem(SESSION_TOKEN)
      userStore.setUser(null)
    }

    // Ako korisnik ide na login dok je već ulogovan — redirektuj ga na /
    if (to.path === '/login' || to.path === '/register') {
      toast.warning('Vec ste prijavljeni')
      return false
      //return '/'
    }
  } else {
    // Ako nije ulogovan i ruta zahteva autentifikaciju
    if (to.meta.requiresAuth) {
      return '/login'
    }
  }

  // Ako sve ok — pusti rutu
  return true
})

export default router
