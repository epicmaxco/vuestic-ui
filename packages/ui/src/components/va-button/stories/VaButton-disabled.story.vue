<template>
  <story title="va-button/disabled">
    <va-button disabled>Accent (default)</va-button>
    <va-button preset="primary" disabled>Primary</va-button>
    <va-button preset="secondary" disabled>Secondary</va-button>
    <va-button preset="plain" disabled>Plain</va-button>
    <va-button preset="plainOpacity" disabled>Plain with opacity</va-button>
  </story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
</script>
