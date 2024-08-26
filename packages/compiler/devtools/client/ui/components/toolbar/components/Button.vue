<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<VaButton>
  Button
</VaButton>
  `
</script>

<template>
  <ComponentSelectItem title="Button" :code="code">
    <VaButton>
      Button
    </VaButton>
  </ComponentSelectItem>
</template>
