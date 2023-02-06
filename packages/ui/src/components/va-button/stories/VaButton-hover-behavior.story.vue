<template>
  <story title="va-button/hover-behavior">
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
  </story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
</script>
