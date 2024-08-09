<script setup lang="ts">
  const props = defineProps<{
    code: string;
    title: string;
  }>();
</script>

<template>
  <VaCard @click="$emit('select', $props.code)" outlined class="va-devtools-component-select-item">
    <VaCardTitle>
      {{ title }}
    </VaCardTitle>

    <VaCardContent @click.stop>
      <slot />
    </VaCardContent>
  </VaCard>
</template>

<style lang="scss" scoped>
  .va-devtools-component-select-item {
    cursor: pointer;
  }
</style>
