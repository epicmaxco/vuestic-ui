<template>
  <div
    class="va-carousel-group"
    role="region"
    :aria-label="tp($props.ariaLabel)"
  >
    <template v-if="$props.arrows">
      <div
        class="va-carousel__arrow va-carousel__arrow--left"
        @click="prev"
        @keydown.enter.stop="prev"
      >
        <slot name="prev-arrow">
          <VaCarouselButton
            :color="color"
            :icon="vertical ? 'va-arrow-up' : 'va-arrow-left'"
            :aria-label="tp($props.ariaPreviousLabel)"
          />
        </slot>
      </div>
      <div
        class="va-carousel__arrow va-carousel__arrow--right"
        @click="next"
        @keydown.enter.stop="next"
      >
        <slot name="next-arrow">
          <VaCarouselButton
            :color="color"
            :icon="vertical ? 'va-arrow-down' : 'va-arrow-right'"
            :aria-label="tp($props.ariaNextLabel)"
          />
        </slot>
      </div>
    </template>

    <VaCarouselIndicators
      v-if="indicators"
      v-model="currentSlide"
      :count="count"
      :color="color"
      :aria-label="$props.ariaSlideOfLabel"
      :trigger="indicatorTrigger"
      #default="bind"
    >
      <slot name="indicator" v-bind="bind" />
    </VaCarouselIndicators>

    <VaCarouselScrollContainer
      v-model="currentSlide"
      :infinite="infinite"
      :effect="effect"
      @slides-count="count = $event"
    >
      <slot />
    </VaCarouselScrollContainer>
  </div>
</template>

<script lang="ts">
import { computed, PropType, ref } from 'vue'
import {
  useStateful, useStatefulProps, useStatefulEmits,
  useComponentPresetProp,
  useTranslation, useTranslationProp,
  makeNumericProp,
} from '../../composables'

import VaCarouselButton from './components/VaCarouselButton.vue'
import VaCarouselScrollContainer from './components/VaCarouselScrollContainer.vue'
import VaCarouselIndicators from './components/VaCarouselIndicators.vue'
import { useCarouselAutoScroll } from './hooks/useCarouselAutoscroll'
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaCarousel',
})

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,

  stateful: { type: Boolean, default: true },
  modelValue: { type: Number, default: 0 },

  // Animations
  autoscroll: { type: Boolean, default: false },
  autoscrollInterval: makeNumericProp({ default: 5000 }),
  autoscrollPauseDuration: makeNumericProp({ default: 2000 }),
  infinite: { type: Boolean, default: true },
  effect: {
    type: String as PropType<'scroll' | 'fade' | 'none'>,
    default: 'scroll',
    validator: (value: string) => ['scroll', 'fade', 'none'].includes(value),
  },

  // Visual
  arrows: { type: Boolean, default: true },
  indicators: { type: Boolean, default: true },
  indicatorTrigger: {
    type: String as PropType<'click' | 'hover' | 'none'>,
    default: 'click',
    validator: (value: string) => ['click', 'hover', 'none'].includes(value),
  },
  vertical: { type: Boolean, default: false },

  color: { type: String, default: 'primary' },

  ariaLabel: useTranslationProp('$t:carousel'),
  ariaPreviousLabel: useTranslationProp('$t:goPreviousSlide'),
  ariaNextLabel: useTranslationProp('$t:goNextSlide'),
  ariaGoToSlideLabel: useTranslationProp('$t:goSlide'),
  ariaSlideOfLabel: useTranslationProp('$t:slideOf'),
})

const emit = defineEmits([...useStatefulEmits])

const currentSlide = useStateful(props, emit, 'modelValue')

useCarouselAutoScroll(currentSlide, computed(() => ({
  ...props,
  slidesCount: count.value,
})) as any)

const next = () => {
  currentSlide.value += 1
}

const prev = () => {
  currentSlide.value -= 1
}

const { tp } = useTranslation()

const count = ref(0)
</script>

<style lang="scss">
@import "../../styles/resources";
@import "./_variables.scss";

@keyframes va-carousel-fade-appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.va-carousel-group {
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  position: relative;
  overflow: hidden;

  &__indicators {
    width: 100%;
    position: absolute;
    bottom: var(--va-carousel-padding);
    display: flex;
    justify-content: center;
    z-index: 2;
    overflow-x: auto;
    left: 50%;
    transform: translateX(-50%);

    @include va-scroll();

    & > * {
      margin: 0 var(--va-carousel-indicators-gap);
    }
  }

  &__arrow {
    z-index: 1;
    width: max-content;
    height: max-content;

    &--right {
      right: var(--va-carousel-padding);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &--left {
      left: var(--va-carousel-padding);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .va-button {
    @include keyboard-focus-outline($offset: -2px);
  }
}
</style>
