import { computed, Ref } from 'vue'

export const useCarousel = (items: Ref<unknown[]>, currentItem: Ref<number>) => {
  const goTo = (index: number) => { currentItem.value = index }
  const prev = () => { currentItem.value -= 1 }
  const next = () => { currentItem.value += 1 }

  const doShowPrevButton = computed(() => currentItem.value > 0)
  const doShowNextButton = computed(() => currentItem.value < items.value.length - 1)

  return {
    doShowPrevButton,
    doShowNextButton,
    goTo,
    prev,
    next,
  }
}
