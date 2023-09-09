<template>
  <va-date-input
    v-model:is-open="isOpen"
    :label="`Is open value = ${isOpen}`"
    placeholder="Select a date"
  />
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
