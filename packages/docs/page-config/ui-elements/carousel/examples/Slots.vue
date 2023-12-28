<template>
  <VaCarousel
    v-model="value"
    :items="items"
    arrows
    indicators
  >
    <template #default="{ item }">
      <VaAvatar :src="item" />
    </template>

    <template #prev-arrow>
      <VaButton>Go back</VaButton>
    </template>

    <template #next-arrow>
      <VaButton>Go forward</VaButton>
    </template>

    <template #indicator="{ index }">
      <VaButton>{{ index }}</VaButton>
    </template>
  </VaCarousel>
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
