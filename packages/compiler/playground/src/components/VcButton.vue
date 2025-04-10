<script setup lang="ts">
import VcIcon from './VcIcon.vue';
import VcProgress from './VcProgress.vue';
// import { useColor } from '../composables/useColor'

const { color = 'primary', icon, loading } = defineProps({
  icon: String,
  color: String,
  iconRight: String,
  loading: Boolean
})

const getTextColor = (color: string) => {
  switch (color) {
    case 'primary':
      return 'text-white'
    case 'secondary':
      return 'text-white'
    default:
      return 'text-gray-500'
  }
}

const getColor = (color: string) => {
  switch (color) {
    case 'primary':
      return 'bg-[#154EC1]'
    case 'secondary':
      return 'bg-[#767C88]'
    default:
      return 'gray'
  }
}

const getStyle = (color: string) => {
  const colorHex = getColor(color)
  const colorTextHex = getTextColor(color)

  return `${colorHex} ${colorTextHex}`
}

if (loading) {
  console.log('icon', icon)
}

defineSlots<{
  dropdown: true,
  default: true
}>()

// const colorC = useColor({})
</script>

<template>
  <button :class="[getStyle(color)]" class="px-3 py-1 flex items-center justify-center space-x-2 rounded-sm">
    <VcIcon v-if="icon" :icon="icon" class="mr-2"></VcIcon>
    <slot />
    <VcIcon v-if="iconRight" :icon="iconRight" class="ml-2"></VcIcon>
    <VcProgress v-if="loading" fillColor="blue-500" unfillColor="gray-200"></VcProgress>
  </button>
</template>
