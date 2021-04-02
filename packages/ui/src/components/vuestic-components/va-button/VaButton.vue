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
      <template v-if="loading">
        <va-progress-circle
          indeterminate
          :size="loaderSize"
          :color="computedStyle.color"
          :thickness="0.15"
        />
      </template>
      <template v-else>
        <va-icon
          v-if="icon"
          class="va-button__content__icon"
          :name="icon"
          :size="size"
        />
        <div
          v-if="hasTitleData"
          class="va-button__content__title"
        >
          <slot />
        </div>
        <va-icon
          v-if="iconRight"
          class="va-button__content__icon"
          :name="iconRight"
          :size="size"
        />
      </template>
    </div>
  </component>
</template>

<script lang="ts">
import { inject, watchEffect, watch } from 'vue'
import { mixins, Vue, prop, Options, setup } from 'vue-class-component'
import {
  getGradientBackground,
  getFocusColor,
  getHoverColor,
  getBoxShadowColor,
  shiftHslColor,
} from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import VaIcon from '../va-icon'
import { VaProgressCircle } from '../va-progress-bar'
import { ButtonGroupServiceKey } from '../va-button-group'

class ButtonProps {
  color = prop<string>({ type: String, default: undefined })
  textColor = prop<string>({ type: String, default: '#fff' })
  tag = prop<string>({ type: String, default: 'button' })
  outline = prop<boolean>({ type: Boolean, default: undefined })
  flat = prop<boolean>({ type: Boolean, default: undefined })
  icon = prop<string>({ type: String, default: '' })
  iconRight = prop<string>({ type: String, default: '' })
  type = prop<string>({ type: String, default: 'button' })
  disabled = prop<boolean>({ type: Boolean, default: false })
  block = prop<boolean>({ type: Boolean, default: false })
  round = prop<boolean>({ type: Boolean, default: true })
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
      this.$el.blur()

      if (loading) {
        this.updateFocusState(false)
        this.updateHoverState(false)
      }
    })

    watchEffect(() => {
      this.updateFocusState(this.hoverState)
      this.updateHoverState(this.hoverState)
    })

    return { buttonGroup }
  })

  get colorComputed () {
    return this.computeColor(this.color, 'primary')
  }

  get textColorComputed () {
    return this.computeColor(this.textColor, '#fff')
  }

  get computedClass () {
    return {
      'va-button--default': !this.flat && !this.outline && !this.disabled,
      'va-button--flat': this.flat,
      'va-button--outline': this.outline,
      'va-button--disabled': this.disabled,
      'va-button--hover': this.hoverState,
      'va-button--focus': this.focusState,
      'va-button--without-title': !this.hasTitleData,
      'va-button--with-left-icon': this.icon,
      'va-button--with-right-icon': this.iconRight,
      'va-button--large': this.size === 'large',
      'va-button--small': this.size === 'small',
      'va-button--normal': !this.size || this.size === 'medium',
      'va-button--loading': this.loading,
      'va-button--block': this.block,
      'va-button--square': !this.round,
    }
  }

  get shadowStyle () {
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
      background: '#00000000',
      boxShadow: '',
    }

    const isTransparentBackground = this.outline || this.flat || this.colorComputed === '#00000000'

    if (isTransparentBackground) {
      computedStyle.color = this.textColor
      computedStyle.borderColor = this.outline ? this.colorComputed : ''

      if (this.hoverState) {
        computedStyle.background = getHoverColor(this.colorComputed)
      }
      if (this.focusState) {
        computedStyle.background = getFocusColor(this.colorComputed)
      }
    } else {
      computedStyle.background = getGradientBackground(this.colorComputed)
      computedStyle.color = this.textColorComputed
      if (this.hoverState || this.focusState) {
        computedStyle.boxShadow = this.shadowStyle
        computedStyle.background = getGradientBackground(shiftHslColor(this.colorComputed, { l: -3 }))
      }
    }

    return computedStyle
  }

  get hasTitleData () {
    return this.$slots.default
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
  background: var(--va-button-background-color, var(--white));
  vertical-align: middle;

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
    min-width: 5rem;

    .va-button__content {
      padding: var(--va-button-lg-py) var(--va-button-lg-content-px);
    }

    &.va-button--without-title {
      min-width: 0;
      width: 3rem;
    }

    &.va-button--with-left-icon {
      padding-left: var(--va-button-lg-icon-wrapper-padding);

      &.va-button--without-title {
        padding-right: var(--va-button-lg-icon-wrapper-padding);
      }

      .va-button__content__title {
        padding-left: var(--va-button-lg-icon-content-padding);
      }
    }

    &.va-button--with-right-icon {
      padding-right: var(--va-button-lg-icon-wrapper-padding);

      .va-button__content__title {
        padding-right: var(--va-button-lg-icon-content-padding);
      }
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
    min-width: 3rem;

    .va-button__content {
      padding: var(--va-button-sm-py) var(--va-button-sm-px);
    }

    &.va-button--without-title {
      min-width: 0;
      width: 1.5rem;
    }

    &.va-button--with-left-icon {
      padding-left: var(--va-button-sm-icon-wrapper-padding);

      &.va-button--without-title {
        padding-right: var(--va-button-sm-icon-wrapper-padding);
      }

      .va-button__content__title {
        padding-left: var(--va-button-sm-icon-content-padding);
      }
    }

    &.va-button--with-right-icon {
      padding-right: var(--va-button-sm-icon-wrapper-padding);

      .va-button__content__title {
        padding-right: var(--va-button-sm-icon-content-padding);
      }
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
    min-width: 4rem;

    .va-button__content {
      padding: var(--va-button-py) var(--va-button-px);
    }

    &.va-button--without-title {
      min-width: 0;
      width: 2.25rem;
    }

    &.va-button--with-left-icon {
      padding-left: var(--va-button-icon-wrapper-padding);

      &.va-button--without-title {
        padding-right: var(--va-button-icon-wrapper-padding);
      }

      .va-button__content__title {
        padding-left: var(--va-button-icon-content-padding);
      }
    }

    &.va-button--with-right-icon {
      padding-right: var(--va-button-icon-wrapper-padding);

      .va-button__content__title {
        padding-right: var(--va-button-icon-content-padding);
      }
    }

    &.va-button--outline {
      line-height: calc(var(--va-button-line-height) - 2 * var(--va-button-outline-border, var(--outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-square-border-radius);
    }
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
