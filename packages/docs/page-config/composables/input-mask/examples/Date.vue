<template>
  <VaInput v-model="text" ref="vaInput" placeholder="YYYY/MM/DD" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createDateMask } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

useInputMask(createDateMask(), vaInput)
</script>
