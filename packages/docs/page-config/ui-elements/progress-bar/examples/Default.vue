<template>
  <div class="flex flex-col gap-3">
    <VaProgressBar :model-value="value" />
    <VaSlider
      v-model="value"
      track-label-visible
    />
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
