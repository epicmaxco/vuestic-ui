<template>
  <div
    class="va-progress-circle"
    ref="progress"
    :style="rootStyle"
    :class="rootClass"
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
import clamp from 'lodash/clamp'
import { useColors } from '../../services/color-config/color-config'
import { useSize, useSizeProps } from '../../composables/useSize'

export default defineComponent({
  name: 'VaProgressCircle',

  props: {
    ...useSizeProps,
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
    const colorComputed = computed(() => getColor(props.color))

    return {
      infoStyle: computed(() => ({ color: colorComputed.value })),
      rootStyle: computed(() => ({
        width: sizeComputed.value,
        height: sizeComputed.value,
      })),
      rootClass: computed(() => ({
        'va-progress-circle--indeterminate': props.indeterminate,
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
    position: var(--va-progress-circle-wrapper-position);
    top: var(--va-progress-circle-wrapper-top);
    left: var(--va-progress-circle-wrapper-left);
    bottom: var(--va-progress-circle-wrapper-bottom);
    right: var(--va-progress-circle-wrapper-right);
    margin: var(--va-progress-circle-wrapper-margin);
    transform: var(--va-progress-circle-wrapper-transform);
    width: var(--va-progress-circle-wrapper-width);
    height: var(--va-progress-circle-wrapper-height);

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
    font-size: var(--va-progress-circle-info-font-size);
    position: var(--va-progress-circle-info-position);
    left: var(--va-progress-circle-info-left);
    top: var(--va-progress-circle-info-top);
    transform: var(--va-progress-circle-info-transform);
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
