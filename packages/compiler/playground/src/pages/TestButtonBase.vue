<script setup lang="ts">
  import { VaButton } from 'vuestic-ui';

  const props = defineProps({
    testButtonBase: String
  })
</script>

<template>
  <VaButton
     :color="'myCustomColor'"
     color="info"
  >
    Test
  </VaButton>
</template>
