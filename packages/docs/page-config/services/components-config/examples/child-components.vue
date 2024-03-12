<template>
  <VaDatePicker
    :child:prev-button="{ textColor: 'danger' }"
    :child:middle-button="{ textColor: 'info' }"
    :child:next-button="{ textColor: 'success' }"
  />
</template>

<script setup>
import { VaDatePicker } from 'vuestic-ui'
</script>
