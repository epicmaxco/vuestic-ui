<template>
  <story title="va-button/loading">
    <va-button :loading="buttonLoading" @click="buttonLoading = true">Start loading</va-button>
    <va-button preset="primary" :loading="buttonLoading" @click="buttonLoading = true">Start
      loading
    </va-button>
    <va-button @click="buttonLoading = false">Stop loading</va-button>
  </story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
import { ref } from 'vue'

const buttonLoading = ref(true)
</script>
