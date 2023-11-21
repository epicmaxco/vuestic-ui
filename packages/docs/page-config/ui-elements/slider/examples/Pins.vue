<template>
  <VaSlider
    v-model="value"
    pins
    :step="10"
  />
</template>

<script>
export default {
  data() {
    return {
      value: 40,
    };
  },
};
</script>
