<template>
  <div class="va-progress-bar">
    <div
      :style="{colorComputed}"
      class="va-progress-bar__info"
    >
      <slot v-if="!large" />
    </div>
    <div
      class="va-progress-bar__wrapper"
      :class="computedClass"
      :style="computedStyle"
    >
      <div
        :style="{
          width: normalizedBuffer + '%',
          backgroundColor: colorComputed,
          ...(reverse ? { right: 0 } : { left: 0 })
        }"
        class="va-progress-bar__buffer"
      />
      <div
        v-if="!indeterminate"
        :style="{
          width: normalizedValue + '%',
          backgroundColor: colorComputed,
          ...(reverse && { 'margin-left': 'auto' })
        }"
        class="va-progress-bar__overlay"
      >
        <slot v-if="large" />
      </div>
      <template v-else>
        <div
          :style="{backgroundColor: colorComputed, animationDirection: reverse ? 'reverse' : 'normal'}"
          class="va-progress-bar__overlay__indeterminate-start"
        />
        <div
          :style="{backgroundColor: colorComputed, animationDirection: reverse ? 'reverse' : 'normal'}"
          class="va-progress-bar__overlay__indeterminate-end"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import { normalizeValue } from '../../services/utils'
import { ProgressComponentMixin } from './ProgressComponentMixin'
import ColorMixin from '../../services/color-config/ColorMixin'
import { SizeMixin } from '../../mixins/SizeMixin'

class ProgressBarProps {
  buffer = prop<number>({ type: Number, default: 100 })
  rounded = prop<boolean>({ type: Boolean, default: true })
  size = prop<string | number>({ type: [Number, String], default: 'medium' })
  reverse = prop<boolean>({ type: Boolean, default: false })
  color = prop<string>({ type: String, default: 'primary' })
}

const ProgressBarPropsMixin = Vue.with(ProgressBarProps)

@Options({
  name: 'VaProgressBar',
})
export default class VaProgressBar extends mixins(
  ProgressComponentMixin,
  ColorMixin,
  SizeMixin,
  ProgressBarPropsMixin,
) {
  get large () {
    return this.size === 'large'
  }

  get small () {
    return this.size === 'small'
  }

  get normalizedBuffer () {
    if (this.indeterminate) {
      return 100
    }

    return normalizeValue(this.buffer)
  }

  get computedClass () {
    return {
      'va-progress-bar__wrapper__square': (!this.rounded && !this.large) || this.small,
      'va-progress-bar__small': this.small,
      'va-progress-bar__large': this.large,
    }
  }

  get computedStyle () {
    if (this.size === 'medium') {
      return { height: '0.5rem' }
    }

    if (!this.small && !this.large) {
      return { height: typeof this.size === 'number' ? `${this.size}px` : this.size }
    }

    return {}
  }
}
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-progress-bar {
  width: var(--va-progress-bar-width);
  position: var(--va-progress-bar-position);
  overflow: var(--va-progress-bar-overflow);
  font-family: var(--va-font-family);

  &__small {
    height: var(--va-progress-bar-sm-height);
  }

  &__large {
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

  &__overlay {
    height: inherit;
    border-radius: inherit;
    transition: var(--va-progress-bar-transition);
    text-align: var(--va-progress-bar-text-align);
    color: var(--va-progress-bar-color);
    letter-spacing: var(--va-progress-bar-letter-spacing);
    line-height: var(--va-progress-bar-line-height);
    font-size: var(--va-progress-bar-font-size);
    font-weight: var(--va-progress-bar-font-weight);

    &__indeterminate-start {
      animation: va-progress-bar__overlay__indeterminate-start 2s ease-in infinite;
      position: absolute;
      height: inherit;
    }

    &__indeterminate-end {
      animation: va-progress-bar__overlay__indeterminate-end 2s ease-out 1s infinite;
      position: absolute;
      height: inherit;
    }
  }
}

@keyframes va-progress-bar__overlay__indeterminate-start {
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

@keyframes va-progress-bar__overlay__indeterminate-end {
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
