<template>
  <div>
    <VaSlider
      v-model="value"
      class="mr-8"
      track-label-visible
      invert-track
      :track-label="'bigger than ' + value"
    />

  </div>
    <div
    class="flex flex-wrap justify-center h-48"
  >

    <VaSlider
      v-model="value"
      class="mr-8"
      vertical
      track-label-visible
      invert-track
      :track-label="'bigger than ' + value"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 25
    };
  },
};
</script>
