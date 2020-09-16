<template>
  <div
    v-if="visible"
    class="va-backtop"
    :style="computedStyle"
    @click="scrollToTop()"
  >
    <slot>
      <va-button
        icon="expand_less"
        :color="c_color"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import VaButton from '../va-button/VaButton.vue'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ScrollMixin } from '../../vuestic-mixins/ScrollMixin/ScrollMixin'

const PropsMixin = makeContextablePropsMixin({
  target: { type: [Element, String], default: window },
  visibilityHeight: { type: Number, default: 300 },
  speed: { type: Number, default: 50 },
  verticalOffset: { type: String, default: '1rem' },
  horizontalOffset: { type: String, default: '1rem' },
  color: { type: String, default: '' },
  horizontalPosition: {
    type: String,
    default: 'right',
    validator: (value: string) => {
      return ['right', 'left'].includes(value)
    },
  },
  verticalPosition: {
    type: String,
    default: 'bottom',
    validator: (value: string) => {
      return ['bottom', 'top'].includes(value)
    },
  },
})

@Component({
  name: 'VaBacktop',
  components: { VaButton },
})
export default class VaBacktop extends Mixins(
  ScrollMixin,
  PropsMixin,
) {
  visible = false
  scrolled = false
  interval = 0

  get computedStyle (): object {
    return {
      [this.c_verticalPosition]: this.c_verticalOffset,
      [this.c_horizontalPosition]: this.c_horizontalOffset,
    }
  }

  handleScroll (): void {
    this.visible = this.targetElement.scrollTop > this.visibilityHeight
  }

  scrollToTop (): void {
    if (this.scrolled) { return }
    this.scrolled = true
    this.interval = window.setInterval(() => {
      const next = Math.floor(this.targetElement.scrollTop - this.c_speed)
      if (this.targetElement.scrollTop === 0) {
        clearInterval(this.interval)
        this.scrolled = false
      } else {
        this.targetElement.scrollTo(0, next)
      }
    }, 15)
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-backtop {
  position: fixed;
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  cursor: pointer;
}
</style>
