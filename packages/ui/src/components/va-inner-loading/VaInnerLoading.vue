<template>
  <div class="inner-loading">
    <slot />
    <div
      v-if="$props.loading"
      class="inner-loading__overlay"
    >
      <va-icon
        spin
        :color="$props.color"
        :size="$props.size"
        :name="$props.icon"
        class="inner-loading__spinner"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useLoadingProps } from '../../composables/useLoading'
import VaIcon from '../va-icon'

export default defineComponent({
  name: 'VaInnerLoading',
  components: { VaIcon },
  props: {
    ...useLoadingProps,
    color: { type: String as PropType<string>, default: '' },
    icon: { type: String as PropType<string>, default: 'loop' },
    size: { type: Number as PropType<number>, default: 30 },
  },
})
</script>

<style lang="scss">
@import "variables";

.inner-loading {
  position: var(--inner-loading-position);
  min-width: var(--inner-loading-min-width);
  width: var(--inner-loading-width);
  font-family: var(--va-font-family);

  &__overlay {
    display: var(--inner-loading-overlay-display);
    align-items: var(--inner-loading-overlay-align-items);
    justify-content: var(--inner-loading-overlay-justify-content);
    position: var(--inner-loading-overlay-position);
    top: var(--inner-loading-overlay-top);
    bottom: var(--inner-loading-overlay-bottom);
    width: var(--inner-loading-overlay-width);
    background: var(--inner-loading-overlay-background);
  }
}
</style>
