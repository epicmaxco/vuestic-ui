<template>
  <component
    :is="tagComputed"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    :disabled="c_disabled"
    :type="c_type"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :append="append"
    :active-class="activeClass"
    :exact="exact"
    :exact-active-class="exactActiveClass"
    v-on="inputListeners"
    @focus="updateFocusState(true)"
    @blur="updateFocusState(false)"
    :tabindex="c_loading ? -1 : 0"
  >
    <div
      class="va-button__content"
      @mouseenter="updateHoverState(true)"
      @mouseleave="updateHoverState(false)"
    >
      <template v-if="c_loading">
        <va-progress-circle
          indeterminate
          :size="loaderSize"
          :color="computedStyle.color"
          :thickness="0.15"
        />
      </template>
      <template v-else>
        <va-icon
          v-if="c_icon"
          class="va-button__content__icon"
          :name="c_icon"
          :size="size"
        />
        <div
          v-if="hasTitleData"
          class="va-button__content__title"
        >
          <slot />
        </div>
        <va-icon
          v-if="c_iconRight"
          class="va-button__content__icon"
          :name="c_iconRight"
          :size="size"
        />
      </template>
    </div>
  </component>
</template>

<script lang="ts">
import { Component, Mixins, Inject, Watch } from 'vue-property-decorator'

import VaIcon from '../va-icon/VaIcon.vue'
import VaProgressCircle
  from '../va-progress-bar/progress-types/VaProgressCircle.vue'

import {
  getGradientBackground,
  getFocusColor,
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'

const ButtonPropsMixin = makeContextablePropsMixin({
  tag: { type: String, default: 'button' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
  icon: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  round: { type: Boolean, default: true },
})

@Component({
  name: 'VaButton',
  components: { VaIcon, VaProgressCircle },
})
export default class VaButton extends Mixins(
  ColorThemeMixin,
  RouterLinkMixin,
  SizeMixin,
  LoadingMixin,
  ButtonPropsMixin,
) {
  hoverState = false
  focusState = false

  @Inject({
    default: () => ({}),
  }) readonly va!: any

  @Watch('c_loading')
  onLoadingChanged (newValue: boolean) {
    (this as any).$el.blur()

    if (newValue === true) {
      this.updateFocusState(false)
      this.updateHoverState(false)
    }
  }

  @Watch('hoverState')
  onHoverChange (value: boolean) {
    this.updateFocusState(value)
    this.updateHoverState(value)
  }

  get computedClass () {
    return {
      'va-button--default': !this.c_flat && !this.c_outline && !this.c_disabled,
      'va-button--flat': this.c_flat,
      'va-button--outline': this.c_outline,
      'va-button--disabled': this.c_disabled,
      'va-button--hover': this.hoverState,
      'va-button--focus': this.focusState,
      'va-button--without-title': !this.hasTitleData,
      'va-button--with-left-icon': this.c_icon,
      'va-button--with-right-icon': this.c_iconRight,
      'va-button--large': this.c_size === 'large',
      'va-button--small': this.c_size === 'small',
      'va-button--normal': !this.c_size || this.c_size === 'medium',
      'va-button--loading': this.c_loading,
      'va-button--block': this.c_block,
      'va-button--square': !this.c_round,
    }
  }

  get gradientStyle () {
    if (this.c_flat || this.c_outline) {
      return
    }
    // Allows button to grab color from button group.
    if (this.va.color) {
      return
    }
    return getGradientBackground(this.colorComputed)
  }

  get shadowStyle () {
    if (this.c_flat || this.c_outline) {
      return
    }
    if (this.va.color && this.$themes && this.$themes[this.va.color]) {
      return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.c_color ? this.colorComputed : this.$themes[this.va.color])
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
      if (this.c_outline || this.c_flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
        computedStyle.background = getFocusColor(this.colorComputed)
      } else {
        computedStyle.backgroundImage = this.gradientStyle
      }
    } else if (this.hoverState) {
      if (this.c_outline || this.c_flat) {
        computedStyle.color = this.colorComputed
        computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
        computedStyle.background = getHoverColor(this.colorComputed)
      } else {
        computedStyle.backgroundImage = this.gradientStyle
        computedStyle.boxShadow = this.shadowStyle
      }
    } else {
      computedStyle.color = this.c_flat || this.c_outline ? this.colorComputed : '#ffffff'
      computedStyle.borderColor = this.c_outline ? this.colorComputed : ''
      computedStyle.backgroundImage = this.gradientStyle
      computedStyle.boxShadow = this.shadowStyle
    }

    if (this.va.color && !this.c_outline && !this.c_flat && this.$themes) {
      computedStyle.background = this.c_color ? this.colorComputed : this.$themes[this.va.color]
      computedStyle.backgroundImage = ''
    }

    return computedStyle
  }

  get hasTitleData () {
    return this.$slots.default
  }

  get inputListeners () {
    return Object.assign({},
      this.$listeners,
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
@import "../../vuestic-sass/resources/resources";

.va-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-image: none;
  box-shadow: none;
  outline: none !important;
  border: $btn-border;
  font-family: $font-family-sans-serif;
  text-decoration: none !important;
  text-transform: initial;
  cursor: pointer;
  transition: $btn-transition;
  background-color: $white;
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
    color: $white;

    &:hover {
      opacity: 0.85;
    }

    &:focus,
    &:active {
      filter: brightness(85%);
    }

    i {
      color: $white;
    }
  }

  &--outline {
    background-color: transparent;
    border: solid $btn-border-outline;
    text-decoration: none;

    &.va-button--disabled {
      background: transparent;

      @include va-disabled;

      &.va-button--active {
        .va-button__content,
        i {
          color: $white !important;
        }
      }
    }
  }

  &--flat {
    background: transparent;
    border: $btn-border solid transparent;
    text-decoration: none;
  }

  &.va-button--disabled {
    @include va-disabled;
  }

  &--large {
    @include va-button(0, $btn-padding-x-lg, $btn-font-size-lg, $btn-line-height-lg, $btn-border-radius-lg);

    letter-spacing: $btn-letter-spacing-lg;
    height: 3rem;
    min-width: 5rem;

    .va-button__content {
      padding: 0 $btn-padding-x-lg;
    }

    &.va-button--without-title {
      min-width: 0;
      width: 3rem;
    }

    &.va-button--with-left-icon {
      padding-left: $btn-with-icon-wrapper-padding-lg;

      &.va-button--without-title {
        padding-right: $btn-with-icon-wrapper-padding-lg;
      }

      .va-button__content__title {
        padding-left: $btn-with-icon-content-padding-lg;
      }
    }

    &.va-button--with-right-icon {
      padding-right: $btn-with-icon-wrapper-padding-lg;

      .va-button__content__title {
        padding-right: $btn-with-icon-content-padding-lg;
      }
    }

    &.va-button--outline {
      line-height: $btn-line-height-lg - 2 * $btn-border-outline;
    }

    &.va-button--square {
      border-radius: $btn-border-radius-lg-square;
    }
  }

  &--small {
    @include va-button(0, $btn-padding-x-sm, $btn-font-size-sm, $btn-line-height-sm, $btn-border-radius-sm);

    letter-spacing: $btn-letter-spacing-sm;
    height: 1.5rem;
    min-width: 3rem;

    .va-button__content {
      padding: 0 $btn-padding-x-sm;
    }

    &.va-button--without-title {
      min-width: 0;
      width: 1.5rem;
    }

    &.va-button--with-left-icon {
      padding-left: $btn-with-icon-wrapper-padding-sm;

      &.va-button--without-title {
        padding-right: $btn-with-icon-wrapper-padding-sm;
      }

      .va-button__content__title {
        padding-left: $btn-with-icon-content-padding-sm;
      }
    }

    &.va-button--with-right-icon {
      padding-right: $btn-with-icon-wrapper-padding-sm;

      .va-button__content__title {
        padding-right: $btn-with-icon-content-padding-sm;
      }
    }

    &.va-button--outline {
      line-height: $btn-line-height-sm - 2 * $btn-border-outline;
    }

    &.va-button--square {
      border-radius: $btn-border-radius-sm-square;
    }
  }

  &--normal {
    @include va-button(0, $btn-padding-x-nrm, $btn-font-size-nrm, $btn-line-height-nrm, $btn-border-radius-nrm);

    letter-spacing: $btn-letter-spacing-nrm;
    height: 2.25rem;
    min-width: 4rem;

    .va-button__content {
      padding: 0 $btn-padding-x-nrm;
    }

    &.va-button--without-title {
      min-width: 0;
      width: 2.25rem;
    }

    &.va-button--with-left-icon {
      padding-left: $btn-with-icon-wrapper-padding-nrm;

      &.va-button--without-title {
        padding-right: $btn-with-icon-wrapper-padding-nrm;
      }

      .va-button__content__title {
        padding-left: $btn-with-icon-content-padding-nrm;
      }
    }

    &.va-button--with-right-icon {
      padding-right: $btn-with-icon-wrapper-padding-nrm;

      .va-button__content__title {
        padding-right: $btn-with-icon-content-padding-nrm;
      }
    }

    &.va-button--outline {
      line-height: $btn-line-height-nrm - 2 * $btn-border-outline;
    }

    &.va-button--square {
      border-radius: $btn-border-radius-nrm-square;
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
