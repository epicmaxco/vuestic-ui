<template>
  <VaInput v-model="text" ref="vaInput" placeholder="Vuestic - 0000 - Vue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createMaskFromRegex } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

useInputMask(createMaskFromRegex(/Vuestic - \d\d\d\d - Vue/), vaInput)
</script>
