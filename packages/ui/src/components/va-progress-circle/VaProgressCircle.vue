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

<script lang="ts" setup>
import { computed } from 'vue'
import { clamp } from '../../utils/clamp'

import { useComponentPresetProp, useColors, useSize, useSizeProps, useTranslation, useTranslationProp } from '../../composables'

defineOptions({
  name: 'VaProgressCircle',
})

const props = defineProps({
  ...useSizeProps,
  ...useComponentPresetProp,
  modelValue: { type: [Number, String], default: 0 },
  indeterminate: { type: Boolean, default: false },
  thickness: { type: [Number, String], default: 0.06 },
  color: { type: String, default: 'primary' },
  ariaLabel: useTranslationProp('$t:progressState'),
})

const { getColor } = useColors()
const { sizeComputed } = useSize(props)

const cappedThickness = computed(() => clamp(Number(props.thickness), 0, 1) / 2 * 100)

const radius = computed(() => 20 - (20 * cappedThickness.value / 100))
const dasharray = computed(() => 2 * Math.PI * radius.value)
const dashoffset = computed(() => dasharray.value * (1 - clamp(Number(props.modelValue), 0, 100) / 100))
const colorComputed = computed(() => getColor(props.color, undefined, true))

const { tp } = useTranslation()

const infoStyle = computed(() => ({ color: colorComputed.value }))

const rootStyle = computed(() => ({
  width: sizeComputed.value,
  height: sizeComputed.value,
}))

const rootClass = computed(() => ({
  'va-progress-circle--indeterminate': props.indeterminate,
}))

const ariaAttributesComputed = computed(() => ({
  role: 'progressbar',
  'aria-label': tp(props.ariaLabel),
  'aria-valuenow': !props.indeterminate ? props.modelValue : undefined,
}))
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
        will-change: stroke-dasharray stroke-dashoffset;
        animation: va-progress-circle__wrapper--indeterminate 2s linear infinite;
      }
    }
  }

  &__overlay {
    transition: var(--va-progress-circle-overlay-transition);

    @at-root {
      .va-progress-circle--indeterminate & {
        will-change: stroke-dasharray stroke-dashoffset;
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
