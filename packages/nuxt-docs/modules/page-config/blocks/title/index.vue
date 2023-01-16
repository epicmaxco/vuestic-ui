<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const { t } = useI18n()
</script>

<template>
  <h1>
    {{ t(text) }}
  </h1>
</template>
