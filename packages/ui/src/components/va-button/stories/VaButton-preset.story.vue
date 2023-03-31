<template>
  <Story title="va-button/preset">
    <va-button>Accent (default)</va-button>
    <va-button preset="primary">Primary</va-button>
    <va-button preset="secondary">Secondary</va-button>
    <va-button preset="plain">Plain</va-button>
    <va-button preset="plainOpacity">Plain with opacity</va-button>
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
