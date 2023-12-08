<template>
  <VaMenuList>
    <VaMenuItem @selected="alert">
      Option 1
    </VaMenuItem>
    <VaMenuItem @selected="alert">
      Option 2
    </VaMenuItem>
    <VaDivider />
    <VaMenuItem @selected="alert">
      Option 3
    </VaMenuItem>
    <VaMenuItem @selected="alert">
      Option 4
    </VaMenuItem>
    <div>
      Custom divider
    </div>
    <VaMenuItem @selected="alert">
      Option 5
    </VaMenuItem>
  </VaMenuList>
</template>

<script setup lang="ts">
  const alert = (...args) => window.alert(...args)
</script>
