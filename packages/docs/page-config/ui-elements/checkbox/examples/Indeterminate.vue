<template>
  <VaCheckbox
    v-model="value"
    indeterminate
  />
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
