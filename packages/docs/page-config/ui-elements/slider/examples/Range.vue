<template>
  <va-slider
    v-model="value"
    range
  />
</template>

<script>
export default {
  data() {
    return {
      value: [45, 65],
    };
  },
};
</script>
