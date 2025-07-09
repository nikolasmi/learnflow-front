<template>
  <div>
    <label :for="props.label" class="cursor-pointer flex items-center gap-x-1" :class="[props.disabled && '!cursor-not-allowed']">
      <input
        type="checkbox"
        :id="props.label"
        :value="checked"
        v-bind="$attrs"
        :name="props.label"
        :checked="checked"
        :disabled="props.disabled"
        @change="emit('checked', checked)"
        :data-cy="props.name"
        class="accent-primary disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer size-4 border border-1 rounded"
        :data-error="props.errorMessage || undefined"
        v-on="validationListeners"
      />
      <span v-if="props.label" :class="[props.shouldApplyLabelClass && checked && 'text-primary', props.disabled && 'opacity-40']">
        {{ props.label }}
        <span v-if="props.required" class="text-red-500">*</span>
      </span>
    </label>
    <div class="text-red-500 text-xs" v-if="props.errorMessage" :data-cy="`errorMessage-${props.name}`">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    value?: string | boolean
    label?: string
    name: string
    disabled?: boolean
    errorMessage?: string
    required?: boolean
    shouldApplyLabelClass?: boolean // only in special cases, when client wants checkbox feature but without checkbox look
  }>(),
  {
    value: true,
    shouldApplyLabelClass: false
  }
)

const emit = defineEmits<{
  checked: [val: boolean | undefined]
}>()

const { checked, handleChange } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.value,
  validateOnValueUpdate: false
})

const validationListeners = {
  change: (e: Event) => handleChange(e, !!props.errorMessage)
}
</script>

<style scoped></style>
