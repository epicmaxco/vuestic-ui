<template>
  <va-input
    v-model="text"
    bordered
    label="Input Name"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
</script>
