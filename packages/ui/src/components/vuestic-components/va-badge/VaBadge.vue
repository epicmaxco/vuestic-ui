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
    <slot/>
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
@import 'variables';

.va-badge {
  display: inline-flex;
  position: relative;

  &__text-wrapper {
    transition: var(--va-badge-text-wrapper-transition, var(--secondary-transition));
    display: var(--va-badge-text-wrapper-display);
    border: var(--va-badge-text-wrapper-border, var(--primary-control-border));
    border-radius: var(--va-badge-text-wrapper-border-radius);
    font-size: var(--va-badge-text-wrapper-font-size);
    font-weight: var(--va-badge-text-wrapper-font-weight);
    font-family: var(--va-badge-text-wrapper-font-family, var(--primary-font-family));
    line-height: var(--va-badge-text-wrapper-line-height);
    letter-spacing: var(--va-badge-text-wrapper-letter-spacing, var(--primary-letter-spacing));
    justify-content: var(--va-badge-text-wrapper-justify-content);
    white-space: var(--va-badge-text-wrapper-white-space);
    width: var(--va-badge-text-wrapper-width);
    height: var(--va-badge-text-wrapper-height);
    min-width: var(--va-badge-text-wrapper-min-width);
    min-height: var(--va-badge-text-wrapper-min-height);
    margin: var(--va-badge-text-wrapper-margin);

    .va-badge--visible-empty & {
      min-width: var(--va-badge-size);
      min-height: var(--va-badge-size);
    }

    .va-badge--dot & {
      min-width: var(--va-badge-dot-size);
      min-height: var(--va-badge-dot-size);
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
      margin-left: calc(-1 * var(--va-badge-overlap));
      margin-right: 0;
      transform: translateY(-25%);
    }

    .va-badge--left & {
      left: 0;
      transform: translateX(-100%) translateY(-50%);
    }

    .va-badge--left.va-badge--overlap & {
      margin-left: var(--va-badge-overlap);
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
      margin-left: calc(-1 * var(--va-badge-overlap));
      transform: translateX(0) translateY(-75%);
    }

    .va-badge--bottom.va-badge--left.va-badge--overlap & {
      margin-left: var(--va-badge-overlap);
      transform: translateX(-100%) translateY(-75%);
    }
  }

  &__text {
    margin: var(--va-badge-margin);
    text-transform: var(--va-badge-text-transform);
    overflow: hidden;
    min-width: calc(var(--va-badge-font-size) * var(--va-badge-line-height));
    padding: var(--va-badge-text-py) var(--va-badge-text-px);
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
      padding: var(--va-badge-py) 0.15rem;
    }
  }
}

</style>
