<template>
  <div class="inner-loading">
    <slot />
    <div
      v-if="$props.loading"
      class="inner-loading__overlay"
      aria-hidden="true"
    >
      <va-icon
        class="inner-loading__spinner"
        spin
        :color="colorComputed"
        :size="$props.size"
        :name="$props.icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { defineComponent, computed } from 'vue'

import { useColors, useLoadingProps } from '../../composables'
import { VaIcon } from '../va-icon'

export default defineComponent({
  name: 'VaInnerLoading',
  components: { VaIcon },
  props: {
    ...useLoadingProps,
    ...useComponentPresetProp,
    color: { type: String },
    icon: { type: String, default: 'autorenew' },
    size: { type: Number, default: 30 },
  },
  setup (props) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    return { colorComputed }
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
    z-index: 0;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: var(--inner-loading-overlay-background);
      opacity: 0.3;
      z-index: -1;
    }
  }
}
</style>
