<template>
  <div
    v-if="$slots.default"
    class="va-carousel-effect-scroll"
    :style="{
      transform: `translateX(-${shiftX}px)`,
    }"
    ref="shifter"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, onUpdated } from 'vue'
import { useCarouseScrollEffectBase } from '../hooks/useCarouselScrollEffect'
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

const slides = ref<HTMLCollection>()

watchEffect(() => {
  if (shifter.value) {
    slides.value = shifter.value.children
    emit('slidesCount', slides.value.length)
  }
})

const {
  getSlides,
  shiftX,
  shiftAnimated,
  shiftWithoutAnimation,
  findIndexOnShift,
  getCurrentSlideShift,
  getLastSlideShift,
} = useCarouseScrollEffectBase(shifter, slides)

const activeSlide = ref(0)

let pressedShift = 0
useDragToScroll(shifter, {
  onDragStart: () => {
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
  onDragEnd: (movementX) => {
    if (!props.swipable) { return }

    let index = findIndexOnShift(shiftX.value, movementX > 0 ? 3 / 4 : 1 / 4)

    if (index < 0) {
      index = getSlides().length + (index)
    }

    shiftAnimated(getCurrentSlideShift(index))

    if (index >= getSlides().length) {
      index = index % getSlides().length
    }

    activeSlide.value = index
    modelValue.value = activeSlide.value
  },
})

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

// Teleport on borders
watch(shiftX, () => {
  const maxWidth = getLastSlideShift()

  if (shiftX.value < 0) {
    shiftX.value = 0
  } else if (shiftX.value >= maxWidth) {
    shiftX.value = maxWidth
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
.va-carousel-effect-scroll {
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.5s linear;
  width: 100%;
  height: 100%;

  & > * {
    flex: 0 0 auto;
  }
}
</style>
