<template>
  <VaRating
    v-model="value"
    class="mb-2"
    size="small"
  />
  <VaRating
    v-model="value"
    class="mb-2"
    size="large"
  />
  <VaRating
    v-model="value"
    :size="40"
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
