<template>
  <div class="va-progress-bar">
    <div :style="{colorComputed}" class="va-progress-bar__info">
      <slot/>
    </div>
    <div class="va-progress-bar__progress-bar" :class="computedClass" :style="computedStyle">
      <div
        :style="{width: normalizedBuffer + '%', backgroundColor: colorComputed}"
        class="va-progress-bar__buffer"
      />
      <div
        v-if="!indeterminate"
        :style="{width: normalizedValue + '%', backgroundColor: colorComputed}"
        class="va-progress-bar__overlay"
      />
      <template v-else>
        <div
          :style="{backgroundColor: colorComputed, animationDirection: this.reverse ? 'reverse' : 'normal'}"
          class="va-progress-bar__overlay__indeterminate-start"
        />
        <div
          :style="{backgroundColor: colorComputed, animationDirection: this.reverse ? 'reverse' : 'normal'}"
          class="va-progress-bar__overlay__indeterminate-end"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { progressMixin } from './progressMixin'
import { normalizeValue } from '../../../../services/utils'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

export default {
  name: 'va-progress-bar',
  mixins: [progressMixin, ColorThemeMixin],
  props: {
    buffer: {
      type: Number,
      default: 100,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    size: {
      type: [Number, String],
      default: '0.5rem',
      validator: (value) => {
        return typeof value === 'number' || value.toString().match(/rem|em|ex|pt|pc|mm|cm|px/)
      },
    },
    reverse: {
      type: Boolean,
    },
  },
  computed: {
    normalizedBuffer () {
      if (this.indeterminate) {
        return 100
      }

      return normalizeValue(this.buffer)
    },
    computedClass () {
      return {
        'va-progress-bar__progress-bar__square': !this.rounded,
      }
    },
    computedStyle () {
      return {
        height: typeof this.size === 'number' ? `${this.size}px` : this.size,
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../../vuestic-sass/resources/resources";

.va-progress-bar {
  width: 100%;
  position: relative;
  overflow: hidden;

  &__info {
    font-size: $progress-value-font-size;
    font-weight: $font-weight-bold;
    text-align: center;
    text-transform: uppercase;

    &:not(:empty) {
      margin-bottom: 0.3125rem;
    }
  }

  &__progress-bar {
    position: relative;
    overflow: hidden;
    border-radius: $progress-bar-width-basic;

    &__square {
      border-radius: 0;
    }
  }

  &__buffer {
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    border-radius: inherit;
    opacity: 0.3;
    transition: width ease 2s;
  }

  &__overlay {
    height: inherit;
    border-radius: inherit;
    transition: width ease 2s;

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
