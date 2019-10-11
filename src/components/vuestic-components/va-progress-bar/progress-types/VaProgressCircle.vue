<template>
  <div class="va-progress-circle" ref="progress" :style="computedStyle" :class="computedClass">
    <svg class="va-progress-circle__progress-bar" viewBox="0 0 40 40">
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
    <div :style="{ color: colorComputed }" class="va-progress-circle__info">
      <slot/>
    </div>
  </div>
</template>

<script>
import { progressMixin } from './progressMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

export default {
  name: 'va-progress-circle',
  mixins: [progressMixin, ColorThemeMixin],
  props: {
    size: {
      type: [Number, String],
      default: 20,
    },
    thickness: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    radius () {
      return 20 - (20 * this.thickness / 100)
    },
    dasharray () {
      return 2 * Math.PI * this.radius
    },
    dashoffset () {
      return this.dasharray * (1 - this.normalizedValue / 100)
    },
    computedThickness () {
      return `${this.thickness}%`
    },
    computedStyle () {
      return {
        width: this.getDimensionLength(),
        height: this.getDimensionLength(),
      }
    },
    computedClass () {
      return {
        'va-progress-circle--indeterminate': this.indeterminate,
      }
    },
  },
  methods: {
    sizeAsNumber () {
      const size = parseFloat(this.size)

      if (Number.isNaN(size)) {
        this.throwSizeError()
      }

      return size
    },
    sizeUnits () {
      const units = typeof this.size === 'number' ? ['px'] : this.size.toString().match(/rem|em|ex|pt|pc|mm|cm|px/)

      if (!units) {
        this.throwSizeError()
      }

      return units[0]
    },
    getDimensionLength () {
      return Math.round(this.sizeAsNumber()) * 2 + this.sizeUnits()
    },
    throwSizeError () {
      throw new Error(`${this.size} is wrong size format. Use number or number + rem|em|ex|pt|pc|mm|cm instead.`)
    },
  },
}
</script>

<style lang="scss">
@import "../../../vuestic-sass/resources/resources";

.va-progress-circle {
  position: relative;

  &__progress-bar {
    transform: rotate(-90deg);
    stroke-linecap: center center;
    width: inherit;
    height: inherit;

    @at-root {
      .va-progress-circle--indeterminate & {
        animation: va-progress-circle__progress-bar--indeterminate 2s linear infinite;
      }
    }
  }

  &__overlay {
    transition: all ease 2s;
    @at-root {
      .va-progress-circle--indeterminate & {
        animation: va-progress-circle__overlay--indeterminate 2s ease-in-out infinite;
      }
    }
  }

  &__info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: $progress-value-font-size;
  }
}

@keyframes va-progress-circle__progress-bar--indeterminate {
  100% {
    transform: rotate(270deg);
  }
}

@keyframes va-progress-circle__overlay--indeterminate {
  0% {
    stroke-dasharray: 1, 125;
    stroke-dashoffset: 0px;
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
