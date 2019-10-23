<template>
  <div
    class="va-badge"
   :class="badgeClass"
  >
    <div
      class="va-badge__content-wrapper"
      :style="badgeStyle"
    >
      <div class="va-badge__content">
        <slot name="badge">
          {{ label  }}
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
    color: {
      type: String,
      default: 'danger',
    },
    textColor: {
      type: String,
      default: 'white',
    },
    label: {
      type: [String, Number],
      default: '',
    },
    overlap: {
      type: Boolean,
      default: false,
    },
    multiLine: {
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
      type: Boolean,
      default: false,
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
    isEmpty () {
      if (this.label || this.visibleEmpty || this.dot || this.$slots.badge) {
        return false
      }

      return true
    },
    isFloating () {
      return this.$slots.default || this.dot
    },
    badgeClass () {
      return {
        'va-badge--empty': this.isEmpty,
        'va-badge--dot': this.dot,
        'va-badge--multiLine': this.multiLine,
        'va-badge--floating': this.isFloating,
        'va-badge--left': this.left,
        'va-badge--bottom': this.bottom,
        'va-badge--overlap': this.overlap,
      }
    },
    badgeStyle () {
      const styles = {
        color: 'white',
        backgroundColor: 'black',
        borderColor: 'black',
        opacity: 1,
      }

      if (this._isEnableColorTheme) {
        styles.borderColor = this.colorComputed
        styles.backgroundColor = this.colorComputed

        if (this.textColor && this.$themes && this.$themes[this.textColor]) {
          styles.color = this.$themes[this.textColor]
        } else {
          styles.color = 'white'
        }

        if (this.transparent) {
          styles.opacity = 0.5
        }

        return styles
      }

      return {
        color: 'white',
        backgroundColor: 'black',
        borderColor: 'black',
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-badge {
  display: inline-flex;
  position: relative;

  &__content-wrapper {
    transition: $transition-secondary;
    display: inline-flex;
    padding: $badge-padding-y $badge-padding-x;
    border: solid $badge-border;
    border-radius: $badge-border-radius;
    font-size: $badge-font-size;
    font-weight: bold;
    font-family: $font-family-sans-serif;
    line-height: $badge-line-height;
    letter-spacing: $badge-letter-spacing;
    justify-content: center;
    white-space: nowrap;
    width: auto;
    height: auto;
    min-width: $badge-size;
    min-height: $badge-size;

    .va-badge--dot & {
      min-width: $badge-dot-size;
      min-height: $badge-dot-size;
      border-width: 0;
      border-radius: 100%;
      padding: 0;
    }

    .va-badge--empty & {
      width: 0;
      height: 0;
      min-width: 0;
      min-height: 0;
      border-width: 0;
    }

    .va-badge--multiLine & {
      white-space: normal;
    }

    .va-badge--floating & {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 100%;
      transform: translateX(0) translateY(-100%);
      padding: $badge-padding-y 0.15rem;
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

  &__content {
    margin: 0;
    text-transform: uppercase;
    overflow: hidden;
    max-height: $badge-font-size * $badge-line-height;

    .va-badge--multiLine & {
      max-height: 100%;
      overflow: auto;
    }

    .va-badge--dot & {
      display: none;
    }

    .va-badge--floating & {
      align-items: center;
    }
  }
}

</style>
