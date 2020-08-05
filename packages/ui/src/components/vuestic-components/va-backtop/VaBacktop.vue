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
  target: { type: [String, HTMLElement], default: '' },
  visibilityHeight: { type: Number, default: 400 },
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

  get computedStyle () {
    return {
      bottom: this.c_bottom,
      right: this.c_right,
      left: this.c_left,
      top: this.c_top,
    }
  }

  get computedDomElement (): any {
    if (this.c_target) {
      return document.querySelector(`${this.c_target}`)
    }
    return document.body
  }

  mounted () {
    this.computedDomElement.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy () {
    this.computedDomElement.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    this.visible = this.computedDomElement.scrollTop > this.visibilityHeight
  }

  scrollToTop () {
    if (this.scrolled) { return }
    this.scrolled = true
    this.interval = setInterval(() => {
      const next = Math.floor(this.computedDomElement.scrollTop - this.c_speed)
      if (this.computedDomElement.scrollTop === 0) {
        clearInterval(this.interval)
        this.scrolled = false
      } else {
        this.computedDomElement.scrollTo(0, next)
      }
    }, 15)
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-backtop {
  position: fixed;
}
</style>
