<template>
  <Story title="va-button/outline">
    <va-button border-color="primary" preset="primary" icon="create">Secondary</va-button>
    <va-button border-color="primary" preset="secondary" iconRight="clear">Secondary</va-button>
    <va-button border-color="primary" preset="plain" icon="create" iconRight="clear">
      Secondary
    </va-button>
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
