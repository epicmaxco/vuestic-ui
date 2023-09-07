import { computed, Ref } from 'vue'

export const useCarousel = (props: {
  items: any[],
  infinite: boolean
}, currentSlide: Ref<number>) => {
  const goTo = (index: number) => { currentSlide.value = index }
  const prev = () => {
    if (props.infinite) {
      if (currentSlide.value <= 0) {
        currentSlide.value = props.items.length - 1
        return
      }
    }

    currentSlide.value -= 1
  }
  const next = () => {
    if (props.infinite) {
      if (currentSlide.value >= props.items.length - 1) {
        currentSlide.value = 0
        return
      }
    }

    currentSlide.value += 1
  }

  const doShowDirectionButtons = computed(() => props.items.length > 1)
  const doShowPrevButton = computed(() => currentSlide.value > 0 || props.infinite)
  const doShowNextButton = computed(() => currentSlide.value < props.items.length - 1 || props.infinite)

  return {
    doShowPrevButton,
    doShowNextButton,
    doShowDirectionButtons,
    goTo,
    prev,
    next,
  }
}
