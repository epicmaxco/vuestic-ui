<template>
  <div class="flex gap-5 flex-wrap">
    <VaTimePicker
      v-model="value"
      readonly
    />
    <VaDivider vertical />
    <VaTimePicker
      v-model="value"
      disabled
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
