<template>
  <div
    class="va-progress-circle"
    ref="progress"
    :style="computedStyle"
    :class="computedClass"
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
        :stroke-width="computedThickness"
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
      />
    </svg>
    <div
      :style="computedStyles"
      class="va-progress-circle__info"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, mixins, Vue, prop } from 'vue-class-component'

import { ProgressComponentMixin } from './ProgressComponentMixin'
import ColorMixin from '../../services/color-config/ColorMixin'
import { SizeMixin } from '../../mixins/SizeMixin'

class ProgressCircleProps {
  thickness = prop<number>({ type: Number, default: 0.06 })
  color = prop<string>({ type: String, default: 'primary' })
}

const ProgressCirclePropsMixin = Vue.with(ProgressCircleProps)

@Options({
  name: 'VaProgressCircle',
})
export default class VaProgressCircle extends mixins(
  ProgressComponentMixin,
  ColorMixin,
  SizeMixin,
  ProgressCirclePropsMixin,
) {
  get radius () {
    return 20 - (20 * this.cappedThickness / 100)
  }

  get dasharray () {
    return 2 * Math.PI * this.radius
  }

  get dashoffset () {
    return this.dasharray * (1 - this.normalizedValue / 100)
  }

  get computedThickness () {
    return `${this.cappedThickness}%`
  }

  get computedStyle () {
    return { width: this.sizeComputed, height: this.sizeComputed }
  }

  get computedClass () {
    return {
      'va-progress-circle--indeterminate': this.indeterminate,
    }
  }

  get computedStyles () {
    return {
      color: this.theme.getColor(this.color),
    }
  }

  get cappedThickness () {
    // value translated to percentage, divided in half, since final maximum value should be 50%
    if (this.thickness <= 0) {
      return 0
    } else if (this.thickness >= 1) {
      return 50
    } else {
      return this.thickness / 2 * 100
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/resources/resources";

.va-progress-circle {
  position: var(--va-progress-circle-position);
  overflow: var(--va-progress-circle-overflow); // Prevents resizing container back and forth.

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
