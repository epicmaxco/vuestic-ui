<template>
  <va-rating class="mb-2" v-model="value" size="small" />
  <va-rating class="mb-2" v-model="value" size="large" />
  <va-rating v-model="value" :size="40" />
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
