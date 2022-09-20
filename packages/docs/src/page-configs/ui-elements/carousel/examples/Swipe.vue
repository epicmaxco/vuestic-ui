<template>
  <va-carousel :items="items" stateful indicators infinite swipable />
</template>

<script setup lang="ts">
const items = [
  'https://picsum.photos/1500',
  'https://picsum.photos/1501',
  'https://picsum.photos/1502',
  'https://picsum.photos/1503',
  'https://picsum.photos/1504',
]
</script>
