<template>
  <VaColorPalette
    v-model="value"
    :palette="[
      '#154EC1',
      '#767C88',
      '#262824',
      '#FFFFFF',
      '#FFD43A',
      '#E42222',
    ]"
  />
</template>

<script>
export default {
  data() {
    return {
      value: "#FF00FF",
    };
  },
};
</script>
