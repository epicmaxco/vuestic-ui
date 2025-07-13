<template>
  <VaCarouselV2
    v-model="value"
    :swipable="false"
  >
    <div v-for="item in items" :key="item" class="h-96 w-full">
      <VaImage :src="item" class="h-96" :ratio="1" :draggable="false" />
    </div>
  </VaCarouselV2>
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
