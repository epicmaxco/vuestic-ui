<template>
  <div class="va-parallax" :style="styleComputed" v-on="$listeners">
    <div class="va-parallax__image-container">
      <img class="va-parallax__image" ref="img" src="https://wallpapercave.com/wp/wp4748242.png" alt="" :style="computedImgStyles" />
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const ParallaxPropsMixin = makeContextablePropsMixin({
  target: { type: [String, HTMLElement], default: 'body' },
  height: { type: Number, default: 900 },
})
@Component({
  name: 'VaParallax',
})
export default class VaParallax extends Mixins(
  ParallaxPropsMixin,
) {
  isBooted = true
  elOffsetTop = 0
  parallax = 0
  parallaxDist = 0
  percentScrolled = 0
  scrollTop = 0
  windowHeight = 0
  windowBottom = 0

  get styleComputed () {
    return {
      height: this.height + 'px',
    }
  }

  get imgHeight (): number {
    return this.objHeight()
  }

  get computedDomElement (): any {
    return document.querySelector(`${this.c_target}`)
  }

  get computedImgStyles (): object {
    return {
      display: 'block',
      opacity: this.isBooted ? 1 : 0,
      transform: `translate(-50%, ${this.parallax}px)`,
    }
  }

  mounted () {
    this.translate()
    this.listeners()
  }

  beforeDestroy () {
    this.computedDomElement.removeEventListener('scroll', this.translate, false)
    this.computedDomElement.removeEventListener('resize', this.translate, false)
  }

  objHeight () {
    return (this as any).$refs.img.naturalHeight
  }

  calcDimensions () {
    const offset = this.$el.getBoundingClientRect()

    this.scrollTop = this.computedDomElement.scrollTop
    this.parallaxDist = this.imgHeight - this.height
    this.elOffsetTop = offset.top + this.scrollTop
    this.windowHeight = window.innerHeight
    this.windowBottom = this.scrollTop + this.windowHeight
  }

  listeners () {
    this.computedDomElement.addEventListener('scroll', this.translate, false)
    this.computedDomElement.addEventListener('resize', this.translate, false)
  }

  translate () {
    this.calcDimensions()
    this.percentScrolled = (
      (this.windowBottom - this.elOffsetTop) /
      (parseInt(this.height) + this.windowHeight)
    )
    console.log('this.windowBottom', this.windowBottom)
    console.log('this.elOffsetTop', this.elOffsetTop)
    console.log('this.scrollTop', this.scrollTop)
    // this.parallax = Math.round(this.parallaxDist * this.percentScrolled)
    this.parallax = Math.round(this.parallaxDist * this.percentScrolled)
    console.log('this.parallax = Math.round(this.parallaxDist * this.percentScrolled)', this.parallax = Math.round(this.parallaxDist * this.percentScrolled))
    // this.parallax = Math.round(this.elOffsetTop + this.windowBottom - this.height)
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
}

</style>
