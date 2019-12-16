<template>
  <div class="va-progress-bar">
    <div
      :style="{colorComputed}"
      class="va-progress-bar__info"
    >
      <slot v-if="!large" />
    </div>
    <div
      class="va-progress-bar__progress-bar"
      :class="computedClass"
      :style="computedStyle"
    >
      <div
        :style="{width: normalizedBuffer + '%', backgroundColor: colorComputed}"
        class="va-progress-bar__buffer"
      />
      <div
        v-if="!indeterminate"
        :style="{width: normalizedValue + '%', backgroundColor: colorComputed}"
        class="va-progress-bar__overlay"
      >
        <slot v-if="large" />
      </div>
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
import { makeContextablePropsMixin } from '../../../context-test/context-provide/ContextPlugin'
import { SizeMixin } from '../../../../mixins/SizeMixin'

const FormContextMixin = makeContextablePropsMixin({
  color: {
    type: String,
    default: 'primary',
  },
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
    default: 'medium',
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})

export default {
  name: 'VaProgressBar',
  mixins: [progressMixin, ColorThemeMixin, FormContextMixin, SizeMixin],
  computed: {
    large () {
      return this.size === 'large'
    },
    small () {
      return this.size === 'small'
    },
    normalizedBuffer () {
      if (this.indeterminate) {
        return 100
      }

      return normalizeValue(this.buffer)
    },
    computedClass () {
      return {
        'va-progress-bar__progress-bar__square': (!this.rounded && !this.large) || this.small,
        'va-progress-bar__small': this.small,
        'va-progress-bar__large': this.large,
      }
    },
    computedStyle () {
      if (this.size === 'medium') {
        return { height: '0.5rem' }
      }

      if (!this.small && !this.large) {
        return { height: typeof this.size === 'number' ? `${this.size}px` : this.size }
      }

      return {}
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

  &__small {
    height: $progress-bar-small-height;
  }

  &__large {
    height: $progress-bar-large-height;
  }

  &__info {
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
    text-align: center;
    color: $white;
    letter-spacing: 0.6px;
    line-height: $progress-bar-large-height;
    font-size: $progress-bar-large-font-size;
    font-weight: 700;

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
