<template>
  <div class="flex flex-col gap-3">
    <va-progress-bar :model-value="value" />
    <va-slider v-model="value" track-label-visible />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 35,
    };
  },
};
</script>
