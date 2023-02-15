<template>
  <va-slider
    v-model="value"
    pins
  />
</template>

<script>
export default {
  data() {
    return {
      value: 45,
    };
  },
};
</script>
