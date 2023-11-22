<template>
  <div class="flex flex-col gap-2">
    <VaProgressBar
      :model-value="value"
      :buffer="bufferValue"
    />

    <VaSlider
      v-model="value"
      track-label-visible
      :track-label="(v) => `${v}%`"
      label="Value:"
    />
    <VaSlider
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
