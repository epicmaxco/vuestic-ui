<template>
  <VaFormField v-model="formFieldValue" :rules="[(v) => v.length >= 2 || 'Min length is 2 characters']">
    <template #default="{ value }">
      <input v-model="value.ref" placeholder="Write here..." class="border-2 border-sold border-grey-300 px-2">
    </template>

    <template #message="{ messages }">
      {{ messages }}
    </template>
  </VaFormField>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formFieldValue = ref('')
</script>
