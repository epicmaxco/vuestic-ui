<script setup lang="ts">
  const props = defineProps({
    testButtonBase: String
  })
</script>

<template>
  <VaButton>
    <slot />
  </VaButton>
</template>
