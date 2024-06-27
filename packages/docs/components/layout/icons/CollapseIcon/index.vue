<script setup lang="ts">

  import VaIconMenu from './VaIconMenu.vue';
  import VaIconMenuCollapsed from './VaIconMenuCollapsed.vue';

  const { colors } = useColors()

  const primary = computed(() => colors.primary)

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
