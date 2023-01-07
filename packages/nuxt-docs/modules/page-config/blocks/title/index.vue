<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <h1>
    {{ tie(text) }}
  </h1>
</template>
