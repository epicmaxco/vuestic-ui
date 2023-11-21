<script setup lang="ts">
  const scriptText = `  import { ref } from 'vue'

  const msg = ref('')`

  const templateText = `  <h1 class="va-h1">{{ msg }}</h1>
  <VaInput v-model="msg" />`
</script>

<template>
  <ClientOnly>
    <Play
      :script="scriptText"
      :template="templateText"
    />
  </ClientOnly>
</template>
