<template>
  <h6>Default</h6>
  <VaCarousel
    :items="items"
    stateful
    autoscroll
  >
    <template #default="{ index }">
      {{ index + 1 }}
    </template>
  </VaCarousel>

  <h6>Infinite</h6>
  <VaCarousel
    :items="items"
    stateful
    autoscroll
    infinite
  >
    <template #default="{ index }">
      {{ index + 1 }}
    </template>
  </VaCarousel>

  <h6>Slow</h6>
  <VaCarousel
    :items="items"
    stateful
    autoscroll
    :autoscroll-interval="3000"
  >
    <template #default="{ index }">
      {{ index + 1 }}
    </template>
  </VaCarousel>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      items: ["1", "2", "3", "4", "5"],
    };
  },
};
</script>

<style lang="scss">
.va-carousel__slide {
  font-size: 48px;
}
</style>
