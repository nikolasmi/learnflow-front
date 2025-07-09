import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export const useClickOutside = (targetElement: Ref<HTMLElement | null>, handler: (e: Event) => void) => {
  const handleClickOutside = (e: Event) => {
    if (e.target === targetElement.value || e.composedPath().includes(targetElement.value as EventTarget)) return
    handler(e)
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
