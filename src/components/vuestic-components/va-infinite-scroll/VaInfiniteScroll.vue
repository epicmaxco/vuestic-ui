<template>
  <div
    class="va-infinite-scroll"
    :class="{'va-infinite-scroll--reversed': reverse}"
  >
    <slot
      name="default"
      ref="content"
    />
    <slot
      name="loading"
      v-if="fetching"
    >
      <div class="spinner">
        <va-progress-circle
          size="small"
          :thickness="0.15"
          indeterminate
        />
      </div>
    </slot>
  </div>
</template>

<script>
import * as _ from 'lodash'
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaInfiniteScroll',
  components: { VaProgressCircle },
  mixins: [
    makeContextablePropsMixin({
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
        default: null,
      },
      debounce: {
        type: Number,
        default: 100,
      },
    }),
  ],
  data () {
    return {
      index: 0,
      fetching: false,
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
      if (this.disabled || this.fetching) {
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
      if (this.disabled || this.fetching) {
        return
      }

      this.fetching = true
      const initialHeight = this.$slots.default[0].elm.offsetHeight

      this.$emit('load', stop => {
        if (this.disabled) {
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
      if (!this.disabled) {
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
      if (this.disabled) {
        return
      }

      this.fetching = false
      this.scrollTargetElement.removeEventListener(
        'scroll',
        this.debouncedLoad,
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
    if (!this.disabled) {
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

<style scoped lang="scss">
@import "./../../../components/vuestic-sass/resources/resources";

.va-infinite-scroll {
  display: flex;
  flex-direction: column;

  &--reversed {
    flex-direction: column-reverse;
  }

  .spinner {
    width: 100%;
    min-height: 60px;

    @include flex-center();
  }
}
</style>
