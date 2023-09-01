<script setup lang="ts">
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'

const props = defineProps({
  modelValue: { type: String, default: null },
  label: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const vModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { getTextColor } = useColors()
</script>

<template>
  <div
    class="p-2 rounded-lg"
    :style="{
      background: vModel,
      color: getTextColor(vModel, '#000', '#fff')
    }"
  >
    {{ label }}
    <VaColorInput v-model="vModel" />
  </div>
</template>
