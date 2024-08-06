<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<VaButtonToggle
  :options="[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]"
/>
  `
</script>

<template>
  <ComponentSelectItem title="Button Group" :code="code">
    <VaButtonToggle
      :options="[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ]"
    />
  </ComponentSelectItem>
</template>
