<template>
  <va-time-input
    v-model="value"
    :format="formatFn"
    view="seconds"
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
