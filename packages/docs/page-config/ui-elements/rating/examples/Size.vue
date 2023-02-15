<template>
  <va-rating
    v-model="value"
    class="mb-2"
    size="small"
  />
  <va-rating
    v-model="value"
    class="mb-2"
    size="large"
  />
  <va-rating
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
