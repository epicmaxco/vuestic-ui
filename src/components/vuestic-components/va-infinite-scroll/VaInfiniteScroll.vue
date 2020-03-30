<template>
  <component
    :is="tag"
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
      <div class="va-infinite-scroll__spinner">
        <va-progress-circle
          size="small"
          :thickness="0.15"
          :color="error ? $themes.danger : $themes.primary"
          indeterminate
        />
      </div>
    </slot>
  </component>
</template>

<script>
import * as _ from 'lodash'
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { sleep } from '../../../services/utils'

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
      load: {
        type: Function,
        default: () => {},
      },
      tag: {
        type: String,
        default: 'div',
      },
    }),
  ],
  data () {
    return {
      index: 0,
      fetching: false,
      error: false,
      initialHeight: null,
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
    onLoad () {
      if (this.disabled || this.fetching || this.error || !this.isLoadingRequired) {
        return
      }
      this.fetching = true
      this.initialHeight = this.$el.offsetHeight

      this.load()
        .then(this.finishLoading)
        .catch(this.onError)
    },
    onError (e) {
      this.error = true
      this.fetching = true
      sleep(2000).then(this.stopErrorDisplay)
    },
    stopErrorDisplay () {
      this.error = false
      this.fetching = false
      this.$nextTick(() => {
        this.scrollTargetElement.scrollTop -= this.reversed
          ? this.scrollTargetElement.scrollTop - (this.offset + 1)
          : (this.offset + 1)
      })
    },
    finishLoading () {
      this.fetching = false
      if (this.reverse) {
        const heightDifference =
        this.$el.offsetHeight - this.initialHeight
        this.scrollTargetElement.scrollTop = heightDifference
      }
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
      this.onLoad()
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
      this.debouncedLoad = _.debounce(this.onLoad, value)
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
    isLoadingRequired() {
      const { scrollTop, scrollHeight } = this.scrollTargetElement
      const containerHeight = this.scrollTargetElement.offsetHeight
      return this.reverse
        ? scrollTop < this.offset
        : scrollTop + containerHeight + this.offset >= scrollHeight
    }
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

  &__spinner {
    width: 100%;
    min-height: 60px;

    @include flex-center();
  }
}
</style>
