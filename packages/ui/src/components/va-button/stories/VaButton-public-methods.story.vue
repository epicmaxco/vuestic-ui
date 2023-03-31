<template>
  <Story title="va-button/public-methods">
    <va-button @click="$refs.testButton.focus()">Focus Main Button</va-button>
    <va-button ref="testButton">Main Button</va-button>
    <va-button @click="$refs.testButton.blur()">Blur Main Button</va-button>
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
