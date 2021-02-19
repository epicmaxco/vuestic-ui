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
        :color="color"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import VaButton from '../va-button'

class Props {
  target = prop<Element | string | undefined>({ type: [Element, String], default: () => window })
  visibilityHeight = prop<number>({ type: Number, default: 300 })
  speed = prop<number>({ type: Number, default: 50 })
  verticalOffset = prop<string>({ type: String, default: '1rem' })
  horizontalOffset = prop<string>({ type: String, default: '1rem' })
  color = prop<string>({ type: String, default: '' })
  horizontalPosition = prop<string>({
    type: String,
    default: 'right',
    validator: (value: string) => {
      return ['right', 'left'].includes(value)
    },
  })

  verticalPosition = prop<string>({
    type: String,
    default: 'bottom',
    validator: (value: string) => {
      return ['bottom', 'top'].includes(value)
    },
  })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'VaBacktop',
  components: { VaButton },
})
export default class VaBacktop extends mixins(
  PropsMixin,
) {
  visible = false
  scrolled = false
  interval = 0

  get computedStyle (): object {
    return {
      [this.verticalPosition]: this.verticalOffset,
      [this.horizontalPosition]: this.horizontalOffset,
    }
  }

  get targetElement (): Element {
    return typeof this.target === 'string'
      ? document.querySelector(this.target)
      : (this.target || this.$el.parentElement)
  }

  handleScroll (): void {
    this.visible = this.targetElement.scrollTop > this.visibilityHeight
  }

  scrollToTop (): void {
    if (this.scrolled) { return }
    this.scrolled = true
    this.interval = window.setInterval(() => {
      const next = Math.floor(this.targetElement.scrollTop - this.speed)
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

  beforeUnmount () {
    this.targetElement.removeEventListener('scroll', this.handleScroll)
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
