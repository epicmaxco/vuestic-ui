<template>
  <VaInput v-model="text" ref="vaInput" placeholder="#### #### #### ####" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createRegexMask } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

useInputMask(createRegexMask(/\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d/), vaInput)
</script>
