<template>
  <div
    ref="slidesContainer"
    class="va-carousel-scroll-container"
    role="list"
  >
    <div
      v-if="$slots.default"
      class="va-carousel-scroll-container__shifter"
      :style="{
        transform: `translateX(-${shiftX}px)`,
      }"
      ref="shifter"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useElementPressed, useMouse } from '../../../composables/std'
import { watch } from 'vue';
import { onMounted } from 'vue';
import { onUpdated } from 'vue';

const slidesContainer = ref<HTMLElement | null>(null)
const shifter = ref<HTMLElement | null>(null)

const { mouseX } = useMouse(slidesContainer)
const isPressed = useElementPressed(slidesContainer)

const modelValue = defineModel({
  type: Number,
  default: 0,
})

const emit = defineEmits(['slidesCount'])

const activeSlide = ref(modelValue.value)

function getSlides() {
  const slides = shifter.value?.children
  if (!slides) {
    return []
  }

  return Array.from(slides) as HTMLElement[]
}

onMounted(() => {
  emit('slidesCount', getSlides().length)
})

onUpdated(() => {
  emit('slidesCount', getSlides().length)
})

function getCurrentSlideShift(index: number = activeSlide.value) {
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

const getLastSlideShift = () => {
  return  getAllSlidesWidth() - (slidesContainer.value?.offsetWidth ?? 0)
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

let mouseStartX = 0

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

const shiftWithoutAnimation = (shift: number) => {
  if (!shifter.value) {
    return
  }

  shifter.value!.style.transition = 'none'
  shifter.value!.style.transform = `translateX(${-shift}px)`
  shifter.value!.offsetLeft // Force reflow CSS
  shifter.value!.style.transition = ''
  shiftX.value = shift
}

const shiftAnimated = (shift: number) => {
  if (!shifter.value) {
    return
  }

  if (shift === shiftX.value) {
    return
  }

  shiftX.value = shift
}

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
</script>

<style lang="scss">
  .va-carousel-scroll-container {
    position: relative;
    white-space: nowrap;
    user-select: none;
    overflow: hidden;
    width: 100%;

    &__shifter {
      white-space: nowrap;
      display: flex;
      flex-wrap: nowrap;
      transition: transform 0.5s linear;

      & > * {
        flex: 0 0 auto;
      }
    }

    &__clone {
      vertical-align: top;
      width: 100%;
      display: flex;

      & > * {
        flex: 0 0 auto;
      }

      &--first {
        margin-left: -100%;
        justify-content: flex-end;
      }
    }
  }
</style>
