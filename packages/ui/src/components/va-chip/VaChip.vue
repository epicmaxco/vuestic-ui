<template>
  <component
    v-if="valueComputed"
    class="va-chip"
    :is="tagComputed"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="computedClass"
    :style="computedStyle"
  >
    <div
      class="va-chip__inner"
      v-on="SetupContext.keyboardFocusListeners"
      @focus="$emit('focus')"
      @mouseenter="updateHoverState(true)"
      @mouseleave="updateHoverState(false)"
      :tabindex="indexComputed"
    >
      <va-icon
        v-if="icon"
        class="va-chip__icon"
        :name="icon"
        :size="iconSize"
      />
      <span class="va-chip__content">
        <slot></slot>
      </span>
      <va-icon
        v-if="closeable"
        class="va-chip__close-icon"
        name="close"
        :size="iconSize"
        @click.stop="close()"
      />
    </div>
  </component>
</template>

<script lang="ts">
import { watch } from 'vue'
import { Options, prop, mixins, setup, Vue } from 'vue-class-component'

import {
  getBoxShadowColor,
  getHoverColor,
  getFocusColor, getTextColor,
} from '../../services/color-config/color-functions'
import ColorMixin from '../../services/color-config/ColorMixin'
import { RouterLinkMixin } from '../../mixins/RouterLinkMixin/RouterLinkMixin'
import { StatefulMixin } from '../../mixins/StatefulMixin/StatefulMixin'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'
import VaIcon from '../va-icon'

class ChipProps {
  modelValue = prop<boolean>({ type: Boolean, default: true })
  closeable = prop<boolean>({ type: Boolean, default: false })
  color = prop<string>({ type: String, default: 'primary' })
  outline = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  icon = prop<string>({ type: String, default: '' })
  disabled = prop<boolean>({ type: Boolean, default: false })
  square = prop<boolean>({ type: Boolean, default: false })
  tag = prop<string>({ type: String, default: 'span' })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  })
  shadow = prop<boolean>({ type: Boolean, default: false })
}

const ChipPropsMixin = Vue.with(ChipProps)

@Options({
  name: 'VaChip',
  components: { VaIcon },
  emits: ['focus'],
})
export default class VaChip extends mixins(
  RouterLinkMixin,
  StatefulMixin,
  ColorMixin,
  ChipPropsMixin,
) {
  SetupContext = setup(() => {
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    return {
      hasKeyboardFocus,
      keyboardFocusListeners,
    }
  })

  hoverState = false
  focusState = false

  created () {
    watch(() => this.hoverState, (value) => {
      this.updateHoverState(value)
    })
  }

  get iconSize () {
    const size: any = {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
    }
    return size[this.size]
  }

  get indexComputed () {
    return this.disabled ? -1 : 0
  }

  get computedClass () {
    return {
      'va-chip--small': this.size === 'small',
      'va-chip--large': this.size === 'large',
      'va-chip--square': this.square,
      'va-chip--disabled': this.disabled,
    }
  }

  get shadowStyle () {
    if (!this.shadow || this.flat || this.outline || this.disabled || this.SetupContext.hasKeyboardFocus) {
      return
    }
    return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.colorComputed)
  }

  get computedStyle () {
    const borderColor = this.outline ? this.colorComputed : ''
    const computedStyle = {
      color: this.colorComputed,
      borderColor,
      background: '',
      boxShadow: this.shadowStyle,
    }

    if (this.outline || this.flat) {
      if (this.SetupContext.hasKeyboardFocus) {
        computedStyle.background = getFocusColor(this.colorComputed)
      } else if (this.hoverState) {
        computedStyle.background = getHoverColor(this.colorComputed)
      }
    } else {
      computedStyle.color = getTextColor(this.colorComputed)
      computedStyle.background = this.colorComputed
    }
    return computedStyle
  }

  updateHoverState (isHover: boolean) {
    this.hoverState = isHover
  }

  close () {
    if (!this.disabled) {
      this.valueComputed = false
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-chip {
  display: var(--va-chip-display);
  border: var(--va-chip-border, var(--va-control-border));
  position: var(--va-chip-position);
  border-radius: var(--va-chip-border-radius);
  width: var(--va-chip-width);
  height: var(--va-chip-height);
  min-width: var(--va-chip-min-width);
  min-height: var(--va-chip-min-height);
  padding: var(--va-chip-padding);
  color: var(--va-chip-color);
  cursor: var(--va-chip-cursor);
  font-size: var(--va-chip-font-size);

  &__inner {
    display: var(--va-chip-inner-display);
    align-items: var(--va-chip-inner-align-items);
    width: var(--va-chip-inner-width);
  }

  &:hover {
    opacity: var(--va-chip-hover-opacity);
  }

  &__content {
    display: var(--va-chip-content-display);
    justify-content: var(--va-chip-content-justify-content);
    align-items: var(--va-chip-content-align-items);
    padding: var(--va-chip-content-padding);
    line-height: var(--va-chip-content-line-height);
    width: var(--va-chip-content-width);
  }

  &__close-icon {
    cursor: pointer;

    /* z-index: 500; */

    @at-root {
      .va-chip--disabled {
        .va-chip__close-icon {
          cursor: default !important;
        }
      }
    }
  }

  &--square {
    border-radius: var(--va-chip-square-border-radius, var(--va-square-border-radius));
  }

  &--small {
    height: var(--va-sm-chip-height);
    font-size: var(--va-sm-chip-font-size);
  }

  &--large {
    height: var(--va-lg-chip-height);
    font-size: var(--va-lg-chip-font-size);
  }

  &.va-chip--disabled {
    @include va-disabled;
  }
}
</style>
