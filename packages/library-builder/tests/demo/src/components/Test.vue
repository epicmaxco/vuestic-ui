<template>
  <h1>
    Hello World!
  </h1>
</template>

<script setup lang="ts">
  const color = 'red'
</script>

<style>
  h1 {
    color: v-bind(color);
  }
</style>