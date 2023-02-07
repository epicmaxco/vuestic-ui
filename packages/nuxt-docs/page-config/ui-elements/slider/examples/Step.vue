<template>
  <va-slider v-model="value" :step="10" />
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
