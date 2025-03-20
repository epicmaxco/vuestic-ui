<script setup>
const props = defineProps({
  items: Array
})
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>
