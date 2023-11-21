<template>
  <VaSlider
    v-model="value1"
    label="label"
  />
  <VaSlider
    v-model="value2"
    label="inverted"
    invert-label
  />
  <VaSlider
    v-model="value3"
    label="danger"
    label-color="danger"
  />
</template>

<script>
export default {
  data() {
    return {
      value1: 37,
      value2: 73,
      value3: 53,
    };
  },
};
</script>
