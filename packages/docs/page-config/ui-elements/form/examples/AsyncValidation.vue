<template>
  <va-form ref="myForm">
    <va-progress-bar v-show="isLoading" indeterminate class="mb-2" />

    <va-input stateful label="Name" :rules="[asyncRule]" />
  </va-form>
</template>

<script setup lang="ts">
  import { useForm } from 'vuestic-ui'

  const { isLoading } = useForm('myForm')

  const asyncRule = (v: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v.length > 3 || 'Should be more than 3 symbols')
      }, 3000)
    })
  }
</script>