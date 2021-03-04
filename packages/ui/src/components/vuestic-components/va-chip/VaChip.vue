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
    :tabindex="indexComputed"
  >
    <div
      class="va-chip__inner"
      @mouseenter="updateHoverState(true)"
      @mouseleave="updateHoverState(false)"
      @focus="updateFocusState(true)"
      @blur="updateFocusState(false)"
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
import { Options, prop, mixins, Vue } from 'vue-class-component'

import { getBoxShadowColor, getHoverColor, getFocusColor } from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import VaIcon from '../va-icon'

class ChipProps {
  modelValue = prop<boolean>({ type: Boolean, default: true })
  closeable = prop<boolean>({ type: Boolean, default: false })
  color = prop<string>({ type: String, default: '' })
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
}

const ChipPropsMixin = Vue.with(ChipProps)

@Options({
  name: 'VaChip',
  components: { VaIcon },
  emits: ['focus'],
})
export default class VaChip extends mixins(
  KeyboardOnlyFocusMixin,
  RouterLinkMixin,
  StatefulMixin,
  ColorMixin,
  ChipPropsMixin,
) {
  hoverState = false
  focusState = false

  created () {
    watch(() => this.hoverState, (value) => {
      this.updateFocusState(value)
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
    if (this.flat || this.outline) {
      return
    }
    return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.colorComputed)
  }

  get computedStyle () {
    const computedStyle: any = {
      color: '',
      borderColor: '',
      background: '',
      boxShadow: '',
    }

    if (this.focusState) {
      if (this.outline || this.flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.outline ? this.colorComputed : ''
        computedStyle.background = getFocusColor(this.colorComputed)
      }
    } else if (this.hoverState) {
      if (this.outline || this.flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.outline ? this.colorComputed : ''
        computedStyle.background = getHoverColor(this.colorComputed)
      } else {
        computedStyle.boxShadow = this.shadowStyle
      }
    } else {
      computedStyle.color = this.flat || this.outline ? this.colorComputed : ''
      computedStyle.borderColor = this.outline ? this.colorComputed : ''
      computedStyle.boxShadow = !this.disabled && this.shadowStyle
    }

    if (!this.outline && !this.flat) {
      computedStyle.background = this.colorComputed
    }

    return computedStyle
  }

  updateHoverState (isHover: boolean) {
    this.hoverState = isHover
  }

  updateFocusState (isFocus: boolean) {
    this.focusState = isFocus
    if (isFocus) {
      this.isKeyboardFocused = isFocus
      this.KeyboardOnlyFocusMixin_onFocus()
      this.$emit('focus')
    }
  }

  close () {
    if (!this.disabled) {
      this.valueComputed = false
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

$tag-font-size-nrm: 1rem !default;
$tag-font-size-sm: 0.875rem !default;
$tag-font-size-lg: 1.25rem !default;

.va-chip {
  display: inline-flex;
  border: 0.125rem solid transparent;
  position: relative;
  border-radius: 2rem;
  width: auto;
  height: auto;
  min-width: initial;
  min-height: initial;
  padding: 0 0.3rem;
  color: $white;
  cursor: default;
  font-size: $tag-font-size-nrm;

  &__inner {
    display: flex;
    align-items: center;
  }

  &:hover {
    opacity: 0.85;
  }

  &__content {
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    line-height: 1.6;
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
    border-radius: 0.2rem;
  }

  &--small {
    height: 1.5rem;
    font-size: $tag-font-size-sm;
  }

  &--large {
    height: 2.5rem;
    font-size: $tag-font-size-lg;
  }

  &.va-chip--disabled {
    @include va-disabled;
  }
}
</style>
