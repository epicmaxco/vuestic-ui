<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-time-input
      v-model="value"
      manual-input
    />
    <va-time-input
      v-model="value"
      ampm
      manual-input
    />
  </div>
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
