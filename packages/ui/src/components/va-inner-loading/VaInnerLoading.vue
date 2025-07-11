<template>
  <div
    class="va-inner-loading"
    aria-live="polite"
    :class="computedClass"
    v-bind="ariaAttributesComputed"
  >
    <slot />
    <div
      v-if="$props.loading"
      class="va-inner-loading__overlay"
      aria-hidden="true"
    >
      <slot name="loading">
        <va-icon
          class="va-inner-loading__spinner"
          spin="counter-clockwise"
          :color="colorComputed"
          :size="$props.size"
          :name="$props.icon"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useComponentPresetProp, useColors, useLoadableControlProps, ColorName } from '../../composables'
import { computed, PropType } from 'vue'

import { VaIcon, VaIconName } from '../va-icon'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

defineOptions({
  name: 'VaInnerLoading',
})

const props = defineProps({
  ...useLoadableControlProps,
  ...useComponentPresetProp,
  color: { type: String as PropType<StringWithAutocomplete<ColorName>> },
  icon: { type: String as PropType<StringWithAutocomplete<VaIconName>>, default: 'va-loading' },
  size: { type: [Number, String], default: 30 },
})

const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

const computedClass = computed(() => ({
  'va-inner-loading--active': props.loading,
}))

const ariaAttributesComputed = computed(() => ({
  'aria-busy': props.loading,
}))
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
