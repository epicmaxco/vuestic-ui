<template>
  <component
    :is="computedTag"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    :disabled="c_disabled"
    :type="c_type"
    :href="c_href"
    :target="c_target"
    :to="to"
    :replace="replace"
    :append="append"
    :active-class="activeClass"
    :exact="exact"
    :exact-active-class="exactActiveClass"
    v-on="inputListeners"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
    @focus="updateFocusState(true)"
    @blur="updateFocusState(false)"
    tabindex="0"
  >
    <div class="va-button__content">
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
    </div>
  </component>
</template>

<script>
import VaIcon from '../va-icon/VaIcon'
import {
  getGradientBackground,
  getFocusColor,
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin'

const buttonContextMixin = makeContextablePropsMixin({
  color: { type: String, default: 'success' },
  tag: { type: String, default: 'button' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: value => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
  icon: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  /* Link props */
  href: { type: String, default: undefined },
  target: { type: String, default: undefined },
})

export default {
  name: 'VaButton',
  components: { VaIcon },
  mixins: [
    ColorThemeMixin,
    RouterLinkMixin,
    buttonContextMixin,
  ],
  inject: {
    va: {
      default: () => ({}),
    },
  },
  data () {
    return {
      hoverState: false,
      focusState: false,
    }
  },
  computed: {
    computedClass () {
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
      }
    },
    gradientStyle () {
      if (this.c_flat || this.c_outline) {
        return
      }
      if (this.va.color) {
        return
      }
      return getGradientBackground(this.colorComputed)
    },
    shadowStyle () {
      if (this.c_flat || this.c_outline) {
        return
      }
      if (this.va.color && this.$themes && this.$themes[this.va.color]) {
        return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.c_color ? this.colorComputed : this.$themes[this.va.color])
      }
      return '0 0.125rem 0.19rem 0 ' + getBoxShadowColor(this.colorComputed)
    },
    computedStyle () {
      const computedStyle = {
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

      if (this.va.color && !this.c_outline && !this.c_flat) {
        computedStyle.background = this.c_color ? this.colorComputed : this.$themes[this.va.color]
        computedStyle.backgroundImage = ''
      }

      return computedStyle
    },
    hasTitleData () {
      return this.$slots.default
    },
    computedTag () {
      if (this.c_tag === 'a' || this.c_href || this.c_target) {
        return 'a'
      }
      if (this.c_tag === 'router-link' || this.hasRouterLinkParams) {
        return 'router-link'
      }
      return 'button'
    },
    inputListeners () {
      const vm = this
      return Object.assign({},
        this.$listeners,
        {
          click (event) {
            vm.$emit('click', event)
          },
        },
      )
    },
  },
  methods: {
    updateHoverState (isHover) {
      this.hoverState = isHover
    },
    updateFocusState (isHover) {
      this.focusState = isHover
    },
  },
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

  &__content {
    display: flex;

    &__title,
    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
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
  }

  &--small {
    @include va-button(0, $btn-padding-x-sm, $btn-font-size-sm, $btn-line-height-sm, $btn-border-radius-sm);

    letter-spacing: $btn-letter-spacing-sm;
    height: 1.5rem;
    min-width: 3rem;

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
  }

  &--normal {
    @include va-button(0, $btn-padding-x-nrm, $btn-font-size-nrm, $btn-line-height-nrm, $btn-border-radius-nrm);

    letter-spacing: $btn-letter-spacing-nrm;
    height: 2.25rem;
    min-width: 4rem;

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
  }
}
</style>
