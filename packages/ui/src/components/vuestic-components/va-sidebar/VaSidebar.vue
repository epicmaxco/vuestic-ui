<template>
  <aside
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div class="va-sidebar__menu">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts">
import { Mixins } from 'vue-property-decorator'

import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Options } from 'vue-class-component'

const SidebarPropsMixin = makeContextablePropsMixin({
  minimized: { type: Boolean, default: false },
  hoverable: { type: Boolean, default: false },
  position: { type: String, default: 'left' },
  width: { type: String, default: '16rem' },
  minimizedWidth: { type: String, default: '2.5rem' },
  value: { type: Boolean, default: true },
})

@Options({
  name: 'VaSidebar',
})
export default class VaSidebar extends Mixins(
  ColorThemeMixin,
  SidebarPropsMixin,
) {
  isHovered = false

  get isMinimized () {
    return this.c_minimized || (this.c_hoverable && !this.isHovered)
  }

  get computedStyle () {
    return {
      backgroundImage: getGradientBackground(this.colorComputed),
      width: this.computedWidth || `${this.computedWidth} !important`,
    }
  }

  get computedWidth () {
    if (!this.c_value) {
      return 0
    }
    return this.isMinimized ? this.c_minimizedWidth : this.c_width
  }

  get computedClass () {
    return {
      'va-sidebar': true,
      'va-sidebar--minimized': this.isMinimized,
      'va-sidebar--right': this.c_position === 'right',
    }
  }

  updateHoverState (isHovered: boolean) {
    this.isHovered = this.c_hoverable ? isHovered : false
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-sidebar {
  min-height: 100%;
  height: $sidebar-viewport-height;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease;

  &__menu {
    max-height: 100%;
    margin-bottom: 0;
    list-style: none;
    padding-left: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @include media-breakpoint-down(xs) {
    width: 100% !important;
  }

  &--minimized {
    left: 0;

    .va-sidebar-link-group {
      .va-sidebar-link__content {
        padding-right: 0;
      }
    }

    & + .content-wrap {
      margin-left: $sidebar-width--hidden !important;
    }
  }

  &--right {
    left: auto;
    right: 0;
  }
}
</style>
