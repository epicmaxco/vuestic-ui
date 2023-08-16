<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      :options="options"
      selected-top-shown
      multiple
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref(["one", "two", "three"]);

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
