<template>
  <VaForm ref="myForm" class="flex flex-col gap-2">
    <VaProgressBar v-show="isLoading" indeterminate />

    <VaInput stateful label="Name" :rules="[(v) => !!v || 'Required']" />

    <VaInput stateful label="Phone" :rules="[asyncRule, (v) => !!v || 'Required']" />

    <VaButton :loading="isLoading" :disabled="isLoading || !isValid">
      Send
    </VaButton>
  </VaForm>
</template>

<script setup lang="ts">
  import { useForm } from 'vuestic-ui'

  const { isLoading, isValid } = useForm('myForm')

  const asyncRule = (v: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v.length > 3 || 'Should be more than 3 symbols')
      }, 3000)
    })
  }
</script>