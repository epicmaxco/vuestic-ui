<template>
  <div style="max-width: 300px;">
    <va-select
      v-model="value"
      :options="options"
      :max-visible-options="2"
      multiple
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref([]);

const options = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
</script>
