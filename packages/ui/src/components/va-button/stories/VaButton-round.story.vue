<template>
  <Story title="va-button/round">
    <va-button round>Label</va-button>
    <va-button round icon="block" />
    <va-button preset="primary" round icon="block" />
    <va-button preset="primary" border-color="warning" round>Label</va-button>
  </Story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
</script>

<style scoped>
.va-button + .va-button {
  margin-left: 1rem;
}
</style>
