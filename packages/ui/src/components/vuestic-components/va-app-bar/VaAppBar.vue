<template>
  <aside
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div class="va-app-bar__menu">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'

import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const AppBarPropsMixin = makeContextablePropsMixin({
  hoverable: { type: Boolean, default: false },
  position: { type: String, default: 'top' },
  width: { type: String, default: '16rem' },
})

@Component({
  name: 'VaAppBar',
})
export default class VaAppBar extends Mixins(
  ColorThemeMixin,
  AppBarPropsMixin,
) {
  get computedStyle () {
    return {
      backgroundImage: getGradientBackground(this.colorComputed),
      width: this.isMinimized ? '4rem' : this.c_width,
    }
  }

  get computedClass () {
    return {
      'va-app-bar': true,
      'va-app-bar--bottom': this.c_position === 'bottom',
    }
  }

  updateHoverState (isHovered: boolean) {
    this.isHovered = this.c_hoverable ? isHovered : false
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-app-bar {
  // min-height: $app-bar-viewport-min-height;
  position: absolute;
  // width: $app-bar-width;
  // top: $top-nav-height;
  transition: all 0.3s ease;
  top: 0;
  left: 0;
  width: $sidebar-viewport-height;
  height: $sidebar-width;
  min-height: auto;
  min-width: 100%;

  &--bottom {
    bottom: 0;
    top: auto;
  }

  &__menu {
    max-height: 100%;
    margin-bottom: 0;
    // padding-top: 2.5625rem;
    // padding-bottom: 2.5rem;
    list-style: none;
    padding-left: 0;
    overflow-y: auto;
    overflow-x: hidden;

    > div {
      display: flex;
      padding: 0;
      align-items: center;

      > div {
        width: 4rem;
        overflow: hidden;
      }
    }
  }
}
</style>
