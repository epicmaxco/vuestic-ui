<template>
  <VaChip
    v-for="(size, index) in sizes"
    :key="index"
    :size="size"
    class="mr-6 mb-2"
  >
    {{ size }} size
  </VaChip>
</template>

<script>
export default {
  data() {
    return {
      sizes: ["small", "medium", "large"],
    };
  },
};
</script>
