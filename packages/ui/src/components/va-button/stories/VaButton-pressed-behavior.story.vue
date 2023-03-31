<template>
  <Story title="va-button/pressed-behavior">
    <va-button :backgroundOpacity="0.9" hoverBehavior="opacity" :hoverOpacity="0.4">
      Hover me
    </va-button>
    <va-button preset="primary" hoverBehavior="mask" hoverMaskColor="warning" :hoverOpacity="1">
      Hover me
    </va-button>
    <va-button preset="secondary" hoverBehavior="opacity" :hoverOpacity="0.4">
      Hover me
    </va-button>
    <va-button preset="plain" hoverBehavior="mask" hoverMaskColor="warning" :hoverOpacity="1">
      Hover me
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
