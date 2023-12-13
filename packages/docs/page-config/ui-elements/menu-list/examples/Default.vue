<template>
  <VaMenuList
    :options="['Option 1', 'Option 2', 'Option 3']"
    @selected="(v) => alert(v)"
  />
</template>

<script setup>
  const alert = (...args) => window.alert(...args)
</script>
