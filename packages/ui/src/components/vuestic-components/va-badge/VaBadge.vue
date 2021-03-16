<template>
  <div
    class="va-badge"
    :class="badgeClass"
  >
    <span
      class="va-badge__text-wrapper"
      :style="badgeStyle"
    >
      <span class="va-badge__text">
        <slot name="text">
          {{ text }}
        </slot>
      </span>
    </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, mixins, Vue, prop } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'

class BadgeProps {
  color = prop<string>({ type: String, default: 'danger' })
  textColor = prop<string>({ type: String, default: 'white' })
  text = prop<string | number>({ type: [String, Number], default: '' })
  overlap = prop<boolean>({ type: Boolean, default: false })
  multiLine = prop<boolean>({ type: Boolean, default: false })
  visibleEmpty = prop<boolean>({ type: Boolean, default: false })
  dot = prop<boolean>({ type: Boolean, default: false })
  transparent = prop<boolean>({ type: Boolean, default: false })
  left = prop<boolean>({ type: Boolean, default: false })
  bottom = prop<boolean>({ type: Boolean, default: false })
}

const BadgePropsMixin = Vue.with(BadgeProps)

@Options({
  name: 'VaBadge',
})
export default class VaBadge extends mixins(
  ColorMixin,
  BadgePropsMixin,
) {
  get isEmpty () {
    return !(this.text || this.visibleEmpty || this.dot || this.$slots.text)
  }

  get isFloating () {
    return this.$slots.default || this.dot
  }

  get badgeClass () {
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
  }

  get badgeStyle () {
    return {
      color: this.theme.getColor(this.textColor, '#ffffff'),
      borderColor: this.colorComputed,
      backgroundColor: this.colorComputed,
      opacity: this.transparent ? 0.5 : 1,
    }
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-badge {
  display: inline-flex;
  position: relative;
  $badge-overlap: $badge-size/3;

  &__text-wrapper {
    transition: $transition-secondary;
    display: inline-flex;
    border: solid $badge-border;
    border-radius: $badge-border-radius;
    font-size: $badge-font-size;
    font-weight: $font-weight-bold;
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
      margin-left: -$badge-overlap;
      margin-right: 0;
      transform: translateY(-25%);
    }

    .va-badge--left & {
      left: 0;
      transform: translateX(-100%) translateY(-50%);
    }

    .va-badge--left.va-badge--overlap & {
      margin-left: $badge-overlap;
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
      margin-left: -$badge-overlap;
      transform: translateX(0) translateY(-75%);
    }

    .va-badge--bottom.va-badge--left.va-badge--overlap & {
      margin-left: $badge-overlap;
      transform: translateX(-100%) translateY(-75%);
    }
  }

  &__text {
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
