<template>
  <va-carousel
    v-model="value"
    :items="items"
    vertical
    arrows
    indicators
  />
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      items: [
        "https://picsum.photos/1500",
        "https://picsum.photos/1501",
        "https://picsum.photos/1502",
        "https://picsum.photos/1503",
        "https://picsum.photos/1504",
        "https://picsum.photos/1505",
      ],
    };
  },
};
</script>
