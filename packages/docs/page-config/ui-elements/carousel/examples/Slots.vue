<template>
  <va-carousel
    v-model="value"
    :items="items"
    arrows
    indicators
  >
    <template #default="{ item }">
      <va-avatar :src="item" />
    </template>

    <template #prev-arrow>
      <va-button>Go back</va-button>
    </template>

    <template #next-arrow>
      <va-button>Go forward</va-button>
    </template>

    <template #indicator="{ index }">
      <va-button>Go to slide {{ index }}</va-button>
    </template>
  </va-carousel>
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
