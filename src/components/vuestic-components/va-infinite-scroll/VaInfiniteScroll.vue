<template>
  <div
    class="va-infinite-scroll"
    :class="{reverse: reverse}"
  >
    <slot
      name="default"
      ref="content"
    />
    <slot
      name="loading"
      v-if="fetching"
    >
      <div>Loading...</div>
    </slot>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'VaInfiniteScroll',
  props: {
    offset: {
      type: Number,
      default: 1,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    scrollTarget: {
      type: [Element, String],
      required: false,
      default: null,
    },
    debounce: {
      type: Number,
      required: false,
      default: 100,
    },
  },
  data () {
    return {
      index: 0,
      fetching: false,
      working: true,
    }
  },
  watch: {
    disabled (value) {
      if (value) {
        this.stop()
      } else {
        this.resume()
      }
    },
    debounce (value) {
      this.setDebounce(value)
    },
  },
  methods: {
    checkForLoad () {
      if (this.disabled || this.fetching || !this.working) {
        return
      }

      const { scrollTop, scrollHeight } = this.scrollTargetElement
      const containerHeight = this.scrollTargetElement.offsetHeight
      const isLoadingRequired = this.reverse
        ? scrollTop < this.offset
        : scrollTop + containerHeight + this.offset >= scrollHeight
      if (isLoadingRequired) {
        this.load()
      }
    },
    load () {
      if (this.disabled || this.fetching || !this.working) {
        return
      }

      this.fetching = true
      const initialHeight = this.$slots.default[0].elm.offsetHeight

      this.$emit('load', stop => {
        if (!this.working) {
          return
        }
        this.$nextTick(() => {
          this.fetching = false
          if (this.reverse) {
            const heightDifference =
              this.$slots.default[0].elm.offsetHeight - initialHeight
            this.scrollTargetElement.scrollTop = heightDifference
          }
        })
      })
    },
    resume () {
      if (!this.working) {
        this.working = true
        this.scrollTargetElement.addEventListener(
          'scroll',
          this.debouncedLoad,
          {
            passive: true,
          },
        )
      }
      this.checkForLoad()
    },
    stop () {
      if (!this.working) {
        return
      }

      this.working = false
      this.fetching = false
      this.scrollTargetElement.removeEventListener(
        'scroll',
        this.debouncedLoadd,
        { passive: true },
      )
    },
    setDebounce (value) {
      this.debouncedLoad = _.debounce(this.checkForLoad, value)
    },
  },
  mounted () {
    if (!this.scrollTargetElement) {
      return
    }
    this.scrollTargetElement.style.overflowY = 'scroll'

    if (this.reverse) {
      this.scrollTargetElement.scrollTop = this.scrollTargetElement.scrollHeight
    }

    this.setDebounce(this.debounce)
    this.scrollTargetElement.addEventListener('scroll', this.debouncedLoad, {
      passive: true,
    })
  },
  beforeDestroy () {
    if (this.working) {
      this.scrollTargetElement.removeEventListener(
        'scroll',
        this.debouncedLoad,
        { passive: true },
      )
    }
  },
  computed: {
    scrollTargetElement () {
      return typeof this.scrollTarget === 'string'
        ? document.querySelector(this.scrollTarget)
        : this.scrollTarget || this.$el.parentElement
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/global/utility-global";

.va-infinite-scroll {
  display: flex;
  flex-direction: column;

  &.reverse {
    flex-direction: column-reverse;
  }

  ul {
    @extend .va-unordered;
  }
}
</style>
