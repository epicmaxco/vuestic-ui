<template>
  <h6>On click</h6>
  <va-carousel :items="items" v-model="value" indicators />

  <h6>On hover</h6>
  <va-carousel
    :items="items"
    v-model="value"
    indicators
    indicatorTrigger="hover"
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
      ],
    };
  },
};
</script>
