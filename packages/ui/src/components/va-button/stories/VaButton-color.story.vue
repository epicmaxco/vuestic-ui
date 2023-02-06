<template>
  <story title="va-button/color">
    <va-button color="info">Info</va-button>
    <va-button preset="primary" color="danger">Danger</va-button>
    <va-button preset="secondary" color="warning">Warning</va-button>
    <va-button preset="plain" color="success">Success</va-button>
    <va-button preset="plainOpacity" color="textPrimary">Dark</va-button>
  </story>
</template>

<script lang="ts" setup>
import { VaButton } from './../index'
</script>
