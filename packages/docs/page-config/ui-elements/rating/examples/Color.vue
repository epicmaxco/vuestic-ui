<template>
  <VaRating
    v-model="value"
    class="mb-2"
    color="success"
  />
  <VaRating
    v-model="value"
    class="mb-2"
    color="info"
  />
  <VaRating
    v-model="value"
    color="danger"
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
