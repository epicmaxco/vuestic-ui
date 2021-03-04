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
import { Options, prop, Vue, mixins } from 'vue-class-component'

import { getGradientBackground } from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'

class SidebarProps {
  color = prop<string>({ type: String, default: 'secondary' })
  minimized = prop<boolean>({ type: Boolean, default: false })
  hoverable = prop<boolean>({ type: Boolean, default: false })
  position = prop<string>({ type: String, default: 'left' })
  width = prop<string>({ type: String, default: '16rem' })
  minimizedWidth = prop<string>({ type: String, default: '2.5rem' })
  modelValue = prop<boolean>({ type: Boolean, default: true })
}

const SidebarPropsMixin = Vue.with(SidebarProps)

@Options({
  name: 'VaSidebar',
})
export default class VaSidebar extends mixins(
  ColorMixin,
  SidebarPropsMixin,
) {
  isHovered = false

  get isMinimized () {
    return this.$props.minimized || (this.$props.hoverable && !this.isHovered)
  }

  get computedStyle () {
    return {
      backgroundImage: getGradientBackground(this.colorComputed),
      width: this.computedWidth || `${this.computedWidth} !important`,
    }
  }

  get computedWidth () {
    if (!this.$props.modelValue) {
      return 0
    }
    return this.isMinimized ? this.$props.minimizedWidth : this.$props.width
  }

  get computedClass () {
    return {
      'va-sidebar': true,
      'va-sidebar--minimized': this.isMinimized,
      'va-sidebar--right': this.$props.position === 'right',
    }
  }

  updateHoverState (isHovered: boolean) {
    this.isHovered = this.$props.hoverable ? isHovered : false
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
