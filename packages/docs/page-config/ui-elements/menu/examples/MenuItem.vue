<template>
  <VaMenu>
    <template #anchor>
      <VaButton>Open menu</VaButton>
    </template>

    <VaMenuItem @selected="alert">
      Option 1
    </VaMenuItem>
    <VaMenuItem @selected="alert">
      Option 2
    </VaMenuItem>
    <VaMenuItem @selected="alert">
      Option 2
    </VaMenuItem>
  </VaMenu>
</template>

<script setup lang="ts">
  const alert = (...args) => window.alert(...args)
</script>
