<template>
  <div
    class="va-carousel-item"
    role="tabpanel"
    tabindex="-1"
    :style="itemStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'

@Component({
  name: 'VaCarouselItem',
})
export default class VaCarouselItem extends Vue {
  carouselItem = true
  width = 0
  height = 0

  @Inject() readonly carousel!: any

  get itemStyle () {
    return {
      width: this.width > 0 ? this.width + 'px' : 'auto',
      height: this.height > 0 ? this.height + 'px' : 'auto',
    }
  }

  onTouchEnd (e: any) {
    const eventPosX =
        this.carousel.isTouch && e.changedTouches && e.changedTouches.length > 0
          ? e.changedTouches[0].clientX
          : e.clientX
    const deltaX = this.carousel.dragStartX - eventPosX
    if (
      this.carousel.minSwipeDistance === 0 ||
        Math.abs(deltaX) < this.carousel.minSwipeDistance
    ) {
      this.$emit('item-click', Object.assign({}, e.currentTarget.dataset))
    }
  }

  mounted () {
    this.width = this.carousel.c_width
    this.height = this.carousel.c_height
    if (!this.$isServer) {
      this.$el.addEventListener('dragstart', e => e.preventDefault())
    }
    this.$el.addEventListener(
      this.carousel.isTouch ? 'touchend' : 'mouseup',
      this.onTouchEnd,
    )
  }
}
</script>

<style>
.va-carousel-item {
  flex-basis: inherit;
  flex-grow: 0;
  flex-shrink: 0;
  user-select: none;
  backface-visibility: hidden;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
}
</style>
