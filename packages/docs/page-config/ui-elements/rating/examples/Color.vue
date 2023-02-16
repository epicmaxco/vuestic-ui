<template>
  <va-rating
    v-model="value"
    class="mb-2"
    color="success"
  />
  <va-rating
    v-model="value"
    class="mb-2"
    color="info"
  />
  <va-rating
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
