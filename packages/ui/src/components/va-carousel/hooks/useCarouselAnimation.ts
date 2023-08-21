import { computed, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue'

export const useCarouselAnimation = (props: {
  items: any[],
  autoscrollInterval: number,
  autoscrollPauseDuration: number,
  autoscroll: boolean,
  infinite: boolean,
  effect: 'fade' | 'transition',
  vertical: boolean,
  fadeKeyframe: string,
}, currentSlide: Ref<number>) => {
  let animationInterval = -1

  const start = () => {
    if (!props.autoscroll) { return }

    clearInterval(animationInterval)
    animationInterval = setInterval(() => {
      currentSlide.value += 1
      if (currentSlide.value >= props.items.length) { currentSlide.value = 0 }
    }, props.autoscrollInterval) as any
  }

  let pauseTimeout: number
  const pause = () => {
    if (!props.autoscroll) { return }

    clearInterval(animationInterval)

    pauseTimeout = setTimeout(() => {
      start()
      clearTimeout(pauseTimeout)
    }, props.autoscrollPauseDuration) as any
  }

  const stop = () => {
    clearInterval(animationInterval)
    clearTimeout(pauseTimeout)
  }

  onMounted(() => start())
  onBeforeUnmount(() => stop())

  const withPause = <T extends (...args: any[]) => any>(fn: T) => {
    return (...args: Parameters<T>) => { pause(); fn(...args) }
  }

  const slidesContainerStyle = ref<Record<string, any>>({
    transition: undefined as string | undefined,
  })

  /**
   * Used for infinite loop. In infinite loop additional first item is placed after all items.
   * Use own currentSlider, which will not update model value if we need to show slide that placed after all items
   */
  const sliderToBeShown = ref(0)

  const computedSlidesStyle = computed(() => {
    if (props.effect === 'fade') {
      return {
        ...slidesContainerStyle.value,
        transition: 'none',
      }
    }

    if (props.vertical) {
      return {
        ...slidesContainerStyle.value,
        transform: `translateY(${sliderToBeShown.value * -100}%)`,
      }
    }

    return {
      ...slidesContainerStyle.value,
      transform: `translateX(${sliderToBeShown.value * -100}%)`,
    }
  })

  const animator = {
    isAnimating: false,

    speed: 0.3,

    order: [] as { to: number, animate?: boolean }[],

    move (from: number, to: number) {
      const last = props.items.length - 1
      const firstAfterLast = props.items.length

      if (to === 0 && from === last) {
        this.order.push({ to: firstAfterLast })
        this.order.push({ to: 0, animate: false })
      } else if (to === last && from === 0) {
        this.order.push({ to: firstAfterLast, animate: false })
        this.order.push({ to })
      } else {
        this.order.push({ to })
      }

      if (!this.isAnimating) { this.runAnimation() }
    },

    runAnimation () {
      this.isAnimating = true

      const animation = this.order.shift()

      if (!animation) { this.isAnimating = false; return }

      sliderToBeShown.value = animation?.to

      if (animation.animate || animation.animate === undefined) {
        slidesContainerStyle.value.transition = `all ${this.speed}s linear`
        setTimeout(() => { this.runAnimation() }, this.speed * 1000)
      } else {
        slidesContainerStyle.value.transition = 'none'
        setTimeout(() => { this.runAnimation() }, 16)
      }
    },
  }

  watch(currentSlide, (newValue, oldValue) => {
    animator.move(oldValue, newValue)
  })

  /** Animation should control how much slides to display */
  const slides = computed(() => {
    if (props.effect === 'fade') {
      return [props.items[currentSlide.value]]
    }

    if (props.infinite || props.autoscroll) {
      return [...props.items, props.items[0]]
    }

    return props.items
  })

  return {
    start,
    pause,
    stop,
    withPause,
    computedSlidesStyle,
    slides,
  }
}
