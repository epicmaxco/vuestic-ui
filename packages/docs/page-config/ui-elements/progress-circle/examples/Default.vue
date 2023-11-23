<template>
  <div class="flex flex-col gap-3">
    <VaProgressCircle v-model="value" />

    <VaSlider
      v-model="value"
      :track-label="(v) => `${v}%`"
      track-label-visible
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 65,
    };
  },
};
</script>
