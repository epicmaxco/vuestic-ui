<template>
  <VaHover v-model="value">
    <VaButton
      color="success"
      :preset="value ? 'primary' : 'secondary'"
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
