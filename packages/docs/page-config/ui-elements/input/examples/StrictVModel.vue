<template>
  <VaInput v-model="maskedValue" strict-bind-input-value />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const text = ref('')

  const maskedValue = computed({
    get() { return text.value },
    set(v) {
      text.value = v
        // Allow only numbers
        .replace(/[^0-9]/g, '')
        .slice(0, 5)
    }
  })
</script>
