<template>
  <h6>Default</h6>
  <va-carousel
    :items="items"
    stateful
    autoscroll
  >
    <template #default="{ index }">
      {{ index + 1 }}
    </template>
  </va-carousel>

  <h6>Infinite</h6>
  <va-carousel
    :items="items"
    stateful
    autoscroll
    infinite
  >
    <template #default="{ index }">
      {{ index + 1 }}
    </template>
  </va-carousel>

  <h6>Slow</h6>
  <va-carousel
    :items="items"
    stateful
    autoscroll
    :autoscroll-interval="3000"
  >
    <template #default="{ index }">
      {{ index + 1 }}
    </template>
  </va-carousel>
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
