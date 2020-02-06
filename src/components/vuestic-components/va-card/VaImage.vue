<template>
  <div class="va-image">
    <img
      :src="src"
      :alt="alt"
    >
    <div
      v-if="overlay"
      class="va-image__overlay"
    />
  </div>
</template>

<script>
export default {
  name: 'VaImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    alt: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.va-image {
  padding-bottom: 56%;
  position: relative;
  height: auto;
  min-height: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>
