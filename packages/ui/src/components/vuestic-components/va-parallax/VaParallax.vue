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
  target = prop<Element | string>({ type: [Object, String], default: '' })
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

  get computedWrapperStyles (): Record<string, unknown> {
    return {
      height: this.$props.height + 'px',
    }
  }

  get targetElement () {
    return typeof this.$props.target === 'string'
      ? document.querySelector(this.$props.target)
      : this.$props.target || this.$el.parentElement
  }

  get computedImgStyles (): Record<string, unknown> {
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
@import 'variables';

.va-parallax {
  display: var(--va-parallax-display);
  position: var(--va-parallax-position);
  overflow: var(--va-parallax-overflow);
  width: var(--va-parallax-width);
  z-index: var(--va-parallax-z-index);

  &__image-container {
    position: var(--va-parallax-image-container-position);
    top: var(--va-parallax-image-container-top);
    left: var(--va-parallax-image-container-left);
    right: var(--va-parallax-image-container-right);
    bottom: var(--va-parallax-image-container-bottom);
    z-index: var(--va-parallax-image-container-z-index);
    contain: var(--va-parallax-image-container-contain);
    user-select: var(--va-parallax-image-container-user-select);
  }

  &__image {
    position: var(--va-parallax-image-position);
    bottom: var(--va-parallax-image-bottom);
    left: var(--va-parallax-image-left);
    min-width: var(--va-parallax-image-min-width);
    min-height: var(--va-parallax-image-min-height);
    display: var(--va-parallax-image-display);
    transform: var(--va-parallax-image-transform);
    will-change: var(--va-parallax-image-will-change);
    transition: var(--va-parallax-image-transition);
    z-index: var(--va-parallax-image-z-index);
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
