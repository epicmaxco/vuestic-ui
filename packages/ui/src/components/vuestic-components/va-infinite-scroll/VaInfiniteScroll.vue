<template>
  <component
    :is="$props.tag"
    class="va-infinite-scroll"
    :class="{'va-infinite-scroll--reversed': $props.reverse}"
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
        v-if="!$props.disabled"
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

<script lang="ts">
import { debounce } from 'lodash'
import { watch } from 'vue'
import { mixins, Options, prop, Vue } from 'vue-class-component'

import { sleep } from '../../../services/utils'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { VaProgressCircle } from '../va-progress-bar'

class InfiniteScrollProps {
  load = prop<Function>({ type: Function, required: true })
  offset = prop<number>({ type: Number, default: 500 })
  reverse = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  scrollTarget = prop<Element | string>({ type: [Element, String], default: null })
  debounce = prop<number>({ type: Number, default: 100 })
  tag = prop<string>({ type: String, default: 'div' })
}

const InfiniteScrollPropsMixin = Vue.with(InfiniteScrollProps)

@Options({
  name: 'VaInfiniteScroll',
  components: { VaProgressCircle },
})
export default class VaInfiniteScroll extends mixins(
  ColorMixin,
  InfiniteScrollPropsMixin,
) {
  index = 0
  fetching = false
  error = false
  initialHeight: any = null
  debouncedLoad!: any
  scrollTop!: number

  created () {
    watch(() => this.$props.disabled, (value) => {
      if (value) {
        this.stop()
      } else {
        this.resume()
      }
    })

    watch(() => this.$props.debounce, (value) => {
      this.setDebounce(value as number)
    })
  }

  get scrollAmount () {
    return this.$props.offset as number + 1 + this.$el.offsetHeight
  }

  get scrollTargetElement () {
    return typeof this.$props.scrollTarget === 'string'
      ? document.querySelector(this.$props.scrollTarget)
      : this.$props.scrollTarget || this.$el.parentElement
  }

  get colors () {
    return {
      primary: this.theme.getColor('primary', '#23e066'),
      danger: this.theme.getColor('danger', '#e34b4a'),
    }
  }

  onLoad () {
    if (this.$props.disabled || this.error || this.fetching) {
      return
    }

    const { scrollTop, scrollHeight } = this.scrollTargetElement
    const containerHeight = this.scrollTargetElement.offsetHeight
    const isLoadingRequired = this.$props.reverse
      ? scrollTop < this.scrollAmount
      : scrollTop + containerHeight + this.scrollAmount >= scrollHeight
    if (!isLoadingRequired) { return }

    this.fetching = true
    this.scrollTop = this.$props.reverse ? 0 : (this as any).$el.offsetHeight
    this.initialHeight = this.$el.offsetHeight
    this.$props.load()
      .then(this.finishLoading).catch(this.onError)
  }

  onError () {
    this.stop()
    this.error = true
    this.fetching = true
    sleep(1200)
      .then(this.stopErrorDisplay)
      .then(this.resume)
  }

  stopErrorDisplay () {
    this.scrollTargetElement.scrollTop = this.$props.reverse
      ? this.scrollAmount
      : this.scrollTargetElement.scrollTop - this.scrollTargetElement.offsetHeight - this.scrollAmount
    this.error = false
    this.fetching = false
  }

  finishLoading () {
    this.fetching = false
    if (this.$props.reverse) {
      this.scrollTargetElement.scrollTop = this.$el.offsetHeight - this.initialHeight
    }
  }

  resume () {
    if (!this.$props.disabled) {
      this.scrollTargetElement.addEventListener(
        'scroll',
        this.debouncedLoad,
        {
          passive: true,
        },
      )
    }
  }

  stop () {
    if (this.$props.disabled) {
      return
    }

    this.fetching = false
    this.scrollTargetElement.removeEventListener(
      'scroll',
      this.debouncedLoad,
      { passive: true },
    )
  }

  setDebounce (value: number) {
    this.debouncedLoad = debounce(this.onLoad, value)
  }

  mounted () {
    if (!this.scrollTargetElement) {
      return
    }
    this.scrollTargetElement.style.overflowY = 'scroll'

    if (this.$props.reverse) {
      this.scrollTargetElement.scrollTop = this.scrollTargetElement.scrollHeight
    }

    this.setDebounce(this.$props.debounce as number)
    this.scrollTargetElement.addEventListener('scroll', this.debouncedLoad, {
      passive: true,
    })
  }

  beforeUnmount () {
    if (!this.$props.disabled) {
      this.scrollTargetElement.removeEventListener(
        'scroll',
        this.debouncedLoad,
        { passive: true },
      )
    }
  }
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
