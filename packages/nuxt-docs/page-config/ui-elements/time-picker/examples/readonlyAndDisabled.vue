<template>
  <div class="flex gap-5 flex-wrap">
    <va-time-picker
      v-model="value"
      readonly
    />
    <va-divider vertical />
    <va-time-picker
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
