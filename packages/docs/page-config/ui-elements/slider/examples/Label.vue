<template>
  <va-slider
    v-model="value1"
    label="label"
  />
  <va-slider
    v-model="value2"
    label="inverted"
    invert-label
  />
  <va-slider
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
