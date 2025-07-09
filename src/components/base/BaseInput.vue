<template>
  <div class="flex flex-col items-start gap-y-0.5">
    <label v-if="props.label">
      <span class="font-medium">{{ props.label }} <span v-if="props.required" class="text-red-500">*</span></span>
    </label>
    <div class="relative w-full">
      <input
        :type="props.type"
        :id="props.name"
        :disabled="props.disabled"
        :required="props.required"
        :value
        v-bind="$attrs"
        :class="[errorMessage && '!border-red-500']"
        :data-error="errorMessage || undefined"
        v-on="validationListeners"
        class="border dark:bg-dark-input dark:border-dark-input relative outline-none px-3 py-2 placeholder:text-gray-300 border-1 w-full dark:text-dark rounded"
      />
    </div>
    <div v-if="errorMessage" class="text-xs text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    type?: string
    label?: string
    name: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    type: 'text',
    required: false
  }
)

const { errorMessage, meta, value, handleChange, handleBlur } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false
})

const validationListeners = {
  change: handleChange,
  input: (e: InputEvent) => handleChange(e, !!errorMessage.value),
  blur: (e: Event) => {
    if (meta.touched) handleBlur(e, true)
  }
}
</script>

<style scoped></style>
