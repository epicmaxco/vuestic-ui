<template>
  <VaMenu
    :options="['Option 1', 'Option 2', 'Option 3']"
    @selected="(v) => alert(v)"
  >
    <template #anchor>
      <VaButton>Open menu</VaButton>
    </template>
  </VaMenu>
</template>

<script setup>
  const alert = (...args) => window.alert(...args)
</script>
