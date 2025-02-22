<script setup lang="ts">
const props = defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <input :placeholder="$props.placeholder" class="w-full p-2 border rounded">

  </input>
</template>
