<template>
  <div
    class="va-progress-bar"
    :class="rootClass"
    :style="rooStyle"
    v-bind="ariaAttributesComputed"
  >
    <div
      v-if="!$props.contentInside"
      class="va-progress-bar__info"
    >
      <slot v-bind="{ value: $props.modelValue }">
        <template v-if="$props.showPercent">
          {{ $props.modelValue }}%
        </template>
      </slot>
    </div>

    <div class="va-progress-bar__wrapper" :style="wrapperStyle">
      <div class="va-progress-bar__buffer" :style="bufferStyle">
        <slot v-if="$props.contentInside" v-bind="{ value: $props.modelValue }">
          <template v-if="$props.showPercent">
            {{ $props.modelValue }}%
          </template>
        </slot>
      </div>

      <template v-if="indeterminate">
        <div
          class="va-progress-bar__progress--indeterminate-start"
          :style="intermediateStyle"
        />
        <div
          class="va-progress-bar__progress--indeterminate-end"
          :style="intermediateStyle"
        />
      </template>
      <div v-else class="va-progress-bar__progress" :style="progressStyle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useComponentPresetProp, useColors, useElementTextColor, useTranslation, useTranslationProp, ColorName } from '../../composables'
import { computed, PropType, StyleValue } from 'vue'
import { clamp } from '../../utils/clamp'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

defineOptions({
  name: 'VaProgressBar',
})

const props = defineProps({
  ...useComponentPresetProp,
  modelValue: { type: [Number, String], default: 0 },
  indeterminate: { type: Boolean, default: false },
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
  size: {
    type: [Number, String] as PropType<number | 'medium' | 'large' | 'small' | string>,
    default: 'medium',
  },
  buffer: { type: [Number, String], default: 100 },
  rounded: { type: Boolean, default: true },
  reverse: { type: Boolean, default: false },
  contentInside: { type: Boolean, default: false },
  showPercent: { type: Boolean, default: false },
  max: { type: [Number, String], default: 100 },
  ariaLabel: useTranslationProp('$t:progressState'),
})

const { getColor, getHoverColor } = useColors()
const colorComputed = computed(() => getColor(props.color))
const textColorComputed = useElementTextColor(colorComputed)

const isTextSize = computed(() => typeof props.size === 'string' && ['small', 'medium', 'large'].includes(props.size))

const getCSSHeight = () => {
  if (typeof props.size === 'number') { return `${props.size}px` }
  if (isTextSize.value) { return }

  return props.size
}

const { tp } = useTranslation()

const progressBarValue = computed(() => 100 / Number(props.max) * Number(props.modelValue))

const rootClass = computed(() => ({
  'va-progress-bar--square': !props.rounded,
  [`va-progress-bar--${props.size}`]: isTextSize.value,
}))

const rooStyle = computed(() => (({
  '--va-progress-bar-color': colorComputed.value,
  '--va-progress-bar-background-color': getHoverColor(colorComputed.value),
}) as StyleValue))

const wrapperStyle = computed(() => ({
  height: getCSSHeight(),
}))

const bufferStyle = computed(() => ({
  width: `${props.indeterminate ? 100 : clamp(Number(props.buffer), 0, 100)}%`,
  color: textColorComputed.value,
  [props.reverse ? 'right' : 'left']: 0,
}))

const progressStyle = computed(() => ({
  marginLeft: props.reverse ? 'auto' : undefined,
  width: `${clamp(progressBarValue.value, 0, 100)}%`,
}))

const intermediateStyle = computed(() => ({
  animationDirection: props.reverse ? 'reverse' : 'normal',
}))

const ariaAttributesComputed = computed(() => ({
  role: 'progressbar',
  'aria-label': tp(props.ariaLabel),
  'aria-valuenow': !props.indeterminate ? props.modelValue : undefined,
}))
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-progress-bar {
  $p: &;

  width: var(--va-progress-bar-width);
  position: relative;
  overflow: hidden;
  font-family: var(--va-font-family);
  line-height: var(--va-progress-bar-line-height);

  &__info {
    font-weight: var(--va-progress-bar-info-font-weight);
    text-align: var(--va-progress-bar-info-text-align);
    text-transform: var(--va-progress-bar-info-text-transform);

    &:not(:empty) {
      margin-bottom: var(--va-progress-bar-info-not-empty-margin-bottom);
    }
  }

  &__wrapper {
    position: relative;
    overflow: hidden;
    border-radius: var(--va-progress-bar-border-radius);

    #{$p}--small & {
      height: var(--va-progress-bar-sm-height);
    }

    #{$p}--medium & {
      height: var(--va-progress-bar-height);
    }

    #{$p}--large & {
      height: var(--va-progress-bar-lg-height);
    }
  }

  &--square &__wrapper {
    --va-progress-bar-border-radius: 0;
  }

  &__buffer {
    position: absolute;
    top: 0;
    height: inherit;
    border-radius: inherit;
    transition: var(--va-progress-bar-buffer-transition);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: var(--va-progress-bar-letter-spacing);
    font-size: var(--va-progress-bar-font-size);
    font-weight: var(--va-progress-bar-font-weight);
    background-color: var(--va-progress-bar-background-color);
  }

  &__progress {
    height: inherit;
    border-radius: inherit;
    transition: var(--va-progress-bar-transition);
    background-color: var(--va-progress-bar-color);

    &--indeterminate-start {
      background-color: var(--va-progress-bar-color);
      animation: va-progress-bar-indeterminate-start 2s ease-in infinite;
      position: absolute;
      height: inherit;
    }

    &--indeterminate-end {
      background-color: var(--va-progress-bar-color);
      animation: va-progress-bar-indeterminate-end 2s ease-out 1s infinite;
      position: absolute;
      height: inherit;
    }
  }
}

@keyframes va-progress-bar-indeterminate-start {
  0% {
    width: 10%;
    left: -10%;
  }

  50% {
    width: 100%;
    left: 100%;
  }

  100% {
    width: 100%;
    left: 100%;
  }
}

@keyframes va-progress-bar-indeterminate-end {
  0% {
    width: 100%;
    left: -100%;
  }

  50% {
    width: 10%;
    left: 100%;
  }

  100% {
    width: 10%;
    left: 100%;
  }
}
</style>
