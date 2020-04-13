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
          {{ c_label }}
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { ColorThemeMixin, getColor } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const contextConfigMixin = makeContextablePropsMixin({
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
})

export default {
  name: 'VaBadge',
  mixins: [ColorThemeMixin, contextConfigMixin],
  computed: {
    isEmpty () {
      if (this.c_label || this.c_visibleEmpty || this.c_dot || this.$slots.badge) {
        return false
      }

      return true
    },
    isFloating () {
      return this.$slots.default || this.c_dot
    },
    badgeClass () {
      return {
        'va-badge--visible-empty': this.c_visibleEmpty,
        'va-badge--empty': this.isEmpty,
        'va-badge--dot': this.c_dot,
        'va-badge--multiLine': this.c_multiLine,
        'va-badge--floating': this.isFloating,
        'va-badge--left': this.c_left,
        'va-badge--bottom': this.c_bottom,
        'va-badge--overlap': this.c_overlap,
      }
    },
    badgeStyle () {
      return {
        color: getColor(this, this.c_textColor, '#ffffff'),
        borderColor: this.colorComputed,
        backgroundColor: this.colorComputed,
        opacity: this.c_transparent ? 0.5 : 1,
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
