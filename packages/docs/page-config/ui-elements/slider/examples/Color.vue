<template>
  <VaSlider
    v-model="value"
    color="success"
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
