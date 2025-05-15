import { computed, ref, Ref, watch } from "vue";
import { useTransitionEnd } from "../../../composables/std/browser/useElementTransition";
import { useElementPressed } from "../../../composables";
import { useElementWidth, useMouse } from "../../../composables/std";

export const useCarouselShifterBase = (shifter: Ref<HTMLElement | null>, options: {
  infinite?: boolean,
}) => {
  function getSlides() {
    const slides = shifter.value?.children

    if (!slides) {
      return []
    }

    if (options.infinite) {
      /** Do not consider clones as slides */
      return Array.from(slides).slice(1, -1) as HTMLElement[]
    }

    return Array.from(slides) as HTMLElement[]
  }

  const shiftWithoutAnimation = (shift: number) => {
    if (!shifter.value) {
      return
    }

    shifter.value!.style.transition = 'none'
    shifter.value!.style.transform = `translateX(${-shift}px)`
    shifter.value!.offsetLeft // Force reflow CSS
    shifter.value!.style.transition = ''
    shifter.value!.style.transform = ``
    shiftX.value = shift
  }

  const shiftAnimated = (shift: number) => {
    if (shift === shiftX.value) {
      return
    }

    shiftX.value = shift
  }

  const getAllSlidesWidth = () => {
    const slides = getSlides()

    let shift = 0

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement

      if (!slide) {
        break
      }

      shift += slide.offsetWidth
    }

    return shift
  }


  function getCurrentSlideShift(index: number) {
    const slides = getSlides()

    let shift = 0

    const repeatCount = Math.floor(index / slides.length)

    if (repeatCount > 0) {
      shift = repeatCount * getAllSlidesWidth()
    }

    for (let i = 0; i < index % slides.length; i++) {
      const slide = slides[i] as HTMLElement

      if (!slide) {
        break
      }

      shift += slide.offsetWidth
    }

    return shift
  }

  const getLastSlideShift = () => {
    return  getAllSlidesWidth() - (shifter.value?.offsetWidth ?? 0)
  }

  const shiftStartX = ref(0)

  const shiftX = ref(0)

  function findIndexOnShift(shift: number, margin: number = 1/2) {
    const slides = getSlides()

    const shiftInt = Math.floor(shift / getAllSlidesWidth()) * slides.length
    shift = shift % getAllSlidesWidth()

    if (shift < 0) {
      shift = getAllSlidesWidth() + shift
    }

    let width = 0

    for (let i = 0; i < slides.length * 2; i++) {
      const slide = slides[i % slides.length] as HTMLElement

      if (shift >= width) {
        if (shift < width + slide.offsetWidth * (margin)) {
          return i + shiftInt
        }
      } else {
        if (shift < width - slide.offsetWidth * (1 - margin)) {
          return (i - 1) + shiftInt
        } else {
          return i + shiftInt
        }
      }

      width += slide.offsetWidth
    }


    return slides.length - 1 + shiftInt
  }

  function getCurrentShiftDiff() {
    const computedStyle = window.getComputedStyle(shifter.value!)
    const transform = computedStyle.transform
    const matrix = new DOMMatrix(transform)
    const translateX = matrix.m41

    return translateX % getAllSlidesWidth()
  }

  return {
    shiftX,
    shiftStartX,
    getCurrentShiftDiff,
    getCurrentSlideShift,
    getLastSlideShift,
    findIndexOnShift,
    shiftWithoutAnimation,
    shiftAnimated,
    getSlides,
    getAllSlidesWidth,
  }
}

export const useCarouselShifterInfinite = (shifter: Ref<HTMLElement | null>, modelValue: Ref<number>) => {
  const {
    shiftX,
    shiftStartX,
    getCurrentShiftDiff,
    getCurrentSlideShift,
    getLastSlideShift,
    findIndexOnShift,
    shiftWithoutAnimation,
    shiftAnimated,
    getSlides,
    getAllSlidesWidth,
  } = useCarouselShifterBase(shifter, { infinite: true })

  const activeSlide = ref(0)

  let mouseStartX = 0

  const { transitionEnd } = useTransitionEnd(shifter)
  const isPressed = useElementPressed(shifter)
  const { mouseX } = useMouse()

  // Swipe animation
  watch(mouseX, () => {
    if (isPressed.value) {
      shiftWithoutAnimation(shiftStartX.value - mouseX.value)
      activeSlide.value = findIndexOnShift(shiftX.value)

      if (activeSlide.value < 0) {
        activeSlide.value = getSlides().length + activeSlide.value
      }

      if (activeSlide.value >= getSlides().length) {
        activeSlide.value = activeSlide.value % getSlides().length
      }

      modelValue.value = activeSlide.value
    }
  })

  // Attach to slide after swipe
  watch(
    () => isPressed.value,
    async (pressed) => {
      if (pressed) {
        shiftStartX.value = shiftX.value + mouseX.value
        mouseStartX = mouseX.value
      } else {
        let index = findIndexOnShift(shiftX.value, mouseX.value > mouseStartX ? 3/4 : 1/4)

        if (index < 0) {
          index = getSlides().length + (index)
        }

        shiftAnimated(getCurrentSlideShift(index))

        if (index >= getSlides().length) {
          index = index % getSlides().length
          await transitionEnd()
          shiftWithoutAnimation(getCurrentSlideShift(index))
        }

        activeSlide.value = index
        modelValue.value = activeSlide.value
      }
    },
  )

  // Animate on button clicks
  watch(
    modelValue,
    async (currentSlide, prevSlide) => {
      const slidesCount = getSlides().length

      currentSlide = currentSlide % slidesCount

      if (currentSlide < 0) {
        currentSlide = slidesCount + currentSlide
      }

      if (currentSlide === activeSlide.value) {
        return
      }

      activeSlide.value = currentSlide % slidesCount

      modelValue.value = activeSlide.value

      if (prevSlide === 0 && currentSlide === slidesCount - 1) {
        shiftWithoutAnimation(getCurrentSlideShift(slidesCount) - getCurrentShiftDiff())
        shiftAnimated(getCurrentSlideShift(currentSlide))
      } else if (prevSlide === slidesCount - 1 && currentSlide === 0) {
        shiftAnimated(getCurrentSlideShift(slidesCount))
        const dif = getCurrentSlideShift(slidesCount) + getCurrentShiftDiff()
        shiftWithoutAnimation(-dif)
      } else {
        shiftAnimated(getCurrentSlideShift(currentSlide))
      }
    },
  )

  // Teleport on borders
  watch(shiftX, () => {
    if (!isPressed.value) {
      return
    }

    const maxWidth = getAllSlidesWidth()

    if (shiftX.value < 0) {
      shiftWithoutAnimation(maxWidth + shiftX.value)
    } else if (shiftX.value > maxWidth) {
      shiftWithoutAnimation(shiftX.value % maxWidth)
    }
  })

  const containerSize = useElementWidth(shifter)

  const cloneCount = computed(() => {
    const slidesWidth = getAllSlidesWidth()

    if (slidesWidth === 0) {
      return 1
    }

    const containerWidth = containerSize.value

    if (!containerWidth) {
      return
    }

    const cloneCountValue = Math.floor(containerWidth / slidesWidth )

    return cloneCountValue + 1
  })

  return {
    shiftX,
    getSlides,
    cloneCount,
  }
}

export const useCarouselShifterFinite = (shifter: Ref<HTMLElement | null>, modelValue: Ref<number>) => {
  const {
    shiftX,
    shiftStartX,
    getCurrentSlideShift,
    getLastSlideShift,
    findIndexOnShift,
    shiftWithoutAnimation,
    shiftAnimated,
    getSlides,
  } = useCarouselShifterBase(shifter, { infinite: false })

  const activeSlide = ref(0)

  let mouseStartX = 0
  const isPressed = useElementPressed(shifter)
  const { mouseX } = useMouse()

  watch(mouseX, () => {
    if (isPressed.value) {
      const maxWidth = getLastSlideShift()
      let shift = shiftStartX.value - mouseX.value

      if (shift < 0) {
        shift = 0
      } else if (shift >= maxWidth) {
        shift = maxWidth
      }
      shiftWithoutAnimation(shift)
      activeSlide.value = findIndexOnShift(shiftX.value)

      if (activeSlide.value < 0) {
        activeSlide.value = getSlides().length + activeSlide.value
      }

      if (activeSlide.value >= getSlides().length) {
        activeSlide.value = activeSlide.value % getSlides().length
      }

      modelValue.value = activeSlide.value
    }
  })

  watch(shiftX, () => {
    const maxWidth = getLastSlideShift()

    if (shiftX.value < 0) {
      shiftX.value = 0
    } else if (shiftX.value >= maxWidth) {
      shiftX.value = maxWidth
    }
  })

  watch(
    () => isPressed.value,
    async (pressed) => {
      if (pressed) {
        shiftStartX.value = shiftX.value + mouseX.value
        mouseStartX = mouseX.value
      } else {
        let index = findIndexOnShift(shiftX.value, mouseX.value > mouseStartX ? 3/4 : 1/4)

        if (index < 0) {
          index = getSlides().length + (index)
        }

        shiftAnimated(getCurrentSlideShift(index))

        if (index >= getSlides().length) {
          index = index % getSlides().length
        }

        activeSlide.value = index
        modelValue.value = activeSlide.value
      }
    },
  )

  watch(
    modelValue,
    async (currentSlide, prevSlide) => {
      const slidesCount = getSlides().length

      if (currentSlide < 0) {
        currentSlide = 0
        modelValue.value = 0
      } else if (currentSlide > slidesCount - 1) {
        currentSlide = slidesCount - 1
        modelValue.value = slidesCount - 1
      }

      if (currentSlide === activeSlide.value) {
        return
      }

      activeSlide.value = currentSlide % slidesCount

      modelValue.value = activeSlide.value

      shiftAnimated(getCurrentSlideShift(currentSlide))
    },
  )

  return {
    getSlides,
    shiftX,
  }
}
