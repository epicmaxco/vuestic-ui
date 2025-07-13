import { computed, onBeforeUnmount, onMounted, ref, Ref, watch, unref, MaybeRef } from 'vue'

export const useCarouselAutoScroll = (currentSlide: Ref<number>, options: MaybeRef<{
  slidesCount: number,
  autoscroll?: boolean,
  autoscrollInterval?: number,
  autoscrollPauseDuration?: number,
}>) => {
  let animationInterval = -1
  let pauseTimeout = -1

  let ignoreWatch = false
  const start = () => {
    const { autoscroll, autoscrollInterval } = unref(options)

    if (!autoscroll) { return }

    clearInterval(animationInterval)
    animationInterval = setInterval(() => {
      ignoreWatch = true
      currentSlide.value += 1
      if (currentSlide.value >= unref(options).slidesCount) { currentSlide.value = 0 }
    }, autoscrollInterval) as any
  }

  watch(currentSlide, (newValue) => {
    if (!ignoreWatch) { return }
    pause()
  })

  const pause = () => {
    const { autoscroll, autoscrollPauseDuration } = unref(options)

    if (!autoscroll) { return }

    clearInterval(animationInterval)

    pauseTimeout = setTimeout(() => {
      start()
      clearTimeout(pauseTimeout)
    }, autoscrollPauseDuration) as any
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

  return {
    start,
    pause,
    stop,
    withPause,
  }
}
