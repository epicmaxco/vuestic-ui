<template>
  <div class="flex flex-col lg6 xs12">
    <va-slider
      v-model="length"
      :max="15"
    />
    <va-rating
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
