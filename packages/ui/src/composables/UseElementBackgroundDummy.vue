<script lang="ts" setup>
import { useElementBackground } from './useElementBackground'
import { useCurrentElement } from './useCurrentElement'
import { watch, computed } from 'vue'

const color = computed(() => useElementBackground(useCurrentElement()))

const emit = defineEmits(['update:color'])

watch(color, (value) => emit('update:color', value), { immediate: true })
</script>

<template>
  <div style="width: 2rem; height: 2rem;" />
</template>
