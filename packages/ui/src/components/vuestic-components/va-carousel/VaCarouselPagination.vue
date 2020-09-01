<template>
  <div
    v-show="carousel.pageCount > 1"
    class="va-carousel-pagination"
    :style="paginationStyle"
  >
    <div
      class="va-carousel-pagination__dot-container"
      :style="dotContainerStyle"
      role="tablist"
    >
      <button
        v-for="(page, index) in paginationCount"
        :key="`${page}_${index}`"
        class="va-carousel-pagination__dot"
        aria-hidden="false"
        role="tab"
        :title="getDotTitle(index)"
        :value="getDotTitle(index)"
        :aria-label="getDotTitle(index)"
        :aria-selected="isCurrentDot(index) ? 'true' : 'false'"
        :class="{ 'va-carousel-pagination-dot--active': isCurrentDot(index) }"
        @click="goToPage(index)"
        :style="dotStyle(index)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Inject } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

const PropsMixin = makeContextablePropsMixin({
  position: { type: String, default: 'bottom' },
})

@Component({
  name: 'VaCarouselPagination',
})
export default class VaCarouselPagination extends Mixins(
  ColorThemeMixin,
  PropsMixin,
) {
  @Inject() readonly carousel!: any

  get paginationStyle () {
    return {
      width: ['top', 'bottom'].includes(this.c_position) ? '100%' : 'auto',
      height: ['left', 'right'].includes(this.c_position) ? '100%' : 'auto',
      [this.c_position]: 0,
    }
  }

  get dotContainerStyle () {
    return {
      flexDirection: ['top', 'bottom'].includes(this.c_position) ? 'row' : 'column',
      [`padding-${this.c_position}`]: '0.5rem',
    }
  }

  get paginationCount () {
    return this.carousel && this.carousel.scrollPerPage
      ? this.carousel.pageCount
      : this.carousel.slideCount || 0
  }

  goToPage (index: number) {
    this.$emit('click', index)
  }

  isCurrentDot (index: number) {
    return index === this.carousel.currentPage
  }

  getDotTitle (index: number) {
    return this.carousel.$children[index].title
      ? this.carousel.$children[index].title
      : `Item ${index}`
  }

  dotStyle (index: number) {
    const basicBtnStyle = {
      backgroundColor: this.colorComputed,
      padding: '0.5rem',
      width: '0.6rem',
      height: '0.6rem',
      opacity: this.isCurrentDot(index) ? 1 : 0.5,
    }
    return basicBtnStyle
  }
}
</script>

<style lang="scss" scoped>
.va-carousel-pagination {
  text-align: center;
  position: absolute;
  z-index: 90;

  &__dot-container {
    display: flex;
    margin: 0 auto;
    padding: 0;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  &__dot {
    display: inline-block;
    cursor: pointer;
    appearance: none;
    border: none;
    background-clip: content-box;
    box-sizing: content-box;
    padding: 0;
    border-radius: 100%;
    outline: none;
  }
}
</style>
