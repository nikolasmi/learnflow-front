<template>
  <button
    class="rounded font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative inline-flex justify-center items-center"
    :class="[
      sizeClasses,
      variantClasses,
      loading && 'text-transparent cursor-wait',
    ]"
    :disabled="disabled || loading"
    @click="(e) => emit('click', e)"
  >
    <span class="relative">
      <slot />
      <span
        v-if="loading"
        class="absolute inset-0 w-5 h-5 m-auto border-2 border-transparent border-t-white rounded-full animate-spin"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
    variant: 'primary'
  }
)

const emit = defineEmits<{
  click: [event: Event]
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-3 py-1.5'
    case 'lg':
      return 'text-lg px-6 py-3'
    default:
      return 'text-base px-5 py-2'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-600 text-white hover:bg-gray-700'
    case 'outline':
      return 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-900'
    default: // primary
      return 'bg-[#7b2e2e] text-white hover:bg-[#5e1f1f]' // bordo boja
      // ili plavičasto:
      // return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>
