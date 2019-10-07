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
          {{ label }}
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

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
    circle: {
      type: Boolean,
      default: true,
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
  },
  computed: {
    isSlotted () {
      return Boolean(this.$slots.default) || Boolean(this.$slots.badge)
    },
    isEmpty () {
      if (this.label || this.visibleEmpty || this.dot || this.$slots.badge) {
        return false
      }

      return true
    },
    isFloating () {
      return this.isSlotted || (this.dot && this.label)
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
        'va-badge--circle': this.circle,
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
        // TODO: need to add lodash
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
  transition: 0.3s ease-in-out;
  display: inline-flex;
  padding: $chip-padding-y-sm $chip-padding-x-sm;
  color: $white;
  border: solid $chip-border-outline;
  border-radius: $chip-border-radius-sm;
  font-size: $chip-font-size-sm;
  font-weight: bold;
  font-family: $font-family-sans-serif;
  line-height: $chip-line-height-sm;
  letter-spacing: $chip-letter-spacing-sm;
  white-space: nowrap;
  width: auto;
  height: auto;
  min-width: $chip-font-size-sm * $chip-line-height-sm + $chip-border-outline * 2;

  .va-badge--circle & {
    padding: 0;
    text-align: center;
    justify-content: center;
  }

  .va-badge--dot & {
    height: $chip-padding-x-sm;
    width: $chip-padding-x-sm;
    line-height: 0;
    padding: 0;
    min-width: auto;
  }

  .va-badge--empty & {
    height: ($chip-font-size-sm * $chip-line-height-sm);
    width: ($chip-font-size-sm * $chip-line-height-sm);
  }

  .va-badge--floating & {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 100%;
    transform: translateY(-100%);
  }

  .va-badge--overlap & {
    margin-left: 0;
    margin-right: 0;
    transform: translateX(-50%) translateY(-50%);
  }

  .va-badge--left & {
    left: 0;
    margin-left: -($chip-padding-x-sm + $chip-border-outline) * 2;
  }

  .va-badge--left.va-badge--overlap & {
    transform: translateX(-50%) translateY(-50%);
    margin-left: 0;
  }

  .va-badge--bottom & {
    top: 100%;
    margin-top: 0;
    transform: translateX(0) translateY(0);
  }

  .va-badge--bottom.va-badge--overlap & {
    transform: translateX(-50%) translateY(-50%);
  }
}

.va-badge__badge__content {
  transition: 0.3s ease-in-out;
  margin: auto;
  text-transform: uppercase;
  max-height: ($chip-font-size-sm * $chip-line-height-sm);
  min-height: ($chip-font-size-sm * $chip-line-height-sm);
  line-height: $chip-line-height-sm;
  overflow: hidden;

  .va-badge--multiline & {
    max-height: 100%;
    overflow: auto;
  }

  .va-badge--dot & {
    //display: none; // not used with transition
    width: 0;
    height: 0;
    min-height: 0;
    max-height: 0;
    line-height: 0;
    font-size: 0;
  }

  .va-badge--circle & {
    overflow: visible;
    text-align: center;
  }
}

</style>
