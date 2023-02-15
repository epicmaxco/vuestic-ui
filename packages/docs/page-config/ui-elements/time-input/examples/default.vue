<template>
  <va-time-input v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>
