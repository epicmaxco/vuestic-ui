<template>
  <div
    class="va-badge mr-2"
    :class="badgeClass"
    :style="badgeStyle"
  >
    <div class="va-badge__content d-flex">
      <div class="va-badge__content__title flex-center">
        <span v-if="label" class="va-badge__content__in">{{ label }}</span>
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
      type: String || Number,
      required: false,
    },
    textColor: {
      type: String,
      required: false,
    },
  },
  computed: {
    badgeClass () {
      return {
        'va-badge--outline': this.outline,
      }
    },
    badgeStyle () {
      const computedStyles = {
        borderColor: this.colorComputed,
        backgroundColor: this.colorComputed,
      }

      if (this.outline) {
        computedStyles.color = this.colorComputed
        computedStyles.backgroundColor = ''
      }

      if (this.textColor) {
        computedStyles.color = this.textColor
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

  &__content {

    &__title {
      margin: auto;
    }
  }

  &--outline {
    background-color: transparent;
  }
}
</style>
