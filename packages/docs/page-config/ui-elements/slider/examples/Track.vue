<template>
  <VaSlider
    v-model="value1"
    track-color="warning"
  />
  <VaSlider
    v-model="value2"
    :show-track="false"
  />
</template>

<script>
export default {
  data() {
    return {
      value1: 45,
      value2: 54,
    };
  },
};
</script>
