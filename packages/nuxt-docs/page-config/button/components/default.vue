<template>
  <va-button>{{ text }}</va-button>
</template>

<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      default: 'Hello'
    }
  })
</script>