<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-time-input
      v-model="value"
    />
    <va-time-input
      v-model="value"
      ampm
    />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
