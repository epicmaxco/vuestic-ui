<template>
  <div
    class="va-progress-circle"
    :style="rootStyle"
    :class="rootClass"
    v-bind="ariaAttributesComputed"
  >
    <svg
      class="va-progress-circle__wrapper"
      viewBox="0 0 40 40"
    >
      <circle
        class="va-progress-circle__overlay"
        cx="50%"
        cy="50%"
        :r="radius"
        fill="none"
        :stroke="colorComputed"
        :stroke-width="cappedThickness + '%'"
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
      />
    </svg>
    <div
      v-if="$slots.default"
      :style="infoStyle"
      class="va-progress-circle__info"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import clamp from 'lodash/clamp.js'

import { useComponentPresetProp, useColors, useSize, useSizeProps } from '../../composables'

export default defineComponent({
  name: 'VaProgressCircle',

  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    modelValue: { type: Number, default: 0 },
    indeterminate: { type: Boolean, default: false },
    thickness: { type: Number, default: 0.06 },
    color: { type: String, default: 'primary' },
  },

  setup (props) {
    const { getColor } = useColors()
    const { sizeComputed } = useSize(props)

    const cappedThickness = computed(() => clamp(props.thickness, 0, 1) / 2 * 100)

    const radius = computed(() => 20 - (20 * cappedThickness.value / 100))
    const dasharray = computed(() => 2 * Math.PI * radius.value)
    const dashoffset = computed(() => dasharray.value * (1 - clamp(props.modelValue, 0, 100) / 100))
    const colorComputed = computed(() => getColor(props.color, undefined, true))

    return {
      infoStyle: computed(() => ({ color: colorComputed.value })),
      rootStyle: computed(() => ({
        width: sizeComputed.value,
        height: sizeComputed.value,
      })),
      rootClass: computed(() => ({
        'va-progress-circle--indeterminate': props.indeterminate,
      })),
      ariaAttributesComputed: computed(() => ({
        role: 'progressbar',
        ariaLabel: 'progress state',
        ariaValuenow: !props.indeterminate ? props.modelValue : undefined,
      })),

      colorComputed,
      radius,
      dasharray,
      dashoffset,
      cappedThickness,
    }
  },
})
</script>

<style lang="scss">
  @import "../../styles/resources";
  @import "variables";

  .va-progress-circle {
    position: var(--va-progress-circle-position);
    overflow: var(--va-progress-circle-overflow); // Prevents resizing container back and forth.
    font-family: var(--va-font-family);

    &__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      transform: rotate(-90deg);
      width: var(--va-progress-circle-width);
      height: var(--va-progress-circle-height);

      @include flex-center();

      @at-root {
        .va-progress-circle--indeterminate & {
          animation: va-progress-circle__wrapper--indeterminate 2s linear infinite;
        }
      }
    }

    &__overlay {
      transition: var(--va-progress-circle-overlay-transition);

      @at-root {
        .va-progress-circle--indeterminate & {
          animation: va-progress-circle__overlay--indeterminate 2s ease-in-out infinite;
        }
      }
    }

    &__info {
      font-size: var(--va-progress-circle-font-size);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes va-progress-circle__wrapper--indeterminate {
    100% {
      transform: rotate(270deg);
    }
  }

  @keyframes va-progress-circle__overlay--indeterminate {
    0% {
      stroke-dasharray: 1, 125;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 125, 125;
      stroke-dashoffset: -65px;
    }

    100% {
      stroke-dasharray: 125, 125;
      stroke-dashoffset: -125px;
    }
  }
</style>
