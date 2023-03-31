<template>
  <Story title="va-button/tags">
    <va-button>Default</va-button>
    <va-button href="http://epic-spinners.epicmax.co/">A-link Button</va-button>
    <va-button to="/demo">Router-link Button</va-button>
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
