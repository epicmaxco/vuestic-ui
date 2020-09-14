<template>
  <aside
    :class="computedClass"
    :style="computedStyle"
  >
    <slot />
  </aside>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'

import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const PropsMixin = makeContextablePropsMixin({
  gradient: { type: Boolean, default: false },
  position: { type: String, default: 'top' },
})

@Component({
  name: 'VaAppBar',
})
export default class VaAppBar extends Mixins(
  ColorThemeMixin,
  PropsMixin,
) {
  get computedStyle () {
    return {
      background: this.c_gradient ? getGradientBackground(this.colorComputed) : this.colorComputed,
    }
  }

  get computedClass () {
    return {
      'va-app-bar': true,
      'va-app-bar--bottom': this.c_position === 'bottom',
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
  // width: $app-bar-width;
  // top: $top-nav-height;
  transition: all 0.3s ease;
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
