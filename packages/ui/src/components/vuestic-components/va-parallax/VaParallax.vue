<template>
  <div
    class="va-parallax"
    :style="computedWrapperStyles"
  >
    <div class="va-parallax__image-container">
      <img
        class="va-parallax__image"
        ref="img"
        :src="$props.src"
        :alt="$props.alt"
        :style="computedImgStyles"
      />
    </div>
    <div class="va-parallax__item-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue, mixins } from 'vue-class-component'

class ParallaxProps {
  target = prop<Element | string>({ type: [Element, String], default: '' })
  src = prop<string>({ type: String, default: '', required: true })
  alt = prop<string>({ type: String, default: 'parallax' })
  height = prop<number>({ type: Number, default: 400 })
  reversed = prop<boolean>({ type: Boolean, default: false })
  speed = prop<number>({
    type: Number,
    default: 0.5,
    validator: (value: number) => {
      return value >= 0 && value <= 1
    },
  })
}

const ParallaxPropsMixin = Vue.with(ParallaxProps)

@Options({
  name: 'VaParallax',
})
export default class VaParallax extends mixins(
  ParallaxPropsMixin,
) {
  elOffsetTop = 0
  parallax = 0
  parallaxDist = 0
  percentScrolled = 0
  scrollTop = 0
  windowHeight = 0
  windowBottom = 0
  isLoaded = false

  get computedWrapperStyles (): object {
    return {
      height: this.$props.height + 'px',
    }
  }

  get targetElement () {
    return typeof this.$props.target === 'string'
      ? document.querySelector(this.$props.target)
      : this.$props.target || this.$el.parentElement
  }

  get computedImgStyles (): object {
    return {
      display: 'block',
      transform: `translate(-50%, ${this.parallax}px)`,
      opacity: this.isLoaded ? 1 : 0,
      top: this.$props.reversed ? 0 : 'auto',
    }
  }

  get imgHeight (): number {
    // @ts-ignore
    return this.$refs.img.naturalHeight
  }

  calcDimensions (): void {
    const offset = this.$el.getBoundingClientRect()

    this.scrollTop = this.targetElement.scrollTop
    this.parallaxDist = this.imgHeight - (this.$props.height as number)
    this.elOffsetTop = offset.top + this.scrollTop
    this.windowHeight = window.innerHeight
    this.windowBottom = this.scrollTop + this.windowHeight
  }

  translate (): void {
    this.calcDimensions()
    this.percentScrolled = (
      (this.windowBottom - this.elOffsetTop) /
      ((this.$props.height as number) + this.windowHeight)
    )
    this.parallax = Math.round(this.parallaxDist * this.percentScrolled) * (this.$props.speed as number)
    if (this.$props.reversed) {
      this.parallax = -this.parallax
    }
  }

  addEventListeners (): void {
    this.targetElement.addEventListener('scroll', this.translate)
    this.targetElement.addEventListener('resize', this.translate)
  }

  removeEventListeners (): void {
    this.targetElement.removeEventListener('scroll', this.translate)
    this.targetElement.removeEventListener('resize', this.translate)
  }

  initImage (): void {
    const img: HTMLImageElement = this.$refs.img as HTMLImageElement
    if (img.complete) {
      this.translate()
      this.addEventListeners()
    } else {
      img.addEventListener('load', () => {
        this.translate()
        this.addEventListeners()
      }, false)
    }
    this.isLoaded = true
  }

  mounted () {
    this.initImage()
  }

  beforeUnmount () {
    this.removeEventListeners()
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-parallax {
  display: block;
  position: relative;
  overflow: hidden;
  width: auto;
  z-index: 0;

  &__image-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    contain: strict;
    user-select: none;
  }

  &__image {
    position: absolute;
    bottom: 0;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    display: none;
    transform: translate(-50%, 0);
    will-change: transform;
    transition: 0.3s opacity linear;
    z-index: 1;
  }

  &__item-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    contain: strict;
  }
}
</style>
