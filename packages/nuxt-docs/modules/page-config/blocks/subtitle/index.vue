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
  <h3>
    {{ t(text) }}
  </h3>
</template>
