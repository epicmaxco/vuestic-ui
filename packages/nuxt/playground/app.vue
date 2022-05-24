<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <va-switch v-model="value" />
    <va-checkbox v-model="value" />
    <va-button>Button</va-button>
  </div>
</template>

<script setup>
const value = ref(true)
</script>
