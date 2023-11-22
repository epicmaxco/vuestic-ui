<template>
  <VaDateInput
    v-model="value"
    manual-input
  />
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
