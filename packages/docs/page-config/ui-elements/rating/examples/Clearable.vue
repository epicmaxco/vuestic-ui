<template>
  <VaRating
    v-model="value"
    clearable
  />
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
};
</script>
