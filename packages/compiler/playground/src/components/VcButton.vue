<script setup lang="ts">
import VcIcon from './VcIcon.vue';
import VcProgress from './VcProgress.vue';

const { color = 'blue', type = 'solid' } = defineProps({
  icon: String,
  type: String,
  color: String,
  iconRight: String,
  gradient: Boolean,
  loading: Boolean
})

const getTextColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'white'
    case 'red':
      return 'black'
    case 'green':
      return 'white'
    default:
      return 'text-gray-500'
  }
}

const getStyle = (type: string, color: string, gradient: boolean) => {
  switch (type) {
    case 'solid':
      if (gradient) {
        return `bg-gradient-to-r from-${color}-400 to-${color}-600 text-${getTextColor(color)}`
      }

      return `bg-${color}-500 text-${getTextColor(color)}`
    case 'outlined':
      return `border border-${color}-500 text-${color}-500`
    default:
      return ``
  }
}

const getDropdownStyle = (dropdown: boolean) => {
  return dropdown ? 'relative group' : ''
}

defineSlots<{
  dropdown: true,
  default: true
}>()
</script>

<template>
  <button :class="[getStyle(type, color, gradient), getDropdownStyle($slots.dropdown)]" class="px-4 py-2 rounded-lg flex items-center space-x-2">
    <VcIcon v-if="icon" :icon="icon" class="mr-2"></VcIcon>
    <slot />
    <VcIcon v-if="iconRight" :icon="iconRight" class="ml-2"></VcIcon>
    <VcProgress v-if="loading" fillColor="blue-500" unfillColor="gray-200"></VcProgress>
    <div v-if="$slots.dropdown" id="dropdown" class="absolute top-full left-0 w-full mt-2 bg-white text-black shadow rounded-lg p-2 hidden group-hover:block">
      <slot name="dropdown" />
    </div>
  </button>
</template>
