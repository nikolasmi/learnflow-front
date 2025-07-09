import { defineStore } from 'pinia'
import { ref } from 'vue'
import { THEME } from '@/constants'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem(THEME))

  const setDarkMode = () => {
    theme.value = 'dark'
    const html = document.querySelector('html')
    localStorage.setItem(THEME, 'dark')
    if (html) html.classList.add('dark')
  }

  const setLightMode = () => {
    theme.value = 'light'
    localStorage.setItem(THEME, 'light')
    const html = document.querySelector('html')
    if (html) html.classList.remove('dark')
  }

  return { theme, setDarkMode, setLightMode }
})
