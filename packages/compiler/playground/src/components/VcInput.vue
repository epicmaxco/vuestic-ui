<script setup lang="ts">
defineProps({
  placeholder: String,
  label: String
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="$props.label" class="text-gray-700 text-xs font-medium uppercase">{{ $props.label }}</label>
    <input
      :placeholder="placeholder"
      class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
    />
  </div>
</template>
