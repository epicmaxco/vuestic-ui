<script setup>
const props = defineProps({
  icon: String
})
</script>

<template>
  <button>
    <VcIcon v-if="icon" :icon="icon"></VcIcon>
    <slot />
  </button>
</template>
