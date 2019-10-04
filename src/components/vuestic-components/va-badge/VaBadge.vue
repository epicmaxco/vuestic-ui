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
        <slot name="badge" v-if="!dot">
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
      const self = this

      return Boolean(self.$slots.default) || Boolean(self.$slots.badge)
    },
    isEmpty () {
      const self = this

      if (self.label || self.visibleEmpty || self.dot || self.isSlotted) {
        return false
      }

      return true
    },
    isFloating () {
      const self = this

      return self.isSlotted || (self.dot && self.label)
    },
    badgeClass () {
      const self = this

      return {
        'va-badge--empty': self.isEmpty,
        'va-badge--dot': self.dot,
        'va-badge--multiline': self.multiline,
        'va-badge--floating': self.isFloating,
        'va-badge--left': self.left,
        'va-badge--bottom': self.bottom,
      }
    },
    badgeStyle () {
      const self = this

      const computedStyles = {
        borderColor: self.colorComputed,
        backgroundColor: self.colorComputed,
      }

      if (self.outline) {
        computedStyles.color = self.colorComputed
        computedStyles.backgroundColor = 'transparent'
      }

      if (self.textColor) {
        computedStyles.color = self.textColor
      }

      if (self.transparent !== null && self.transparent !== undefined) {
        // TODO: need to add lodash
        if (!self.transparent) {
          // if transparent is equal empty string
          computedStyles.opacity = 0.5
        } else {
          const opacityNumber = Number(self.transparent)

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

  .va-badge--floating & {
    position: absolute;
    z-index: 2;
    top: -50%;
    left: 100%;
  }

  .va-badge--overlap & {
    margin-left: -($chip-padding-x-sm + $chip-border-outline);
  }

  .va-badge--dot & {
    height: $chip-padding-x-sm;
    width: $chip-padding-x-sm;
    line-height: 0;
    padding: 0;
  }

  .va-badge--left & {
    left: 0;
    margin-left: -($chip-padding-x-sm + $chip-border-outline);
  }

  .va-badge--bottom & {
    bottom: -($chip-font-size-sm + $chip-border-outline);
    top: auto;
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
    display: none;
  }
}

.va-badge--empty {
  height: ($chip-font-size-sm * $chip-line-height-sm);
  width: ($chip-font-size-sm * $chip-line-height-sm);
  padding: 2px;
}

</style>
