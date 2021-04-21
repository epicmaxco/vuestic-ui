<template>
  <component
    :is="tagComputed"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    :disabled="disabled"
    :type="type"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :append="append"
    :active-class="activeClass"
    :exact="exact"
    :exact-active-class="exactActiveClass"
    @focus="updateFocusState(true)"
    @blur="updateFocusState(false)"
    :tabindex="loading ? -1 : 0"
  >
    <div
      class="va-button__content"
      v-on="inputListeners"
      @mouseenter="updateHoverState(true)"
      @mouseleave="updateHoverState(false)"
    >
      <va-progress-circle
        v-if="loading"
        indeterminate
        :size="loaderSize"
        :color="computedStyle.color"
        :thickness="0.15"
      />
      <template v-else>
        <va-icon
          v-if="icon"
          :name="icon"
          :size="$props.size"
          class="va-button__left-icon"
        />
        <slot />
        <va-icon
          v-if="iconRight"
          :name="iconRight"
          :size="$props.size"
          class="va-button__right-icon"
        />
      </template>
    </div>
  </component>
</template>

<script lang="ts">
import { inject, watchEffect, watch, Comment } from 'vue'
import { mixins, Vue, prop, Options, setup } from 'vue-class-component'
import {
  getGradientBackground,
  getFocusColor,
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import VaIcon from '../va-icon'
import { VaProgressCircle } from '../va-progress-bar'
import { ButtonGroupServiceKey } from '../va-button-group'

class ButtonProps {
  color = prop<string>({ type: String })
  textColor =prop<string>({ type: String, default: '#fff' })
  tag = prop<string>({ type: String, default: 'button' })
  outline = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  type = prop<string>({ type: String, default: 'button' })
  disabled = prop<boolean>({ type: Boolean, default: false })
  block = prop<boolean>({ type: Boolean, default: false })
  round = prop<boolean>({ type: Boolean, default: true })
  equilateral = prop<boolean>({ type: Boolean, default: undefined })
  spaceBetweenItems = prop<boolean>({ type: Boolean, default: undefined })
  icon = prop<string>({ type: String, default: undefined })
  iconRight = prop<string>({ type: String, default: undefined })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  })
}

const ButtonPropsMixin = Vue.with(ButtonProps)

@Options({
  name: 'VaButton',
  components: { VaIcon, VaProgressCircle },
  emits: ['click'],
})
export default class VaButton extends mixins(
  ColorMixin,
  RouterLinkMixin,
  SizeMixin,
  LoadingMixin,
  ButtonPropsMixin,
) {
  hoverState = false
  focusState = false

  context = setup(() => {
    const buttonGroup = inject(ButtonGroupServiceKey, {})

    watch(() => this.$props.loading, (loading) => {
      if (loading) {
        this.updateFocusState(false)
        this.updateHoverState(false)
      }
    })

    watchEffect(() => {
      this.updateFocusState(this.hoverState)
      this.updateHoverState(this.hoverState)
    })

    return {
      buttonGroup,
    }
  })

  get colorComputed () {
    return this.computeColor(this.color, 'primary')
  }

  get hasDefaultSlot () {
    return this.$slots.default
  }

  get computedClass () {
    return {
      'va-button--default': !this.flat && !this.outline && !this.disabled,
      'va-button--flat': this.flat,
      'va-button--outline': this.outline,
      'va-button--disabled': this.disabled,
      'va-button--hover': this.hoverState,
      'va-button--focus': this.focusState,
      'va-button--with-left-content': this.$slots.prepend,
      'va-button--with-right-content': this.$slots.append,
      'va-button--large': this.size === 'large',
      'va-button--small': this.size === 'small',
      'va-button--normal': !this.size || this.size === 'medium',
      'va-button--loading': this.loading,
      'va-button--block': this.block,
      'va-button--square': !this.round,
      'va-button--equilateral': this.equilateral || !this.hasDefaultSlot || this.loading,
      'va-button--space-between-items': this.spaceBetweenItems,
    }
  }

  get buttonGroupColor () {
    return this.context?.buttonGroup?.color
  }

  get gradientStyle () {
    if (this.flat || this.outline) {
      return
    }
    // Allows button to grab color from button group.
    if (this.buttonGroupColor) {
      return
    }

    return getGradientBackground(this.colorComputed)
  }

  get shadowStyle () {
    if (this.flat || this.outline) {
      return
    }
    if (this.buttonGroupColor && this.theme.getColor(this.buttonGroupColor)) {
      return '0 0.125rem 0.19rem 0 ' +
        getBoxShadowColor(this.color ? this.colorComputed : this.theme.getColor(this.buttonGroupColor))
    }
    return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.colorComputed)
  }

  get loaderSize () {
    const size = /([0-9]*)(px)/.exec(this.sizeComputed) as null | [string, string, string]

    if (size) {
      return `${+size[1] / 2}${size[2]}`
    }

    return this.sizeComputed
  }

  get computedStyle () {
    const computedStyle: any = {
      color: '',
      borderColor: '',
      background: '',
      backgroundImage: '',
      boxShadow: '',
    }

    if (this.focusState) {
      if (this.outline || this.flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.outline ? this.colorComputed : ''
        computedStyle.background = getFocusColor(this.colorComputed)
      } else {
        computedStyle.backgroundImage = this.gradientStyle
      }
    } else if (this.hoverState) {
      if (this.outline || this.flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.outline ? this.colorComputed : ''
        computedStyle.background = getHoverColor(this.colorComputed)
      } else {
        computedStyle.backgroundImage = this.gradientStyle
        computedStyle.boxShadow = this.shadowStyle
      }
    } else {
      computedStyle.color = this.flat || this.outline ? this.colorComputed : this.textColor
      computedStyle.borderColor = this.outline ? this.colorComputed : ''
      computedStyle.backgroundImage = this.gradientStyle
      computedStyle.boxShadow = this.shadowStyle
    }

    if (this.buttonGroupColor && !this.outline && !this.flat) {
      computedStyle.background = this.$props.color ? this.colorComputed : this.theme.getColor(this.buttonGroupColor)
      computedStyle.backgroundImage = ''
    }

    return computedStyle
  }

  get inputListeners () {
    // vue3 $listeners.click -> $attrs.onClick
    return Object.assign({},
      this.$attrs,
      {
        click: (event: Event) => {
          this.$emit('click', event)
        },
      },
    )
  }

  updateHoverState (isHover: boolean) {
    this.hoverState = isHover
  }

  updateFocusState (isHover: boolean) {
    this.focusState = isHover
  }

  /** @public */
  focus (): void {
    (this.$el as HTMLElement).focus()
  }

  /** @public */
  blur (): void {
    console.log(this.$el);
    (this.$el as HTMLElement).blur()
  }
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';
@import "variables";

.va-button {
  display: var(--va-button-display);
  align-items: var(--va-button-align-items);
  justify-content: var(--va-button-justify-content);
  background-image: var(--va-button-background-image);
  box-shadow: var(--va-button-box-shadow, var(--primary-control-box-shadow));
  outline: var(--va-button-outline);
  border: var(--va-button-border, var(--primary-control-border));
  font-family: var(--va-button-font-family, var(--primary-font-family));
  text-decoration: none !important;
  text-transform: initial;
  cursor: pointer;
  transition: var(--va-button-transition, var(--primary-transition));
  background-color: var(--va-button-background-color, var(--white));
  vertical-align: middle;
  box-sizing: border-box;

  &__content {
    display: flex;
    align-items: center;

    &__title,
    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      white-space: nowrap;
    }
  }

  &--default {
    color: var(--va-button-background-color, var(--white));

    &:hover {
      opacity: 0.85;
    }

    &:focus,
    &:active {
      filter: brightness(85%);
    }

    i {
      color: var(--va-button-icon-color, var(--white));
    }
  }

  &--outline {
    background-color: transparent;
    border: solid var(--va-button-outline-border, var(--outline-border-width));
    text-decoration: none;

    &.va-button--disabled {
      background: transparent;

      @include va-disabled;

      &.va-button--active {
        .va-button__content,
        i {
          color: var(--va-button-outline-icon-color, var(--white)) !important;
        }
      }
    }
  }

  &--flat {
    background: transparent;
    border: var(--va-button-flat-border, var(--primary-control-border)) solid transparent;
    text-decoration: none;
  }

  &.va-button--disabled {
    @include va-disabled;
  }

  &--large {
    @include va-button(var(--va-button-lg-py), var(--va-button-lg-px), var(--va-button-lg-font-size), var(--va-button-lg-line-height), var(--va-button-lg-border-radius));

    letter-spacing: var(--va-button-lg-letter-spacing);
    height: 3rem;
    min-width: 3rem;

    .va-button__content {
      padding: var(--va-button-lg-py) var(--va-button-lg-px);
    }

    &.va-button--equilateral {
      width: 3rem;
    }

    &.va-button--outline {
      line-height: calc(var(--va-button-lg-line-height) - 2 * var(--va-button-outline-border, var(--outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-lg-square-border-radius);
    }
  }

  &--small {
    @include va-button(var(--va-button-sm-py), var(--va-button-sm-px), var(--va-button-sm-font-size), var(--va-button-sm-line-height), var(--va-button-sm-border-radius));

    letter-spacing: var(--va-button-sm-letter-spacing);
    height: 1.5rem;
    min-width: 1.5rem;

    .va-button__content {
      padding: var(--va-button-sm-py) var(--va-button-sm-px);
    }

    &.va-button--equilateral {
      width: 1.5rem;
    }

    &.va-button--outline {
      line-height: calc(var(--va-button-sm-line-height) - 2 * var(--va-button-outline-border, var(--outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-sm-square-border-radius);
    }
  }

  &--normal {
    @include va-button(var(--va-button-py), var(--va-button-px), var(--va-button-font-size), var(--va-button-line-height), var(--va-button-border-radius));

    letter-spacing: var(--va-button-letter-spacing, var(--primary-letter-spacing));
    height: 2.25rem;
    min-width: 2.25rem;

    .va-button__content {
      padding: var(--va-button-py) var(--va-button-px);
    }

    &.va-button--equilateral {
      width: 2.25rem;
    }

    &.va-button--outline {
      line-height: calc(var(--va-button-line-height) - 2 * var(--va-button-outline-border, var(--outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-square-border-radius);
    }
  }

  &--equilateral {
    .va-button__content { padding: 0; }
  }

  &--space-between-items {
    .va-button__content > * {
      margin-right: calc(var(--va-button-space-between-items) / 2);
      margin-left: calc(var(--va-button-space-between-items) / 2);
      &:last-child { margin-right: 0; }
      &:first-child { margin-left: 0; }
    }
  }

  &__left-icon {
    margin-right: calc(var(--va-button-space-between-items) / 2);
    &:last-child { margin-right: 0; }
  }

  &__right-icon {
    margin-left: calc(var(--va-button-space-between-items) / 2);
    &:last-child { margin-right: 0; }
  }

  &--loading {
    pointer-events: none;
  }

  &--block {
    display: flex;
    min-width: 100%;
  }

  &--square {
    border-radius: 0.5rem;
  }
}
</style>
