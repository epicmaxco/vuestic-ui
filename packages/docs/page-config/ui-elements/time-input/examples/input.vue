<template>
  <div class="flex gap-5 flex-wrap">
    <va-time-input
      v-model="value"
      manual-input
      class="mr-3"
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
