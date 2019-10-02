<template>
  <div
    class="va-badge mr-2"
    :class="badgeClass"
    :style="badgeStyle"
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
  },
  computed: {
    badgeClass () {
      const self = this

      return {
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
  display: inline-block;
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
  min-height: ($chip-font-size-sm * $chip-line-height-sm) + ($chip-padding-y-sm * 2);
  max-height: ($chip-font-size-sm * $chip-line-height-sm) + ($chip-padding-y-sm * 2);
  overflow: hidden;

  .va-badge--multiline & {
    max-height: 100%;
    overflow: auto;
  }
}

.va-badge__title {
  margin: auto;
}

</style>
