<template>
  <component
    :is="tagComputed"
    v-if="valueComputed"
    :href="href"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    class="va-tag"
    :class="computedClass"
    :style="computedStyle"
    :tabindex="indexComputed"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
    @focus="updateFocusState(true)"
    @blur="updateFocusState(false)"
  >
    <va-icon
      v-if="icon"
      class="va-tag__icon"
      :name="icon"
      :size="iconSize"
    />
    <span class="va-tag__content">
      <slot></slot>
    </span>
    <va-icon
      v-if="closeable"
      class="va-tag__close-icon"
      name="close"
      :size="iconSize"
      @click.stop="close()"
    />
  </component>
</template>

<script lang="ts">
import { Component, Mixins, Watch, Prop } from 'vue-property-decorator'

import VaIcon from '../va-icon/VaIcon.vue'

import {
  getBoxShadowColor,
  getHoverColor,
  getFocusColor,
} from '../../../services/color-functions'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

@Component({
  name: 'VaTag',
  components: { VaIcon },
})
export default class VaTag extends Mixins(
  KeyboardOnlyFocusMixin,
  RouterLinkMixin,
  StatefulMixin,
  ColorThemeMixin,
) {
  @Prop({ type: Boolean, default: true }) value!: string
  @Prop({ type: Boolean, default: false }) closeable!: string
  @Prop({ type: String, default: '' }) color!: string
  @Prop({ type: Boolean, default: false }) outline!: string
  @Prop({ type: Boolean, default: false }) flat!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: Boolean, default: false }) disabled!: string
  @Prop({ type: Boolean, default: false }) square!: string
  @Prop({ type: String, default: 'span' }) tag!: string
  @Prop({
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  }) size!: string

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
    return size[this.size]
  }

  get indexComputed () {
    return this.disabled ? -1 : 0
  }

  get computedClass () {
    return {
      'va-tag--small': this.size === 'small',
      'va-tag--large': this.size === 'large',
      'va-tag--square': this.square,
      'va-tag--disabled': this.disabled,
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

.va-tag {
  display: inline-flex;
  border: 0.125rem solid transparent;
  position: relative;
  border-radius: 2rem;
  width: auto;
  height: auto;
  min-width: initial;
  min-height: initial;

  /* margin: 0 0.1rem; */
  padding: 0 0.3rem;
  color: $white;
  cursor: default;
  align-items: center;
  font-size: $tag-font-size-nrm;

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
      .va-tag--disabled {
        .va-tag__close-icon {
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

  &.va-tag--disabled {
    @include va-disabled;
  }
}
</style>
