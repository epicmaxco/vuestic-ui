<template>
  <VaInput v-model="text" ref="vaInput" placeholder="+380 (93) 000-00-00" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createRegexMask } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

useInputMask(createRegexMask(/(\+380 \(\d{2}\)|\d{3}) (\d){3}-\d\d-\d\d/), vaInput)
</script>
