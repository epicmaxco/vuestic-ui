<template>
  <VaSlider
    v-model="value1"
    icon-append="home"
  />
  <VaSlider
    v-model="value2"
    icon-prepend="home"
  />
</template>

<script>
export default {
  data() {
    return {
      value1: 45,
      value2: 45,
    };
  },
};
</script>
