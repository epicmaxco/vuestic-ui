<template>
  <div class="va-progress-bar" :class="rootClass" :style="rootStyle">
    <div v-if="!isLarge" class="va-progress-bar__info">
      <slot />
    </div>
    <div class="va-progress-bar__wrapper">
      <div class="va-progress-bar__buffer" :style="bufferStyle" />

      <template v-if="indeterminate">
        <div
          :style="intermediateStyle"
          class="va-progress-bar__progress--indeterminate-start"
        />
        <div
          :style="intermediateStyle"
          class="va-progress-bar__progress--indeterminate-end"
        />
      </template>
      <div v-else class="va-progress-bar__progress" :style="progressStyle">
        <slot v-if="isLarge" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import clamp from 'lodash/clamp'
import { computed, defineComponent, PropType } from 'vue'
import { useColors } from '../../services/color-config/color-config'

type VaProgressSize = 'medium' | 'large' | 'small';

export default defineComponent({
  name: 'VaProgressBar',

  props: {
    modelValue: { type: Number, default: 0 },
    indeterminate: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    size: {
      type: [Number, String] as PropType<number | VaProgressSize>,
      default: 'medium',
    },
    buffer: { type: Number, default: 100 },
    rounded: { type: Boolean, default: true },
    reverse: { type: Boolean, default: false },
  },

  setup (props) {
    const { getColor } = useColors()

    const isLarge = computed(() => props.size === 'large')
    const isTextSize = computed(() => typeof props.size === 'string' && ['small', 'medium', 'large'].includes(props.size))

    const getCSSHeight = () => {
      if (typeof props.size === 'number') { return `${props.size}px` }
      if (isTextSize.value) { return }

      return props.size
    }

    return {
      isLarge,

      rootClass: computed(() => ({
        'va-progress-bar': true,
        'va-progress-bar--square': !props.rounded,
        [`va-progress-bar--${props.size}`]: isTextSize.value,
      })),

      rootStyle: computed(() => ({
        height: getCSSHeight(),
      })),

      bufferStyle: computed(() => ({
        width: `${props.indeterminate ? 100 : clamp(props.buffer, 0, 100)}%`,
        backgroundColor: getColor(props.color),
        [props.reverse ? 'right' : 'left']: 0,
      })),

      progressStyle: computed(() => ({
        width: `${clamp(props.modelValue, 0, 100)}%`,
        backgroundColor: getColor(props.color),
        marginLeft: props.reverse ? 'auto' : undefined,
      })),

      intermediateStyle: computed(() => ({
        backgroundColor: getColor(props.color),
        animationDirection: props.reverse ? 'reverse' : 'normal',
      })),
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-progress-bar {
  width: var(--va-progress-bar-width);
  position: var(--va-progress-bar-position);
  overflow: var(--va-progress-bar-overflow);
  font-family: var(--va-font-family);
  height: var(--va-progress-bar-height);

  &--small {
    height: var(--va-progress-bar-sm-height);
  }

  &--large {
    height: var(--va-progress-bar-lg-height);
  }

  &__info {
    font-weight: var(--va-progress-bar-info-font-weight);
    text-align: var(--va-progress-bar-info-text-align);
    text-transform: var(--va-progress-bar-info-text-transform);

    &:not(:empty) {
      margin-bottom: 0.3125rem;
    }
  }

  &__wrapper {
    position: var(--va-progress-bar--wrapper-position);
    overflow: var(--va-progress-bar--wrapper-overflow);
    border-radius: var(--va-progress-bar--wrapper-border-radius);
    height: inherit;

    &__square {
      border-radius: var(--va-progress-bar-square-border-radius);
    }
  }

  &__buffer {
    position: var(--va-progress-bar-buffer-position);
    top: var(--va-progress-bar-buffer-top);
    height: inherit;
    border-radius: inherit;
    opacity: var(--va-progress-bar-buffer-opacity);
    transition: var(--va-progress-bar-buffer-transition);
  }

  &__progress {
    height: inherit;
    border-radius: inherit;
    transition: var(--va-progress-bar-transition);
    text-align: var(--va-progress-bar-text-align);
    color: var(--va-progress-bar-color);
    letter-spacing: var(--va-progress-bar-letter-spacing);
    line-height: var(--va-progress-bar-line-height);
    font-size: var(--va-progress-bar-font-size);
    font-weight: var(--va-progress-bar-font-weight);

    &--indeterminate-start {
      animation: va-progress-bar-indeterminate-start 2s ease-in infinite;
      position: absolute;
      height: inherit;
    }

    &--indeterminate-end {
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
