<template>
  <button>
    Click me!
  </button>
</template>

<script setup lang="ts">
  const color = 'red'
</script>

<style>
  h1 {
    color: v-bind(color);
  }
</style>