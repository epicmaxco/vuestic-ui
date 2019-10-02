<template>
  <div
    class="va-badge mr-2"
    :class="badgeClass"
    :style="badgeStyle"
    v-if="isShow"
  >
    <div class="va-badge__content d-flex">
      <div class="va-badge__content__title flex-center">
        <span v-if="label">{{ label }}</span>
        <slot v-if="!label"/>
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
      type: [ String, Number ],
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
  },
  computed: {
    isEmpty () {
      const self = this

      return Boolean(!self.$slots.default && !self.label)
    },
    isShow () {
      const self = this

      return Boolean(!self.isEmpty || self.visibleEmpty || self.dot)
    },
    badgeClass () {
      const self = this

      return {
        'va-badge--empty': self.isEmpty,
        'va-badge--dot': self.dot,
        'va-badge--multiline': self.multiline,
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

      return computedStyles
    },
  },
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-badge {
  display: inline-flex;
  padding: $chip-padding-y-sm $chip-padding-x-sm;
  color: $white;
  border: solid $chip-border-outline;
  border-radius: $chip-border-radius-sm;
  font-size: $chip-font-size-sm;
  font-weight: bold;
  font-family: $font-family-sans-serif;
  text-transform: uppercase;
  line-height: $chip-line-height-sm;
  letter-spacing: $chip-letter-spacing-sm;
  white-space: nowrap;
}

.va-badge__content__title {
  max-height: ($chip-font-size-sm * $chip-line-height-sm);
  overflow: hidden;

  .va-badge--multiline & {
    max-height: 100%;
    overflow: auto;
  }
}

.va-badge__title {
  margin: auto;
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
