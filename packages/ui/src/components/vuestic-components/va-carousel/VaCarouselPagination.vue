<template>
  <div
    v-show="carousel.pageCount > 1"
    class="va-carousel-pagination"
  >
    <div class="va-carousel-pagination__dot-container" role="tablist">
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
        v-bind:class="{ 'va-carousel-pagination-dot--active': isCurrentDot(index) }"
        v-on:click="goToPage(index)"
        :style="dotStyle(index)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'

@Component({
  name: 'VaCarouselPagination',
})
export default class VaCarouselPagination extends Vue {
  @Inject() readonly carousel!: any

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
      padding: '0.5rem',
      width: '0.6rem',
      height: '0.6rem',
      'background-color': `${
          this.isCurrentDot(index)
            ? '#000'
            : '#fff'
        }`,
    }
    return basicBtnStyle
  }
}
</script>

<style lang="scss" scoped>
.va-carousel-pagination {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;

  &__dot-container {
    display: inline-block;
    margin: 0 auto;
    padding: 0;
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
