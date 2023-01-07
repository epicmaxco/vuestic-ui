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
  <h3>
    {{ tie(text) }}
  </h3>
</template>
