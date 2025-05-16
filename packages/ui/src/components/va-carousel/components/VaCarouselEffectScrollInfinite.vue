<template>
  <div
    v-if="$slots.default"
    class="va-carousel-effect-scroll-infinite"
    :style="{
      transform: `translateX(-${shiftX}px)`,
    }"
    ref="shifter"
  >
    <div class="va-carousel-effect-scroll-infinite__clone va-carousel-effect-scroll-infinite__clone--first">
      <slot  v-for="i in cloneCount" :key="i" />
    </div>

    <slot />

    <div class="va-carousel-effect-scroll-infinite__clone">
      <slot  v-for="i in cloneCount" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUpdated, watchEffect } from 'vue'
import { useElementWidth } from '../../../composables/std'
import { useCarouseScrollEffectBase } from '../hooks/useCarouselScrollEffect'
import { useTransitionEnd } from '../../../composables/std/browser/useElementTransition'
import { useDragToScroll } from '../hooks/useDragToScroll'

const shifter = ref<HTMLElement | null>(null)

const modelValue = defineModel({
  type: Number,
  default: 0,
})

const props = defineProps({
  swipable: { type: Boolean, default: true },
})

const emit = defineEmits(['slidesCount'])

const slides = ref<Element[]>()

watchEffect(() => {
  if (shifter.value) {
    slides.value = Array.from(shifter.value.children).slice(1, -1)
    emit('slidesCount', slides.value.length)
  }
})

const {
  getSlides,
  getAllSlidesWidth,
  shiftAnimated,
  shiftWithoutAnimation,
  getCurrentSlideShift,
  getCurrentShiftDiff,
  findIndexOnShift,
  shiftX,
} = useCarouseScrollEffectBase(shifter, slides)

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

  const cloneCountValue = Math.floor(containerWidth / slidesWidth)

  return cloneCountValue + 1
})

const activeSlide = ref(0)

const { transitionEnd } = useTransitionEnd(shifter)

let pressedShift = 0
const { isPressed } = useDragToScroll(shifter, {
  onDragStart () {
    if (!props.swipable) { return }
    pressedShift = shiftX.value
  },
  onDragMove (movementX) {
    if (!props.swipable) { return }

    shiftWithoutAnimation(pressedShift - movementX)
    activeSlide.value = findIndexOnShift(shiftX.value)

    if (activeSlide.value < 0) {
      activeSlide.value = getSlides().length + activeSlide.value
    }

    if (activeSlide.value >= getSlides().length) {
      activeSlide.value = activeSlide.value % getSlides().length
    }

    modelValue.value = activeSlide.value
  },
  async onDragEnd (movementX) {
    if (!props.swipable) { return }

    let index = findIndexOnShift(shiftX.value, movementX > 0 ? 3 / 4 : 1 / 4)

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
  },
})

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

onMounted(() => {
  emit('slidesCount', getSlides().length)
})

onUpdated(() => {
  emit('slidesCount', getSlides().length)
})
</script>

<style lang="scss">
.va-carousel-effect-scroll-infinite {
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.5s linear;
  max-width: 100%;

  & > * {
    flex: 0 0 auto;
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
