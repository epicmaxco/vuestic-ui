<template>
  <header :class="computedClass" :style="computedStyle" ref="scrollRoot">
    <slot />
  </header>
</template>

<script lang="ts">
import { setupScroll } from '../../vuestic-mixins/ScrollMixin/ScrollMixin'
import { Options, prop, setup, Vue } from 'vue-class-component'

import {
  getGradientBackground,
  getBoxShadowColor,
} from '../../../services/color-config/color-functions'
import { useColor } from '../../vuestic-mixins/ColorMixin'
import { computed } from '@vue/runtime-core'

class VaAppBarProps {
  gradient = prop<boolean>({ type: Boolean, default: false });
  bottom = prop<boolean>({ type: Boolean, default: false });
  target = prop<string | Element>({ type: [Element, String], default: '' });
  hideOnScroll = prop<boolean>({ type: Boolean, default: false });
  shadowOnScroll = prop<boolean>({ type: Boolean, default: false });
  shadowColor = prop<string>({ type: String, default: '' });
  color = prop<string>({ type: String, default: 'primary' });
}

@Options({ name: 'VaAppBar' })
export default class VaAppBar extends Vue.with(VaAppBarProps) {
  scrollPos = 0;
  isHidden = false;
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
  });

  colors = setup(() => {
    const getColor = useColor()

    const colorComputed = getColor(this.color || 'primary')
    const shadowColor = getColor(this.shadowColor, colorComputed)

    return { colorComputed, shadowColor }
  })

  get computedShadow () {
    if (!this.doShowShadow) { return '' }

    const shadow = getBoxShadowColor(this.shadowColor ? this.colors.shadowColor : this.colors.colorComputed)

    return `0px 0px 12px 2px ${shadow}`
  }

  get transformComputed () {
    if (!this.isHidden) { return '' }

    return this.bottom ? 'translateY(100%)' : 'translateY(-100%)'
  }

  get computedStyle () {
    return {
      background: this.gradient ? getGradientBackground(this.colors.colorComputed) : this.colors.colorComputed,
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
@import "../../vuestic-sass/resources/resources";

.va-app-bar {
  display: flex;
  align-items: center;
  position: absolute;
  transition: all 0.5s ease;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: auto;
  min-width: 100%;

  &--bottom {
    bottom: 0;
    top: auto;
  }
}
</style>
