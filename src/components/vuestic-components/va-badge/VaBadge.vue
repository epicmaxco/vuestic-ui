<template>
  <div
    class="va-badge"
   :class="badgeClass"
  >
    <div
      class="va-badge__badge mr-2"
      :style="badgeStyle"
      v-if="!isEmpty"
    >
      <div class="va-badge__badge__content">
        <slot name="badge">
          {{ formattedLabel  }}
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import approximateNumber from 'approximate-number'

export default {
  name: 'va-badge',
  mixins: [ColorThemeMixin],
  props: {
    outline: {
      type: Boolean,
    },
    color: {
      type: String,
      default: 'success',
    },
    textColor: {
      type: String,
      required: false,
    },
    label: {
      type: [String, Number],
      required: false,
    },
    overlap: {
      type: Boolean,
      required: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    visibleEmpty: {
      type: Boolean,
      default: false,
    },
    dot: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: [String, null],
      default: null,
    },
    left: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    approximateNumber: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isEmpty () {
      if (this.label || this.visibleEmpty || this.dot || this.$slots.badge) {
        return false
      }

      return true
    },
    isFloating () {
      return this.$slots.default || this.dot
    },
    isNumber () {
      return !isNaN(Number(this.label))
    },
    formattedLabel () {
      if (this.isEmpty) {
        return null
      }

      if (this.approximateNumber && this.isNumber) {
        return approximateNumber(Number(this.label))
      }

      return this.label
    },
    badgeClass () {
      return {
        'va-badge--empty': this.isEmpty,
        'va-badge--dot': this.dot,
        'va-badge--multiline': this.multiline,
        'va-badge--floating': this.isFloating,
        'va-badge--left': this.left,
        'va-badge--bottom': this.bottom,
        'va-badge--overlap': this.overlap,
      }
    },
    badgeStyle () {
      const computedStyles = {
        borderColor: this.colorComputed,
        backgroundColor: this.colorComputed,
      }

      if (this.outline) {
        computedStyles.color = this.colorComputed
        computedStyles.backgroundColor = 'transparent'
      }

      if (this.textColor) {
        computedStyles.color = this.textColor
      }

      if (this.transparent !== null && this.transparent !== undefined) {
        // TODO: need to add lodash isNil
        if (!this.transparent) {
          // if transparent is equal empty string
          computedStyles.opacity = 0.5
        } else {
          const opacityNumber = Number(this.transparent)

          computedStyles.opacity = isNaN(opacityNumber) ? 1 : opacityNumber
        }
      }

      return computedStyles
    },
  },
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-badge {
  display: inline-flex;
  position: relative;
}

.va-badge__badge {
  transition: $transition-secondary;
  display: inline-flex;
  padding: $badge-padding-y $badge-padding-x;
  color: $white;
  border: solid $badge-border;
  border-radius: $badge-border-radius;
  font-size: $badge-font-size;
  font-weight: bold;
  font-family: $font-family-sans-serif;
  line-height: $badge-line-height;
  letter-spacing: $badge-letter-spacing;
  white-space: nowrap;
  width: auto;
  height: auto;
  min-width: $badge-font-size * $badge-line-height + $badge-border * 2;

  .va-badge--dot & {
    height: $badge-padding-x;
    width: $badge-padding-x;
    line-height: 0;
    /*padding: 0;*/
    min-width: auto;
  }

  .va-badge--empty & {
    height: ($badge-font-size * $badge-line-height);
    width: ($badge-font-size * $badge-line-height);
  }

  .va-badge--floating & {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 100%;
    padding: 0;
    transform: translateX(0) translateY(-100%);
  }

  .va-badge--overlap & {
    margin-left: 0;
    margin-right: 0;
    transform: translateX(-50%) translateY(-50%);
  }

  .va-badge--left & {
    left: 0;
    transform: translateX(-100%) translateY(-100%);
  }

  .va-badge--left.va-badge--overlap & {
    transform: translateX(-50%) translateY(-50%);
  }

  .va-badge--bottom & {
    top: 100%;
    margin-top: 0;
    transform: translateX(0) translateY(0);
  }

  .va-badge--left.va-badge--bottom & {
    transform: translateX(-100%);
  }

  .va-badge--bottom.va-badge--overlap & {
    transform: translateX(-50%) translateY(-50%);
  }
}

.va-badge__badge__content {
  margin: auto;
  text-transform: uppercase;
  max-height: ($badge-font-size * $badge-line-height);
  min-height: ($badge-font-size * $badge-line-height);
  line-height: $badge-line-height;
  overflow: hidden;

  .va-badge--multiline & {
    max-height: 100%;
    overflow: auto;
  }

  .va-badge--dot & {
    display: none;
  }

  .va-badge--floating & {
    overflow: visible;
    align-items: center;
  }
}

</style>
