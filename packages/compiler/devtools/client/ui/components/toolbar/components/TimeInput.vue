<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<VaTimeInput placeholder="Chose date" />
  `
</script>

<template>
  <ComponentSelectItem title="Time Input" :code="code">
    <VaTimeInput placeholder="Chose time" />
  </ComponentSelectItem>
</template>
