<template>
  <div
    ref="container"
    class="va-carousel-effect-fade"
    role="list"
    :style="{
      '--active-slide': modelValue,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { watchEffect, onMounted, ref } from 'vue'
import { useSwipe, useSwipeProps } from '../../../composables'

const container = ref<HTMLElement | null>(null)

const modelValue = defineModel({
  type: Number,
  default: 0,
})

const props = defineProps({
  infinite: { type: Boolean, default: true },
  ...useSwipeProps,
})

const emit = defineEmits(['slidesCount'])

onMounted(() => {
  emit('slidesCount', container.value?.children.length)
})

watchEffect(() => {
  if (!container.value) {
    return
  }

  const slides = container.value.children

  for (let i = 0; i < slides.length; i++) {
    if (modelValue.value < 0) {
      if (props.infinite) {
        modelValue.value = slides.length - 1
      } else {
        modelValue.value = 0
      }
      return
    }

    if (modelValue.value >= slides.length) {
      if (props.infinite) {
        modelValue.value = 0
      } else {
        modelValue.value = slides.length - 1
      }
      return
    }

    const slide = slides[i]
    if (i === modelValue.value) {
      slide.classList.remove('va-carousel-effect-fade__slide--hidden')
    } else {
      slide.classList.add('va-carousel-effect-fade__slide--hidden')
      slide.classList.add('va-carousel-effect-fade__slide')
    }
  }
})

useSwipe(props, container, (state) => {
  switch (state.direction) {
    case 'right':
    case 'up':
      modelValue.value = modelValue.value - 1
      break
    case 'left':
    case 'down':
      modelValue.value = modelValue.value + 1
      break
  }
})
</script>

<style lang="scss">
.va-carousel-effect-fade {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;

  & > * {
    flex: 0 0 auto;
  }

  & > &__slide {
    transition: opacity 0.5s ease-in-out;
    opacity: 1;

    &--hidden {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
