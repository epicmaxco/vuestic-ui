<template>
  <va-form ref="myForm" class="flex flex-col gap-2">
    <va-progress-bar v-show="isLoading" indeterminate />

    <va-input stateful label="Name" :rules="[(v) => !!v || 'Required']" />

    <va-input stateful label="Phone" :rules="[asyncRule, (v) => !!v || 'Required']" />

    <va-button :loading="isLoading" :disabled="isLoading || !isValid">Send</va-button>
  </va-form>
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