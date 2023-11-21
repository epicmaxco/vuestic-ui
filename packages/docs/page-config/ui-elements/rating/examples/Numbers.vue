<template>
  <div class="flex flex-col lg6 xs12">
    <VaSlider
      v-model="length"
      :max="15"
    />
    <VaRating
      v-model="value"
      :max="length"
      numbers
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
      length: 5,
    };
  },
};
</script>
