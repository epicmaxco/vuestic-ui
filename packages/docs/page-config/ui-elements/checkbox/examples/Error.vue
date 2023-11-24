<template>
  <VaCheckbox
    v-model="value"
    error
    error-messages="Error message"
    label="Label"
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
