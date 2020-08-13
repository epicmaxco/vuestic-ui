<template>
  <aside
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div class="va-sidebar__menu">
      <slot name="menu" />
    </div>
  </aside>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'

import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const SidebarPropsMixin = makeContextablePropsMixin({
  minimized: { type: Boolean, required: true },
  color: { type: String, default: '' },
  hoverable: { type: Boolean, default: false },
  position: { type: String, default: 'left' },
})

@Component({
  name: 'VaSidebar',
})
export default class VaSidebar extends Mixins(
  ColorThemeMixin,
  SidebarPropsMixin,
) {
  isHovered = false

  get computedStyle () {
    return {
      backgroundImage: getGradientBackground(this.colorComputed),
    }
  }

  get computedClass () {
    return {
      'va-sidebar': true,
      'va-sidebar--minimized': this.c_minimized || (this.c_hoverable && !this.isHovered),
      'va-sidebar--right': this.c_position === 'right',
      'va-sidebar--vertical': this.c_position === 'top',
      'va-sidebar--vertical va-sidebar--vertical-bottom': this.c_position === 'bottom',
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
  min-height: $sidebar-viewport-min-height;
  height: $sidebar-viewport-height;
  position: absolute;
  width: $sidebar-width;
  // top: $top-nav-height;
  left: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;

  &__menu {
    max-height: 100%;
    margin-bottom: 0;
    // padding-top: 2.5625rem;
    // padding-bottom: 2.5rem;
    list-style: none;
    padding-left: 0;
  }

  @include media-breakpoint-down(sm) {
    top: $sidebar-mobile-top;
  }

  @include media-breakpoint-down(xs) {
    width: 100%;
  }

  &--minimized {
    left: 0;
    width: 4rem;

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

  &--vertical {
    top: 0;
    left: 0;
    width: $sidebar-viewport-height;
    height: $sidebar-width;
    min-height: auto;
    min-width: 100%;

    .va-sidebar__menu {
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

    &-bottom {
      bottom: 0;
      top: auto;
    }
  }
}
</style>
