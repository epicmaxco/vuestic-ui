<template>
  <div
    class="va-infinite-scroll"
    :class="{reverse: reverse}"
  >
    <slot name="default" />
    <slot name="loading" />
  </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  name: 'VaInfiniteScroll',
  props: {
    offset: {
      type: Number,
      required: false,
      default: 1,
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    scrollTarget: {
      type: [Element, String],
      required: true,
    },
    debounce: {
      type: Number,
      required: false,
      default: 100,
    },
  },
  mounted () {
    this.scrollTargetElement.style.overflow = 'scroll'
    this.scrollTargetElement.onscroll = this.loadData()
  },
  methods: {
    loadData () {
      const content = this.$slots.default[0].elm
      const scrollTop = this.scrollTargetElement.scrollTop
      const diffHeight =
        content.offsetHeight - this.scrollTargetElement.offsetHeight
      const isLoadRequired =
        !this.isLoading &&
        !this.disabled &&
        (this.reverse
          ? scrollTop <= this.offset
          : diffHeight >= scrollTop - this.offset)
      if (isLoadRequired) {
        return this.getDebouncedLoad()
      }
    },
    getDebouncedLoad () {
      return _.debounce(event => {
        console.log('load')
        !this.disabled && this.$emit('load')
      }, this.debounce)
    },
  },
  computed: {
    isLoading () {
      return !!this.$slots.loading
    },
    scrollTargetElement () {
      return typeof this.scrollTarget === 'string'
        ? document.querySelector(this.scrollTarget)
        : this.scrollTarget
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import "../../vuestic-sass/global/typography";
@import "../../vuestic-sass/global/utility-global";

.va-infinite-scroll {
  display: flex;
  flex-direction: column;

  &.reverse {
    flex-direction: column-reverse;
  }

  // NOTE Ideally we want this to work with mixins too, but no idea how to achieve that :/.
  ol {
    @extend .va-ordered;
  }

  ul {
    @extend .va-unordered;
  }
}
</style>
