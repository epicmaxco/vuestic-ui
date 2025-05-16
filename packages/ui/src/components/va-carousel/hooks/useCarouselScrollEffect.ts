import { ref, Ref } from 'vue'

const forceReflowCSS = (el: HTMLElement) => {
  // Accessing offsetLeft forces the browser to reflow the element
  return el.offsetLeft
}

export const useCarouseScrollEffectBase = (shifter: Ref<HTMLElement | null>, slides: Ref<HTMLCollection | Element[] | undefined | null>) => {
  function getSlides () {
    return slides.value ?? []
  }

  const shiftWithoutAnimation = (shift: number) => {
    if (!shifter.value) {
      return
    }

    shifter.value.style.transition = 'none'
    shifter.value.style.transform = `translateX(${-shift}px)`
    forceReflowCSS(shifter.value) // Force reflow CSS
    shifter.value.style.transition = ''
    shifter.value.style.transform = ''
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

  function getCurrentSlideShift (index: number) {
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
    return getAllSlidesWidth() - (shifter.value?.offsetWidth ?? 0)
  }

  const shiftX = ref(0)

  function findIndexOnShift (shift: number, margin: number = 1 / 2) {
    const slides = getSlides()
    const allSlidesWidth = getAllSlidesWidth()

    const shiftInt = Math.floor(shift / allSlidesWidth) * slides.length
    shift = shift % allSlidesWidth

    if (shift < 0) {
      shift = allSlidesWidth + shift
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

  function getCurrentShiftDiff () {
    const computedStyle = window.getComputedStyle(shifter.value!)
    const transform = computedStyle.transform
    const matrix = new DOMMatrix(transform)
    const translateX = matrix.m41

    return translateX % getAllSlidesWidth()
  }

  return {
    shiftX,
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
