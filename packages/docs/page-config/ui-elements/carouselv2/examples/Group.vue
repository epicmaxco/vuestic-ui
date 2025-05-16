<template>
  <VaCarouselV2
    v-model="value"
  >
    <VaCarouselGroup>
      <div v-for="item in items" :key="item" class="w-1/2">
         <VaImage :src="item" class="h-96" :ratio="1" :draggable="false" />
      </div>
    </VaCarouselGroup>
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
        "https://picsum.photos/1505",
      ],
    };
  },
};
</script>
