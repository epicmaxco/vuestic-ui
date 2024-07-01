<template>
  <VaInput v-model="text" ref="vaInput" placeholder="12304.4213" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createNumeralMask } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

useInputMask(createNumeralMask(), vaInput)
</script>
