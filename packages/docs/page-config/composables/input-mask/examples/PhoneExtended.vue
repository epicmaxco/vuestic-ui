<template>
  <VaInput ref="vaInput" v-model="text" placeholder="+380 (93) 000-00-00" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaInput, useInputMask, createRegexMask } from 'vuestic-ui'

const text = ref('')
const vaInput = ref()

const ukrPhoneMask = createRegexMask(/\+380 \(\d{2}\) (\d){3}-\d\d-\d\d/)
const usPhoneMask = createRegexMask(/\+1 \(\d{3}\) (\d){3}-\d\d-\d\d/)
const nationalPhoneMask = createRegexMask(/\+(380|1) /)

useInputMask({
  format(text) {
    if (text.startsWith('+380')) {
      return ukrPhoneMask.format(text)
    }
    if (text.startsWith('+1')) {
      return usPhoneMask.format(text)
    }

    return nationalPhoneMask.format(text)
  },
  unformat(text, tokens) {
    if (text.startsWith('+380')) {
      return ukrPhoneMask.unformat(text, tokens)
    }
    if (text.startsWith('+1')) {
      return usPhoneMask.unformat(text, tokens)
    }

    return nationalPhoneMask.unformat(text, tokens)
  },
  handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, text, data) {
    if (text.startsWith('+380')) {
      return ukrPhoneMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, text, data)
    }
    if (text.startsWith('+1')) {
      return usPhoneMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, text, data)
    }

    return nationalPhoneMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, text, data)
  },
  reverse: false,
}, vaInput)
</script>
