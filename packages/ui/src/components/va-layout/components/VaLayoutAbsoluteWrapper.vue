<template>
  <div class="va-layout__absolute-area-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
.va-layout {
  // Wrapper is responsible for positioning correctly absolute areas
  &__absolute-area-wrapper {
    .va-layout__area {
      position: absolute;

      &--top {
        width: 100%;
      }

      &--bottom {
        width: 100%;
      }

      &--right {
        right: 0;
        height: 100%;
      }

      &--left {
        left: 0;
        height: 100%;
      }
    }
  }
}
</style>
