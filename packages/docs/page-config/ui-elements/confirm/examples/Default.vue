<template>
  <va-button @click="onButtonClick">Show confirm</va-button>
</template>

<script setup lang="ts">
  import { useModal } from 'vuestic-ui'

  const { confirm } = useModal()
  const onButtonClick =  () => {
    confirm('Are you sure you want to see standard alert?')
      .then((ok) => ok && alert('This is standard browser alert'))
  }
</script>