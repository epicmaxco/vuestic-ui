<template>
  <va-date-picker v-model="value" />
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
