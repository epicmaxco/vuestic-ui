<script setup>
const props = defineProps({
  placeholder: String
})
</script>

<template>
  <input :placeholder="placeholder" />
</template>
