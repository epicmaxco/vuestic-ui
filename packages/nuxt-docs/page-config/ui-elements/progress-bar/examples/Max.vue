<template>
  <div class="flex flex-col gap-3">
    <va-progress-bar :model-value="value" :max="max" />
    <va-slider v-model="value" :max="max" track-label-visible />
    <va-input v-model="max" label="Max value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      max: 50,
      value: 35,
    };
  },
};
</script>
