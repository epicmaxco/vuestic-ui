<template>
  <div class="va-carousel__indicators">
    <div
      class="va-carousel__indicator"
      v-for="(item) in count" :key="item"
      :class="{ 'va-carousel__indicator--active': item - 1 === currentSlide }"
      v-bind="getIndicatorEvents(item - 1)"
    >
      <slot v-bind="{ item, isActive: item - 1 === currentSlide, index: item - 1 }">
        <VaCarouselButton
          :color="color"
          :active="currentSlide === item - 1"
          :aria-label="tp($props.ariaGoToSlideLabel, { index: item })"
          round
        >
          {{ item }}
        </VaCarouselButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTranslation, useTranslationProp } from '../../../composables'
import VaCarouselButton from './VaCarouselButton.vue'

const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
  trigger: {
    type: String,
    default: 'click',
    validator: (value: string) => ['click', 'hover', 'none'].includes(value),
  },
  ariaGoToSlideLabel: useTranslationProp('$t:goSlide'),
  color: {
    type: String,
    default: 'primary',
  },
})

const currentSlide = defineModel({
  type: Number,
  default: 0,
})

const { tp } = useTranslation()

const getIndicatorEvents = (index: number) => {
  if (props.trigger === 'hover') {
    return { onmouseover: () => { currentSlide.value = index } }
  }
  if (props.trigger === 'click') {
    return { onclick: () => { currentSlide.value = index } }
  }
  // none
  return {}
}
</script>
