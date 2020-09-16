<template>
  <div
    class="va-parallax"
    :style="computedWrapperStyles"
  >
    <div class="va-parallax__image-container">
      <img
        class="va-parallax__image"
        ref="img"
        :src="c_src"
        :alt="c_alt"
        :style="computedImgStyles"
      />
    </div>
    <div class="va-parallax__item-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ScrollMixin } from '../../vuestic-mixins/ScrollMixin/ScrollMixin'

const PropsMixin = makeContextablePropsMixin({
  target: { type: [Element, String], default: '' },
  src: { type: String, default: '', required: true },
  alt: { type: String, default: 'parallax' },
  height: { type: Number, default: 400 },
  reversed: { type: Boolean, default: false },
  speed: {
    type: Number,
    default: 0.5,
    validator: (value: number) => {
      return value >= 0 && value <= 1
    },
  },
})
@Component({
  name: 'VaParallax',
})
export default class VaParallax extends Mixins(
  ScrollMixin,
  PropsMixin,
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
      height: this.height + 'px',
    }
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

    this.scrollTop = this.targetElement.scrollTop
    this.parallaxDist = this.imgHeight - this.height
    this.elOffsetTop = offset.top + this.scrollTop
    this.windowHeight = window.innerHeight
    this.windowBottom = this.scrollTop + this.windowHeight
  }

  translate (): void {
    this.calcDimensions()
    this.percentScrolled = (
      (this.windowBottom - this.elOffsetTop) /
      (parseInt(this.height) + this.windowHeight)
    )
    this.parallax = Math.round(this.parallaxDist * this.percentScrolled) * this.c_speed
    if (this.c_reversed) {
      this.parallax = -this.parallax
    }
  }

  addEventListeners (): void {
    const img: HTMLImageElement = this.$refs.img as HTMLImageElement
    if (img.complete) {
      this.translate()
      this.targetElement.addEventListener('scroll', this.translate)
      this.targetElement.addEventListener('resize', this.translate)
    } else {
      img.addEventListener('load', () => {
        this.translate()
        this.targetElement.addEventListener('scroll', this.translate)
        this.targetElement.addEventListener('resize', this.translate)
      }, { once: true })
    }
    this.isLoaded = true
  }

  removeEventListeners (): void {
    this.targetElement.removeEventListener('scroll', this.translate)
    this.targetElement.removeEventListener('resize', this.translate)
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
