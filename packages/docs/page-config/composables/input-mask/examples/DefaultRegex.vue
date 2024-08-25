<template>
  <VaInput v-model="text" ref="vaInput" placeholder="Vuestic - 0000 - Vue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createRegexMask } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

useInputMask(createRegexMask(/Vuestic - \d\d\d\d - Vue/), vaInput)
</script>
