<template>
  <div class="inner-loading">
    <slot />
    <div
      v-if="loading"
      class="inner-loading__overlay"
    >
      <va-icon
        spin
        :color="$themes.primary"
        :size="48"
        name="loop"
        class="inner-loading__spinner"
      />
    </div>
  </div>
</template>

<script>
import VaIcon from '../va-icon/VaIcon'

export default {
  name: 'VaInnerLoading',
  components: {
    VaIcon,
  },
  props: {
    loading: Boolean,
  },
}
</script>

<style lang="scss" scoped>
  .inner-loading {
    position: relative;
    min-width: 100%;

    &__overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.5);
    }
  }
</style>
