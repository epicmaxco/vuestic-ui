<script setup lang="ts">
  const props = defineProps<{
    code: string;
    title: string;
  }>();
</script>

<template>
  <VaCard @click="$emit('select', $props.code)">
    <VaCardTitle>
      {{ title }}
    </VaCardTitle>

    <VaCardContent @click.stop>
      <slot />
    </VaCardContent>
  </VaCard>
</template>
