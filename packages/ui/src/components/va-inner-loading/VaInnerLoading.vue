<template>
  <div class="va-inner-loading" :class="computedClass" v-bind="ariaAttributesComputed">
    <slot />
    <div
      v-if="$props.loading"
      class="va-inner-loading__overlay"
      aria-hidden="true"
    >
      <va-icon
        class="va-inner-loading__spinner"
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

    return {
      colorComputed,
      computedClass: computed(() => ({
        'va-inner-loading--active': props.loading,
      })),
      ariaAttributesComputed: computed(() => ({
        'aria-live': 'polite',
        'aria-busy': props.loading,
      })),
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-inner-loading {
  position: var(--va-inner-loading-position);
  min-width: var(--va-inner-loading-min-width);
  width: var(--va-inner-loading-width);
  font-family: var(--va-font-family);

  &--active {
    pointer-events: none;
  }

  &__overlay {
    display: var(--va-inner-loading-overlay-display);
    align-items: var(--va-inner-loading-overlay-align-items);
    justify-content: var(--va-inner-loading-overlay-justify-content);
    position: var(--va-inner-loading-overlay-position);
    top: var(--va-inner-loading-overlay-top);
    bottom: var(--va-inner-loading-overlay-bottom);
    width: var(--va-inner-loading-overlay-width);
    z-index: 0;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: var(--va-inner-loading-overlay-background);
      opacity: 0.3;
      z-index: -1;
    }
  }
}
</style>
