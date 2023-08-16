<template>
  <va-time-input
    v-model="value"
    :format="formatFn"
  />
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      formatFn: (d) => d?.toLocaleTimeString?.(),
    };
  },
};
</script>
