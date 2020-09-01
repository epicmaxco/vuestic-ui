<template>
  <div class="va-carousel">
    <div
      class="va-carousel-wrapper"
      ref="wrapper"
      :style="{maxWidth: carouselWidth + 'px'}"
    >
      <div class="va-carousel__content">
        <slot name="content"></slot>
      </div>
      <div
        class="va-carousel-inner"
        ref="inner"
        :style="innerStyles"
      >
        <slot></slot>
      </div>
    </div>

    <slot name="navigation" v-if="navigation">
      <va-carousel-navigation
        v-if="isNavigationRequired"
        @click="handleNavigation"
      />
    </slot>

    <slot name="pagination" v-if="pagination">
      <va-carousel-pagination
        :position="c_paginationPosition"
        @click="goToPage($event)"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { debounce } from 'lodash'

import VaCarouselNavigation from './VaCarouselNavigation.vue'
import VaCarouselPagination from './VaCarouselPagination.vue'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { AutoplayMixin } from './helpers/AutoplayMixin'

const PropsMixin = makeContextablePropsMixin({
  value: { type: Number },
  loop: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  navigation: { type: Boolean, default: false },
  pagination: { type: Boolean, default: false },
  paginationPosition: {
    type: String,
    default: 'bottom',
    validator: (value: string) => {
      return ['top', 'right', 'bottom', 'left'].includes(value)
    },
  },
})

@Component({
  name: 'VaCarousel',
  components: {
    VaCarouselNavigation,
    VaCarouselPagination,
  },
  provide () {
    return {
      carousel: this,
    }
  },
})
export default class VaCarousel extends Mixins(
  AutoplayMixin,
  PropsMixin,
) {
  carouselWidth = 0
  currentPage = 0
  dragging = false
  dragMomentum = 0
  dragOffset = 0
  dragStartY = 0
  dragStartX = 0
  isTouch = typeof window !== 'undefined' && 'ontouchstart' in window
  offset = 0
  refreshRate = 16
  slideCount = 0
  resistanceCoef = 20

  @Watch('value')
  onValueChanged (val: number) {
    if (val !== this.currentPage) {
      this.goToPage(val)
      this.renderItem()
    }
  }

  @Watch('currentPage')
  onCurrentPageChanged (val: number) {
    this.$emit('input', val)
  }

  get innerStyles () {
    return {
      transform: `translate(${this.currentOffset}px, 0)`,
      transition: this.dragging ? 'none' : '0.5s ease-out transform',
      'ms-flex-preferred-size': `${this.slideWidth}px`,
      'webkit-flex-basis': `${this.slideWidth}px`,
      'flex-basis': `${this.slideWidth}px`,
      visibility: this.slideWidth ? 'visible' : 'hidden',
      height: 'auto',
    }
  }

  get canAdvanceForward () {
    return this.loop || this.offset < this.maxOffset
  }

  get canAdvanceBackward () {
    return this.loop || this.currentPage > 0
  }

  get currentOffset () {
    return -(this.offset + this.dragOffset)
  }

  get isHidden () {
    return this.carouselWidth <= 0
  }

  get maxOffset () {
    return Math.max(
      this.slideWidth * (this.slideCount - 1),
      0,
    )
  }

  get pageCount () {
    return Math.ceil(this.slideCount / 1)
  }

  get slideWidth () {
    const width = this.carouselWidth
    const perPage = 1
    return width / perPage
  }

  get isNavigationRequired () {
    return this.slideCount > 1
  }

  getNextPage () {
    if (this.currentPage < this.pageCount - 1) {
      return this.currentPage + 1
    }
    return this.loop ? 0 : this.currentPage
  }

  getPreviousPage () {
    if (this.currentPage > 0) {
      return this.currentPage - 1
    }
    return this.loop ? this.pageCount - 1 : this.currentPage
  }

  advancePage (direction: string) {
    if (direction && direction === 'backward' && this.canAdvanceBackward) {
      this.goToPage(this.getPreviousPage())
    } else if (
      (!direction || (direction && direction !== 'backward')) &&
        this.canAdvanceForward
    ) {
      this.goToPage(this.getNextPage())
    }
  }

  goToLastItem () {
    this.dragging = true
    setTimeout(() => {
      this.dragging = false
    }, this.refreshRate)
    this.$nextTick(() => {
      this.goToPage(this.pageCount)
    })
  }

  attachMutationObserver () {
    const MutationObserver = window.MutationObserver
    if (MutationObserver) {
      const config = {
        attributes: true,
        data: true,
      }
      this.mutationObserver = new MutationObserver(() => {
        this.$nextTick(() => {
          this.computeCarouselWidth()
        })
      })
      if (this.$parent.$el) {
        const carouselInnerElements = this.$el.getElementsByClassName(
          'va-carousel-inner',
        )
        for (let i = 0; i < carouselInnerElements.length; i++) {
          this.mutationObserver.observe(carouselInnerElements[i], config)
        }
      }
    }
  }

  handleNavigation (direction: string) {
    this.advancePage(direction)
  }

  detachMutationObserver () {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }

  getBrowserWidth () {
    return window.innerWidth
  }

  getCarouselWidth () {
    const carouselItems = this.$children.filter((child: any) => child.carouselItem)
    this.carouselWidth = carouselItems[this.currentPage].$el.clientWidth
  }

  getItemCount () {
    this.slideCount =
      (this.$slots &&
        this.$slots.default &&
        this.$slots.default.filter((slot: any) => slot.componentInstance &&
          slot.componentInstance.carouselItem).length) || 0
  }

  goToPage (page: number) {
    if (page >= 0 && page <= this.pageCount) {
      this.offset = Math.min(this.slideWidth * 1 * page, this.maxOffset)
      // update the current page
      this.currentPage = page
    }
  }

  onStart (e: any) {
    if (e.button === 2) {
      return
    }
    document.addEventListener(
      this.isTouch ? 'touchend' : 'mouseup',
      this.onEnd,
      true,
    )
    document.addEventListener(
      this.isTouch ? 'touchmove' : 'mousemove',
      this.onDrag,
      true,
    )
    this.startTime = e.timeStamp
    this.dragging = true
    this.dragStartX = this.isTouch ? e.touches[0].clientX : e.clientX
    this.dragStartY = this.isTouch ? e.touches[0].clientY : e.clientY
  }

  onEnd (e: any) {
    const eventPosX = this.isTouch ? e.changedTouches[0].clientX : e.clientX
    const deltaX = this.dragStartX - eventPosX
    this.dragMomentum = deltaX / (e.timeStamp - this.startTime)
    if (Math.abs(deltaX) >= 10) {
      const width = this.slideWidth * 1
      this.dragOffset = this.dragOffset + Math.sign(deltaX) * (width / 2)
    }
    this.offset += this.dragOffset
    this.dragOffset = 0
    this.dragging = false
    this.renderItem()
    document.removeEventListener(
      this.isTouch ? 'touchend' : 'mouseup',
      this.onEnd,
      true,
    )
    document.removeEventListener(
      this.isTouch ? 'touchmove' : 'mousemove',
      this.onDrag,
      true,
    )
  }

  onDrag (e: any) {
    const eventPosX = this.isTouch ? e.touches[0].clientX : e.clientX
    const eventPosY = this.isTouch ? e.touches[0].clientY : e.clientY
    const newOffsetX = this.dragStartX - eventPosX
    const newOffsetY = this.dragStartY - eventPosY
    if (this.isTouch && Math.abs(newOffsetX) < Math.abs(newOffsetY)) {
      return
    }
    e.stopImmediatePropagation()
    this.dragOffset = newOffsetX
    const nextOffset = this.offset + this.dragOffset
    if (nextOffset < 0) {
      this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset)
    } else if (nextOffset > this.maxOffset) {
      this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset)
    }
  }

  onResize () {
    this.computeCarouselWidth()
    this.dragging = true
    this.renderItem()
    setTimeout(() => {
      this.dragging = false
    }, this.refreshRate)
  }

  renderItem () {
    this.offset +=
          Math.max(
            -1 + 1,
            Math.min(Math.round(this.dragMomentum), 1 - 1),
          ) * this.slideWidth

    const width = this.slideWidth * 1
    const lastFullPageOffset =
        width * Math.floor(this.slideCount / (1 - 1))
    const remainderOffset =
        lastFullPageOffset +
        this.slideWidth * (this.slideCount % 1)
    if (this.offset > (lastFullPageOffset + remainderOffset) / 2) {
      this.offset = remainderOffset
    } else {
      this.offset = width * Math.round(this.offset / width)
    }
    this.offset = Math.max(0, Math.min(this.offset, this.maxOffset))
    this.currentPage = Math.round(this.offset / this.slideWidth / 1)
  }

  computeCarouselWidth () {
    this.getItemCount()
    this.getBrowserWidth()
    this.getCarouselWidth()
    this.setCurrentPageInBounds()
  }

  setCurrentPageInBounds () {
    if (!this.canAdvanceForward) {
      const setPage = this.pageCount - 1
      this.currentPage = setPage >= 0 ? setPage : 0
      this.offset = Math.max(0, Math.min(this.offset, this.maxOffset))
    }
  }

  handleTransitionStart () {
    this.$emit('transition-start')
  }

  handleTransitionEnd () {
    this.$emit('transition-end')
  }

  addEventListeners () {
    window.addEventListener(
      'resize',
      debounce(this.onResize, this.refreshRate),
    )
    if (this.isTouch || this.draggable) {
      (this as any).$refs.wrapper.addEventListener(
        this.isTouch ? 'touchstart' : 'mousedown',
        this.onStart,
      )
    }
    ;(this as any).$refs.inner.addEventListener('webkitTransitionStart', this.handleTransitionStart)
    ;(this as any).$refs.inner.addEventListener('webkitTransitionEnd', this.handleTransitionEnd)
  }

  removeEventListeners () {
    window.removeEventListener('resize', this.getBrowserWidth)
    ;(this as any).$refs.inner.removeEventListener('webkitTransitionStart', this.handleTransitionStart)
    ;(this as any).$refs.inner.removeEventListener('webkitTransitionEnd', this.handleTransitionEnd)
    ;(this as any).$refs.wrapper.removeEventListener(
      this.isTouch ? 'touchstart' : 'mousedown',
      this.onStart,
    )
  }

  mounted () {
    this.addEventListeners()
    this.attachMutationObserver()
    this.computeCarouselWidth()
  }

  beforeUpdate () {
    this.computeCarouselWidth()
  }

  beforeDestroy () {
    this.detachMutationObserver()
    this.removeEventListeners()
  }
}
</script>

<style lang="scss" scoped>
@import '../../vuestic-sass/resources/resources';

.va-carousel {
  display: flex;
  flex-direction: column;
  position: relative;

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 70;
  }

  &-wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  &-inner {
    display: flex;
    flex-direction: row;
    backface-visibility: hidden;
  }
}
</style>
