<script setup lang="ts">
import { VaDropdown } from '..'
</script>

<template>
  <VaDropdown>
    <template #anchor>
      <button>Click me</button>
    </template>
    <template #default>
      <div>Dropdown content</div>
    </template>
  </VaDropdown>
</template>

<style lang="scss" scoped>
div {
  color: red;
}

button {
  border: 1px solid red;
}
</style>
