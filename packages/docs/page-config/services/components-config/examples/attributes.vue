<template>
  <VaConfig
    :components="{
      VaAlert: {
        style: 'outline: 2px solid var(--va-primary)',
        class: 'my-custom-alert',
        icon: 'info',
        dense: true,
      }
    }
    "
  >
    <VaAlert>
      Test alert!
    </VaAlert>
  </VaConfig>
</template>

<script setup>
import { VaConfig, VaAlert } from 'vuestic-ui'
</script>

<style>
.my-custom-alert {
  background: linear-gradient(90deg, #ff8a00 0%, #e52e71 100%);
}
</style>
