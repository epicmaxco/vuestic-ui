<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<VaDateInput placeholder="Chose date" />
  `
</script>

<template>
  <ComponentSelectItem title="Date Input" :code="code">
    <VaDateInput placeholder="Chose date" />
  </ComponentSelectItem>
</template>
