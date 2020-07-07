<template>
  <span
    v-if="valueComputed"
    class="va-tag"
    :class="computedClass"
    :style="computedStyle"
    :tabindex="tagIndexComputed"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
    @focus="updateFocusState(true)"
    @blur="updateFocusState(false)"
  >
    <router-link
      v-if="hasRouterLinkParams"
      class="va-tag__link"
      :to="to"
    />
    <va-icon
      v-if="c_icon"
      class="va-tag__icon"
      :name="icon"
      :size="iconSize"
    />
    <span class="va-tag__content">
      <slot></slot>
    </span>
    <va-icon
      v-if="c_closeable"
      class="va-tag__close-icon"
      name="close"
      :size="iconSize"
      @click="close()"
    />
  </span>
</template>

<script lang="ts">
import VaIcon from '../va-icon/VaIcon.vue'
import {
  getBoxShadowColor,
  getHoverColor,
  getFocusColor,
} from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins, Watch } from 'vue-property-decorator'

const TagPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: true },
  closeable: { type: Boolean, default: false },
  color: { type: String, default: '' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
})

@Component({
  name: 'VaTag',
  components: { VaIcon },
})
export default class VaTag extends Mixins(
  KeyboardOnlyFocusMixin,
  RouterLinkMixin,
  StatefulMixin,
  ColorThemeMixin,
  TagPropsMixin,
) {
  hoverState = false
  focusState = false

  @Watch('hoverState')
  onHoverChange (value: boolean) {
    this.updateFocusState(value)
    this.updateHoverState(value)
  }

  get iconSize () {
    const size: any = {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
    }
    return size[this.c_size]
  }

  get tagIndexComputed () {
    return (this.c_disabled) ? -1 : 0
  }

  get computedClass () {
    return {
      'va-tag--small': this.c_size === 'small',
      'va-tag--large': this.c_size === 'large',
      'va-tag--square': this.c_square,
      'va-tag--disabled': this.c_disabled,
    }
  }

  get shadowStyle () {
    if (this.c_flat || this.c_outline) {
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
      if (this.c_outline || this.c_flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
        computedStyle.background = getFocusColor(this.colorComputed)
      }
    } else if (this.hoverState) {
      if (this.c_outline || this.c_flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
        computedStyle.background = getHoverColor(this.colorComputed)
      } else {
        computedStyle.boxShadow = this.shadowStyle
      }
    } else {
      computedStyle.color = this.c_flat || this.c_outline ? this.colorComputed : '#ffffff'
      computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
      computedStyle.boxShadow = this.shadowStyle
    }

    if (!this.c_outline && !this.c_flat) {
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
    if (!this.c_disabled) {
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

.va-tag {
  display: inline-flex;
  border: 0.125rem solid transparent;
  position: relative;
  border-radius: 2rem;
  width: auto;
  height: auto;
  min-width: initial;
  min-height: initial;
  margin: 0 0.1rem;
  padding: 0 0.3rem;
  color: $white;
  cursor: default;
  align-items: center;
  font-size: $tag-font-size-nrm;

  &:hover {
    opacity: 0.85;
  }

  &__link {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__content {
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    line-height: 1.6;
  }

  &__close-icon {
    cursor: pointer;
    z-index: 500;
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

  &--disabled {
    @include va-disabled;

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
