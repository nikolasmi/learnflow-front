import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'
import type { Profile } from '@/types/Profile'
import { jwtDecode } from 'jwt-decode'
import { SESSION_TOKEN } from '@/constants'
import router from '@/router'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const profile = ref<Profile | null>(null)
  const isLoaing = ref(false)

  const setUser = (u: User | null) => {
    user.value = u
  }

  const setProfile = (p: Profile | null) => {
    profile.value = p
  }

  const logout = async () => {
    localStorage.removeItem(SESSION_TOKEN)
    user.value = null
    profile.value = null
    await router.push('/login')
  }

  const loadUserFromToken = () => {
    const token = localStorage.getItem(SESSION_TOKEN)
    if (token) {
      const decoded = jwtDecode<User>(token)
      setUser(decoded)
    }
  }

  const fetchProfile = async () => {
    if (!user.value?.id) {
      setProfile(null)
      return
    }

    try {
      isLoaing.value = true
      const { data } = await axios.get<Profile>(`http://localhost:3000/api/user/${user.value.id}`)
      setProfile(data)
    } catch (e) {
      setProfile(null)
    } finally {
      isLoaing.value = false
    }
  }

  return { user, profile, setUser, setProfile, logout, loadUserFromToken, fetchProfile, isLoaing }
})
