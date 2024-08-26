<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<VaButtonGroup>
  <VaButton>Button 1</VaButton>
  <VaButton>Button 2</VaButton>
  <VaButton>Button 3</VaButton>
</VaButtonGroup>
  `
</script>

<template>
  <ComponentSelectItem title="Button Group" :code="code">
    <VaButtonGroup>
      <VaButton>Button 1</VaButton>
      <VaButton>Button 2</VaButton>
      <VaButton>Button 3</VaButton>
    </VaButtonGroup>
  </ComponentSelectItem>
</template>
