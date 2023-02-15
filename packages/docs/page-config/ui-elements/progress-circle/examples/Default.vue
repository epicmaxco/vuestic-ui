<template>
  <div class="flex flex-col gap-3">
    <va-progress-circle v-model="value" />

    <va-slider
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
