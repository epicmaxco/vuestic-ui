<template>
  <VaMenuList>
    <VaMenuItem @selected="alert">
      Option 1
    </VaMenuItem>
    <VaMenuItem @selected="alert">
      Option 2
    </VaMenuItem>
    <VaMenuItem @selected="alert">
      Option 2
    </VaMenuItem>
  </VaMenuList>
</template>

<script setup lang="ts">
  const alert = (...args) => window.alert(...args)
</script>
