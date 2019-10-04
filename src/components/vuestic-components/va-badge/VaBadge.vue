<template>
  <div
    class="va-badge mr-2"
    :class="badgeClass"
    :style="badgeStyle"
    v-if="!isEmpty"
  >
    <div class="va-badge__content d-flex">
      <div class="va-badge__content__title flex-center">
        <span v-if="label">{{ label }}</span>
        <slot v-if="!label" />
      </div>
    </div>
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
    label: {
      type: [String, Number],
      required: false,
    },
    textColor: {
      type: String,
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
  },
  computed: {
    isEmpty () {
      const self = this

      if (self.hasSlotContent || self.label || self.visibleEmpty || self.dot) {
        return false
      }

      return true
    },
    badgeClass () {
      const self = this

      return {
        'va-badge--empty': self.isEmpty,
        'va-badge--dot': self.dot,
        'va-badge--multiline': self.multiline,
        'va-badge--floating': self.$slots.float,
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
          const opacityNumber = parseInt(self.transparent)
          computedStyles.opacity = isNaN(opacityNumber) ? 1 : opacityNumber
        }
      }

      return computedStyles
    },
  },
  data () {
    return {
      hasSlotContent: false,
    }
  },
  methods: {
    checkForSlotContent () {
      const self = this

      let checkForContent = (hasContent, node) => {
        return (hasContent || node.tag || (node.text && node.text.trim()))
      }
      return Boolean(
        self.$slots.default &&
        self.$slots.default.reduce(checkForContent, false)
      )
    },
  },
  beforeUpdate () {
    const self = this
    self.hasSlotContent = self.checkForSlotContent()
  },
  created () {
    const self = this
    self.hasSlotContent = self.checkForSlotContent()
  },
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-badge {
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

  .va-badge-wrap & {
    position: absolute;
    z-index: 2;
    top: -($chip-font-size-sm - $chip-border-outline);
    margin-left: -($chip-padding-x-sm + $chip-border-outline);
    left: 100%;
  }

  .va-badge-wrap--left & {
    left: 0;
    margin-left: -($chip-padding-x-sm + $chip-border-outline);
  }

  .va-badge-wrap--bottom & {
    bottom: -($chip-font-size-sm + $chip-border-outline);
    top: auto;
  }
}

.va-badge__content__title {
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

.va-badge--dot {
  height: $chip-padding-x-sm;
  width: $chip-padding-x-sm;
  line-height: 0;
  padding: 0;
}
</style>
