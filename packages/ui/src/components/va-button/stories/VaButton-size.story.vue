<template>
  <Story title="va-button/size" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="small">
      <va-button size="small">Accent</va-button>
      <va-button size="small" preset="primary">Primary</va-button>
      <va-button size="small" preset="secondary">Secondary</va-button>
      <va-button size="small" preset="plain">Plain</va-button>
      <va-button size="small" preset="plainOpacity">Plain with opacity</va-button>
    </Variant>
    <Variant title="large">
      <va-button size="large">Accent (default)</va-button>
      <va-button size="large" preset="primary">Primary</va-button>
      <va-button size="large" preset="secondary">Secondary</va-button>
      <va-button size="large" preset="plain">Plain</va-button>
      <va-button size="large" preset="plainOpacity">Plain with opacity</va-button>
    </Variant>
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
