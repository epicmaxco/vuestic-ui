<template>
  <aside
    :class="computedClass"
    :style="computedStyle"
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
  right: { type: Boolean, default: false },
})

@Component({
  name: 'VaSidebar',
})
export default class VaSidebar extends Mixins(
  ColorThemeMixin,
  SidebarPropsMixin,
) {
  get computedStyle () {
    return {
      backgroundImage: getGradientBackground(this.colorComputed),
    }
  }

  get computedClass () {
    return {
      'va-sidebar': true,
      'va-sidebar--minimized': this.c_minimized,
      'va-sidebar--right': this.c_right,
    }
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

  &__menu {
    max-height: 100%;
    margin-bottom: 0;
    padding-top: 2.5625rem;
    padding-bottom: 2.5rem;
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
    width: $sidebar-minimized-width;

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
