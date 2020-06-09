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
    <div
      class="va-infinite-scroll__spinner"
      :class="{'va-infinite-scroll__spinner--invisible': !fetching}"
      ref="loadingSlotContainer"
    >
      <slot
        name="loading"
        v-if="!disabled"
      >
        <div
          ref="defaultSpinner"
          class="va-infinite-scroll__spinner__default"
        >
          <va-progress-circle
            size="small"
            :thickness="0.15"
            :color="error ? colors.danger : colors.primary"
            indeterminate
          />
        </div>
      </slot>
    </div>
  </component>
</template>

<script>
import { debounce } from 'lodash'
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'
import { sleep } from '../../../services/utils'

export default {
  name: 'VaInfiniteScroll',
  components: { VaProgressCircle },
  mixins: [
    makeContextablePropsMixin({
      offset: {
        type: Number,
        default: 500,
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
      if (this.disabled || this.error || this.fetching) {
        return
      }

      const { scrollTop, scrollHeight } = this.scrollTargetElement
      const containerHeight = this.scrollTargetElement.offsetHeight
      const isLoadingRequired = this.reverse
        ? scrollTop < this.scrollAmount
        : scrollTop + containerHeight + this.scrollAmount >= scrollHeight
      if (!isLoadingRequired) { return }

      this.fetching = true
      this.scrollTop = this.reverse ? 0 : this.$el.offsetHeight
      this.initialHeight = this.$el.offsetHeight
      this.load()
        .then(this.finishLoading).catch(this.onError)
    },
    onError () {
      this.stop()
      this.error = true
      this.fetching = true
      sleep(1200)
        .then(this.stopErrorDisplay)
        .then(this.resume)
    },
    stopErrorDisplay () {
      this.scrollTargetElement.scrollTop = this.reverse
        ? this.scrollAmount
        : this.scrollTargetElement.scrollTop - this.scrollTargetElement.offsetHeight - this.scrollAmount
      this.error = false
      this.fetching = false
    },
    finishLoading () {
      this.fetching = false
      if (this.reverse) {
        const heightDifference = this.$el.offsetHeight - this.initialHeight
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
      this.debouncedLoad = debounce(this.onLoad, value)
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
    scrollAmount () {
      return this.offset + 1 + this.$el.offsetHeight
    },
    scrollTargetElement () {
      return typeof this.scrollTarget === 'string'
        ? document.querySelector(this.scrollTarget)
        : this.scrollTarget || this.$el.parentElement
    },
    colors () {
      return { primary: getColor(this, 'primary', '#23e066'), danger: getColor(this, 'danger', '#e34b4a') }
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

  &__spinner {
    &__default {
      @include flex-center();

      width: 100%;
      min-height: 70px;
    }

    &--invisible {
      visibility: hidden !important;
    }

    @include flex-center();
  }
}
</style>
