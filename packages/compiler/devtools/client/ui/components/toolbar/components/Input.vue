<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<VaInput placeholder="Enter text" />
  `
</script>

<template>
  <ComponentSelectItem title="Input" :code="code">
    <VaInput placeholder="Enter text" />
  </ComponentSelectItem>
</template>

