<template>
  <header :class="computedClass" :style="computedStyle" ref="scrollRoot">
    <slot />
  </header>
</template>

<script lang="ts">
import { mixins, Options, prop, setup, Vue } from 'vue-class-component'
import { setupScroll } from '../../vuestic-mixins/ScrollMixin/ScrollMixin'
import {
  getGradientBackground,
  getBoxShadowColor,
} from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'

class VaAppBarProps {
  gradient = prop<boolean>({ type: Boolean, default: false })
  bottom = prop<boolean>({ type: Boolean, default: false })
  target = prop<string | Element>({ type: [Element, String], default: '' })
  hideOnScroll = prop<boolean>({ type: Boolean, default: false })
  shadowOnScroll = prop<boolean>({ type: Boolean, default: false })
  shadowColor = prop<string>({ type: String, default: '' })
  color = prop<string>({ type: String, default: undefined })
}

const CardPropsMixin = Vue.with(VaAppBarProps)

@Options({ name: 'VaAppBar' })
export default class VaAppBar extends mixins(ColorMixin, CardPropsMixin) {
  isHidden = false
  doShowShadow = false

  scrollRoot = setup(() => {
    let prevScrollPosition = 0
    return setupScroll(this.target, (e: any) => {
      if (prevScrollPosition < e.target.scrollTop) {
        // Scroll down
        this.isHidden = !!this.hideOnScroll
        this.doShowShadow = !!this.shadowOnScroll
      } else {
        // Scroll up
        this.isHidden = false
        this.doShowShadow = false
      }
      prevScrollPosition = e.target.scrollTop
    })
  })

  get colorComputed () {
    return this.theme.getColor(this.color, 'primary')
  }

  get shadowColorComputed () {
    return this.theme.getColor(this.shadowColor, this.colorComputed)
  }

  get computedShadow () {
    if (!this.doShowShadow) {
      return ''
    }

    const shadow = getBoxShadowColor(this.shadowColor ? this.shadowColorComputed : this.colorComputed)

    return `0px 0px 12px 2px ${shadow}`
  }

  get transformComputed () {
    if (!this.isHidden) {
      return ''
    }

    return this.bottom ? 'translateY(100%)' : 'translateY(-100%)'
  }

  get computedStyle () {
    return {
      background: this.gradient ? getGradientBackground(this.colorComputed) : this.colorComputed,
      'box-shadow': this.computedShadow,
      transform: this.transformComputed,
    }
  }

  get computedClass () {
    return {
      'va-app-bar': true,
      'va-app-bar--bottom': this.bottom,
    }
  }
}
</script>

<style lang="scss">
@import "variables";

.va-app-bar {
  display: flex;
  align-items: center;
  position: var(--va-app-bar-position);
  transition: all 0.5s ease;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--va-app-bar-height);
  min-height: var(--va-app-bar-height);
  min-width: 100%;

  &--bottom {
    top: 100%;
    transform: translateY(-100%);
  }
}
</style>
