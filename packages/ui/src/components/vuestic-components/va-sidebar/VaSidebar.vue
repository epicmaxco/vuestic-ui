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
import { useColors } from '../../../services/color-config/color-config'

class SidebarProps {
  color = prop<string>({ type: String, default: 'background' })
  textColor = prop<string>({ type: String, default: undefined })
  gradient = prop<boolean>({ type: Boolean, default: false })
  minimized = prop<boolean>({ type: Boolean, default: false })
  hoverable = prop<boolean>({ type: Boolean, default: false })
  position = prop<string>({ type: String, default: 'left' })
  width = prop<string>({ type: String, default: '16rem' })
  minimizedWidth = prop<string>({ type: String, default: '2.5rem' })
  modelValue = prop<boolean>({ type: Boolean, default: true })
}

const SidebarPropsMixin = Vue.with(SidebarProps)

@Options({ name: 'VaSidebar' })
export default class VaSidebar extends SidebarPropsMixin {
  isHovered = false

  get isMinimized () {
    return this.$props.minimized || (this.$props.hoverable && !this.isHovered)
  }

  get computedStyle () {
    const { getColor, getTextColor } = useColors()

    const backgroundColor = getColor(this.color)
    const background = this.gradient ? getGradientBackground(backgroundColor) : backgroundColor

    const color = this.$props.textColor ? getColor(this.textColor) : getTextColor(backgroundColor)

    return {
      color,
      background,
      width: this.computedWidth,
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
      'va-sidebar--hidden': !this.modelValue,
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
@import 'variables';

.va-sidebar {
  min-height: var(--va-sidebar-min-height);
  height: var(--va-sidebar-height);
  position: var(--va-sidebar-position);
  top: var(--va-sidebar-top);
  left: var(--va-sidebar-left);
  transition: var(--va-sidebar-transition);
  z-index: var(--va-sidebar-z-index);

  &__menu {
    max-height: var(--va-sidebar-menu-max-height);
    margin-bottom: var(--va-sidebar-menu-margin-bottom);
    list-style: var(--va-sidebar-menu-list-style);
    padding-left: var(--va-sidebar-menu-padding-left);
    overflow-y: var(--va-sidebar-menu-overflow-y);
    overflow-x: var(--va-sidebar-menu-overflow-x);
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
