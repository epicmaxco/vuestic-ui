<template>
  <div
    class="va-parallax"
    :style="computedWrapperStyles"
  >
    <div class="va-parallax__image-container">
      <img
        class="va-parallax__image"
        ref="img"
        :src="src"
        :alt="alt"
        :style="computedImgStyles"
      />
    </div>
    <div class="va-parallax__item-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'VaParallax',
})
export default class VaParallax extends Vue {
  elOffsetTop = 0
  parallax = 0
  parallaxDist = 0
  percentScrolled = 0
  scrollTop = 0
  windowHeight = 0
  windowBottom = 0
  isLoaded = false

  @Prop({ type: [Element, String], default: '' }) target!: Element | string
  @Prop({ type: String, default: '', required: true }) src!: string
  @Prop({ type: String, default: 'parallax' }) alt!: string
  @Prop({ type: Number, default: 400 }) height!: number
  @Prop({ type: Boolean, default: false }) reversed!: boolean
  @Prop({
    type: Number,
    default: 0.5,
    validator: (value: number) => {
      return value >= 0 && value <= 1
    },
  }) speed!: number

  get computedWrapperStyles (): object {
    return {
      height: this.height + 'px',
    }
  }

  get targetElement () {
    return typeof this.target === 'string'
      ? document.querySelector(this.target)
      : this.target || this.$el.parentElement
  }

  get computedImgStyles (): object {
    return {
      display: 'block',
      transform: `translate(-50%, ${this.parallax}px)`,
      opacity: this.isLoaded ? 1 : 0,
      top: this.reversed ? 0 : 'auto',
    }
  }

  get imgHeight (): number {
    return (this as any).$refs.img.naturalHeight
  }

  calcDimensions (): void {
    const offset = this.$el.getBoundingClientRect()

    this.scrollTop = (this.targetElement as HTMLElement).scrollTop
    this.parallaxDist = this.imgHeight - this.height
    this.elOffsetTop = offset.top + this.scrollTop
    this.windowHeight = window.innerHeight
    this.windowBottom = this.scrollTop + this.windowHeight
  }

  translate (): void {
    this.calcDimensions()
    this.percentScrolled = (
      (this.windowBottom - this.elOffsetTop) /
      (this.height + this.windowHeight)
    )
    this.parallax = Math.round(this.parallaxDist * this.percentScrolled) * this.speed
    if (this.reversed) {
      this.parallax = -this.parallax
    }
  }

  addEventListeners (): void {
    (this.targetElement as HTMLElement).addEventListener('scroll', this.translate)
    ;(this.targetElement as HTMLElement).addEventListener('resize', this.translate)
  }

  removeEventListeners (): void {
    (this.targetElement as HTMLElement).removeEventListener('scroll', this.translate)
    ;(this.targetElement as HTMLElement).removeEventListener('resize', this.translate)
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

  beforeDestroy () {
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
