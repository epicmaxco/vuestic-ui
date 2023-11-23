<template>
  <div class="flex flex-col gap-3">
    <VaProgressBar
      :model-value="value"
      :max="max"
    />
    <VaSlider
      v-model="value"
      :max="max"
      track-label-visible
    />
    <VaInput
      v-model="max"
      label="Max value"
    />
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
