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
import { Mixins, Component, Prop } from 'vue-property-decorator'

import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import { getGradientBackground } from '../../../services/color-functions'

@Component({
  name: 'VaSidebar',
})
export default class VaSidebar extends Mixins(
  ColorThemeMixin,
) {
  @Prop({ type: Boolean, default: false }) minimized!: boolean
  @Prop({ type: Boolean, default: false }) hoverable!: boolean
  @Prop({ type: String, default: 'left' }) position!: string
  @Prop({ type: String, default: '16rem' }) width!: string
  @Prop({ type: String, default: '2.5rem' }) minimizedWidth!: string
  @Prop({ type: Boolean, default: true }) value!: boolean

  isHovered = false

  get isMinimized () {
    return this.minimized || (this.hoverable && !this.isHovered)
  }

  get computedStyle () {
    return {
      backgroundImage: getGradientBackground(this.colorComputed),
      width: this.computedWidth || `${this.computedWidth} !important`,
    }
  }

  get computedWidth () {
    if (!this.value) {
      return 0
    }
    return this.isMinimized ? this.minimizedWidth : this.width
  }

  get computedClass () {
    return {
      'va-sidebar': true,
      'va-sidebar--minimized': this.isMinimized,
      'va-sidebar--right': this.position === 'right',
    }
  }

  updateHoverState (isHovered: boolean) {
    this.isHovered = this.hoverable ? isHovered : false
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
