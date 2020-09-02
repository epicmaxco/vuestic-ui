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
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import VaButton from '../va-button/VaButton.vue'
const BacktopPropsMixin = makeContextablePropsMixin({
  target: { type: [Element, String], default: null },
  visibilityHeight: { type: Number, default: 300 },
  speed: { type: Number, default: 50 },
  top: { type: String, default: 'auto' },
  left: { type: String, default: 'auto' },
  right: { type: String, default: '40px' },
  bottom: { type: String, default: '40px' },
})

@Component({
  name: 'VaBacktop',
  components: { VaButton },
})
export default class VaBacktop extends Mixins(
  BacktopPropsMixin,
) {
  visible = false
  scrolled = false
  interval = 0

  get computedStyle (): object {
    return {
      bottom: this.c_bottom,
      right: this.c_right,
      left: this.c_left,
      top: this.c_top,
    }
  }

  get targetElement (): Element {
    return typeof this.c_target === 'string'
      ? document.querySelector(this.c_target)
      : this.c_target || this.$el.parentElement
  }

  handleScroll (): void {
    this.visible = this.targetElement.scrollTop > this.visibilityHeight
  }

  scrollToTop (): void {
    if (this.scrolled) { return }
    this.scrolled = true
    this.interval = setInterval(() => {
      const next = Math.floor(this.targetElement.scrollTop - this.c_speed)
      if (this.targetElement.scrollTop === 0) {
        clearInterval(this.interval)
        this.scrolled = false
      } else {
        this.targetElement.scrollTo(0, next)
      }
    }, 15)
  }

  mounted () {
    this.targetElement.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy () {
    this.targetElement.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-backtop {
  position: fixed;
}
</style>
