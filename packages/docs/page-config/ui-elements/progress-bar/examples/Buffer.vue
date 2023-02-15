<template>
  <div class="flex flex-col gap-2">
    <va-progress-bar
      :model-value="value"
      :buffer="bufferValue"
    />

    <va-slider
      v-model="value"
      track-label-visible
      :track-label="(v) => `${v}%`"
      label="Value:"
    />
    <va-slider
      v-model="bufferValue"
      track-label-visible
      :track-label="(v) => `${v}%`"
      label="Buffer:"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 35,
      bufferValue: 100,
    };
  },
};
</script>
