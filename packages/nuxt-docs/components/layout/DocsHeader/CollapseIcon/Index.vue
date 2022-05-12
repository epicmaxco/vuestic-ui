<script setup lang="ts">
  import { getColor } from 'vuestic-ui';
  import VaIconMenu from './VaIconMenu.vue';
  import VaIconMenuCollapsed from './VaIconMenuCollapsed.vue';

  const primary = computed(() => getColor('primary'))

  defineProps({
    modelValue: { type: Boolean }
  })

  defineEmits([
    'update:modelValue'
  ])
</script>

<template>
  <component 
    :is="modelValue ? VaIconMenuCollapsed : VaIconMenu"
    :color="primary"
    class="docs-header-collapse-icon"
    @click="$emit('update:modelValue', !modelValue)"
  />
</template>

<style>
.docs-header-collapse-icon {
  cursor: pointer;
}
</style>