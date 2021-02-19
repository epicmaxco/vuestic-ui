<template>
  <div
    ref="element"
    class="va-affix"
  >
    <div :style="{ visibility: isAffixed ? 'hidden' : 'inherit' }">
      <slot />
    </div>
    <div
      v-if="isAffixed"
      :class="computedClass"
      :style="computedStyle"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { noop } from 'lodash'
import { Options, prop, mixins, Vue } from 'vue-class-component'

import {
  handleThrottledEvent,
  useEventsHandlerWithThrottle,
  getWindowHeight,
  State, Context,
} from './VaAffix-utils'

class AffixProps {
  offsetTop = prop<number>({ type: Number, default: undefined })
  offsetBottom = prop<number>({ type: Number, default: undefined })
  target = prop<Function>({ type: Function, default: () => () => window })
}

const AffixPropsMixin = Vue.with(AffixProps)

@Options({
  name: 'VaAffix',
  emits: ['change'],
})
export default class VaAffix extends mixins(
  AffixPropsMixin,
) {
  private state: State = {
    isTopAffixed: false,
    isBottomAffixed: false,
  }

  private initialPosition?: undefined | ClientRect
  private clearEventListeners = noop

  get computedClass () {
    return [
      {
        'va-affix--affixed': this.isAffixed,
      },
    ]
  }

  getTargetElement () {
    // a custom target may get rendered later than
    // a component gets a property from the context
    const { target } = this
    return target()
  }

  get computedStyle () {
    const calculateTop = () => {
      const target = this.getTargetElement()

      if (this.offsetTop === undefined) {
        return
      }

      if (target !== window) {
        const { top } = (target as HTMLElement).getBoundingClientRect()
        return top + this.offsetTop
      }

      return this.offsetTop
    }

    const calculateBottom = () => {
      const target = this.getTargetElement()
      if (this.offsetBottom === undefined) {
        return
      }

      if (target !== window) {
        const { bottom } = (target as HTMLElement).getBoundingClientRect()
        const { offsetHeight, clientHeight } = (target as HTMLElement)
        const scrollBarHeight = offsetHeight - clientHeight
        const windowHeight = getWindowHeight()
        return windowHeight - (bottom - this.offsetBottom) + scrollBarHeight
      }

      return this.offsetBottom
    }

    const convertToPixels = (calculate: Function) => {
      const result = calculate()

      if (result === undefined) {
        return
      }

      return `${result}px`
    }

    return {
      top: this.state.isTopAffixed ? convertToPixels(calculateTop) : null,
      bottom: this.state.isBottomAffixed ? convertToPixels(calculateBottom) : null,
      width: `${this.state.width}px`,
    }
  }

  get isAffixed (): boolean {
    return this.state.isTopAffixed || this.state.isBottomAffixed
  }

  handleThrottledEvent (eventName: string | null, event?: Event) {
    const context: Context = {
      ...this.$data,
      ...this.$props,
      element: this.$refs.element as any,
      target: this.getTargetElement(),
      setState: this.setState.bind(this),
      getState: this.getState.bind(this),
    }

    if (!eventName || eventName === 'resize') {
      handleThrottledEvent(eventName, context)
    } else if (event && event.target) {
      const target = this.getTargetElement()

      if ((target as HTMLElement) === event.target || target === window) {
        handleThrottledEvent(eventName, context)
      } else {
        // if we have a custom target but keep scrolling on another element,
        // so just disable the affixed state
        this.setState({
          isBottomAffixed: false,
          isTopAffixed: false,
        })
      }
    }
  }

  setState (state: State) {
    this.state = state
    this.$emit('change', this.isAffixed)
  }

  getState () {
    return this.state
  }

  mounted () {
    const events = ['scroll', 'resize']

    this.initialPosition = (this.$refs.element as HTMLElement).getBoundingClientRect()

    this.clearEventListeners = useEventsHandlerWithThrottle(events, {
      handler: this.handleThrottledEvent,
    })

    this.$nextTick(() => {
      // pass `null` here to make sure it is an initial call
      this.handleThrottledEvent(null)
    })
  }

  beforeUnmount () {
    this.clearEventListeners()
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-affix {
  &--affixed {
    position: fixed;
    z-index: $zindex-affix;
  }
}
</style>
