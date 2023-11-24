<template>
  <VaSlider
    v-model="value3"
    track-label-visible
    :min="15"
    :max="75"
  />
</template>

<script>
export default {
  data() {
    return {
      value1: 45,
      value2: 45,
      value3: 45,
    };
  },
};
</script>
