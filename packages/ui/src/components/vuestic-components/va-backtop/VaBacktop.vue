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
import { Component, Prop, Vue } from 'vue-property-decorator'
import VaButton from '../va-button/VaButton.vue'

@Component({
  name: 'VaBacktop',
  components: { VaButton },
})
export default class VaBacktop extends Vue {
  visible = false
  scrolled = false
  interval = 0

  @Prop({ type: [Element, String, Window], default: () => window }) target!: string | Element
  @Prop({ type: Number, default: 300 }) visibilityHeight!: number
  @Prop({ type: Number, default: 50 }) speed!: number
  @Prop({ type: String, default: '1rem' }) verticalOffset!: string
  @Prop({ type: String, default: '1rem' }) horizontalOffset!: string
  @Prop({ type: String, default: '' }) color!: string
  @Prop({
    type: String,
    default: 'right',
    validator: (value: string) => {
      return ['right', 'left'].includes(value)
    },
  },
  ) horizontalPosition!: string

  @Prop({
    type: String,
    default: 'bottom',
    validator: (value: string) => {
      return ['bottom', 'top'].includes(value)
    },
  },
  ) verticalPosition!: string

  get computedStyle (): object {
    return {
      [this.verticalPosition]: this.verticalOffset,
      [this.horizontalPosition]: this.horizontalOffset,
    }
  }

  get targetElement (): Element | null {
    return typeof this.target === 'string'
      ? document.querySelector(this.target)
      : this.target || this.$el.parentElement
  }

  handleScroll (): void {
    this.visible = (this.targetElement as Element).scrollTop > this.visibilityHeight
  }

  scrollToTop (): void {
    if (this.scrolled) { return }
    this.scrolled = true
    this.interval = window.setInterval(() => {
      const next = Math.floor((this.targetElement as Element).scrollTop - this.speed)
      if (this.targetElement?.scrollTop === 0) {
        clearInterval(this.interval)
        this.scrolled = false
      } else {
        (this.targetElement as Element).scrollTo(0, next)
      }
    }, 15)
  }

  mounted () {
    (this.targetElement as Element).addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy () {
    (this.targetElement as Element).removeEventListener('scroll', this.handleScroll)
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
