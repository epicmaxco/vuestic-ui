<template>
  <VaChip
    v-model="value"
    closeable
  >
    closeable chip
  </VaChip>
  <VaButton
    v-if="!value"
    @click="value = true"
  >
    show chip
  </VaButton>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
