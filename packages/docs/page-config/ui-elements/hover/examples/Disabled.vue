<template>
  <VaHover
    v-model="value"
    disabled
  >
    <VaButton
      preset="secondary"
      :border-color="value ? 'primary' : ''"
    >
      {{ value }}
    </VaButton>
  </VaHover>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
