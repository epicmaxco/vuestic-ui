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
          {{ label }}
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaBadge',
  mixins: [ColorThemeMixin, ContextPluginMixin],
  props: {
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', 'danger')
      },
    },
    textColor: {
      type: String,
      default () {
        return getContextPropValue(this, 'textColor', 'white')
      },
    },
    label: {
      type: [String, Number],
      default () {
        return getContextPropValue(this, 'label', '')
      },
    },
    overlap: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'overlap', false)
      },
    },
    multiLine: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'multiLine', false)
      },
    },
    visibleEmpty: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'visibleEmpty', false)
      },
    },
    dot: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'dot', false)
      },
    },
    transparent: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'transparent', false)
      },
    },
    left: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'left', false)
      },
    },
    bottom: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'bottom', false)
      },
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
        'va-badge--visible-empty': this.visibleEmpty,
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

        if (this.$themes && this.$themes[this.textColor]) {
          styles.color = this.$themes[this.textColor]
        } else {
          styles.color = this.textColor
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
  vertical-align: bottom;

  &__content-wrapper {
    transition: $transition-secondary;
    display: inline-flex;
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
    min-width: initial;
    min-height: initial;
    margin: 0;

    .va-badge--visible-empty & {
      min-width: $badge-size;
      min-height: $badge-size;
    }

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
      transform: translateX(0) translateY(-50%);
    }

    .va-badge--overlap & {
      margin-left: -$badge-size/2;
      margin-right: 0;
      transform: translateY(-25%);
    }

    .va-badge--left & {
      left: 0;
      transform: translateX(-100%) translateY(-50%);
    }

    .va-badge--left.va-badge--overlap & {
      margin-left: $badge-size/2;
      transform: translateX(-100%) translateY(-25%);
    }

    .va-badge--bottom & {
      top: 100%;
      transform: translateX(0) translateY(-50%);
    }

    .va-badge--left.va-badge--bottom & {
      transform: translateX(-100%) translateY(-50%);
    }

    .va-badge--bottom.va-badge--overlap & {
      margin-left: -$badge-size/2;
      transform: translateX(0) translateY(-75%);
    }

    .va-badge--bottom.va-badge--left.va-badge--overlap & {
      margin-left: $badge-size/2;
      transform: translateX(-100%) translateY(-75%);
    }
  }

  &__content {
    margin: 0;
    text-transform: uppercase;
    overflow: hidden;
    min-width: $badge-font-size * $badge-line-height;
    padding: $badge-padding-y $badge-padding-x;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    text-overflow: clip;
    white-space: nowrap;

    .va-badge--multiLine & {
      overflow: auto;
      max-height: initial;
      text-align: initial;
      text-overflow: initial;
      white-space: normal;
    }

    .va-badge--dot & {
      display: none;
    }

    .va-badge--floating & {
      align-items: center;
      padding: $badge-padding-y 0.15rem;
    }
  }
}

</style>
