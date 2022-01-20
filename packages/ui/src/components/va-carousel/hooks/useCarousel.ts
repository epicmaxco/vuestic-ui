import { computed, Ref } from 'vue'

export const useCarousel = (props: {
  items: any[],
  infinite: boolean,
  loop: boolean
}, currentSlide: Ref<number>) => {
  const goTo = (index: number) => { currentSlide.value = index }
  const prev = () => {
    if (props.loop || props.infinite) {
      if (currentSlide.value <= 0) {
        currentSlide.value = props.items.length
        return
      }
    }

    currentSlide.value -= 1
  }
  const next = () => {
    if (props.loop || props.infinite) {
      if (currentSlide.value >= props.items.length - 1) {
        currentSlide.value = 0
        return
      }
    }

    currentSlide.value += 1
  }

  const doShowPrevButton = computed(() => currentSlide.value > 0 || props.infinite || props.loop)
  const doShowNextButton = computed(() => currentSlide.value < props.items.length - 1 || props.infinite || props.loop)

  return {
    doShowPrevButton,
    doShowNextButton,
    goTo,
    prev,
    next,
  }
}
