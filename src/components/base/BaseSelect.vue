<template>
  <div class="flex flex-col">
    <label v-if="props.label">
      {{ props.label }}
      <span v-if="props.required" class="text-red-500">*</span>
    </label>
    <div class="w-full relative select" :class="[!options && 'loading']">
      <select
        :id="props.name"
        :placeholder="props.placeholder"
        v-bind="$attrs"
        v-model="value"
        :name="props.name"
        :disabled="!options || !options.length"
        :data-error="errorMessage || undefined"
        :data-cy="props.name"
        :class="[errorMessage && '!border-red-500', !options && 'dark:text-white']"
        class="w-full select outline-hidden border bg-white dark:text-slate-800 py-3 px-2 rounded placeholder:text-gray-300"
      >
        <option v-if="value === ''" value="" disabled>
          {{ placeholder || label }}
        </option>
        <option v-if="value === null" :value="null" disabled>
          {{ placeholder || label }}
        </option>
        <template v-if="options?.length">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </template>
      </select>
    </div>
    <div v-if="errorMessage" :data-cy="`errorMessage-${props.name}`" class="text-xs text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

defineOptions({
  inheritAttrs: false
})

interface Option {
  label: string
  value: string
}

const props = defineProps<{
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  options: Option[] | null
}>()
const { value, errorMessage } = useField(() => props.name)
</script>

<style scoped>
@reference '../../assets/main.css';
.loading {
  @apply cursor-not-allowed relative text-white;

  &:before {
    @apply animate-spin content-[''] z-50 inset-0 absolute w-6 h-6 m-auto border-4 border-transparent border-t-primary rounded-full;
  }
}
</style>
