<template>
  <div
    class="va-carousel"
    :class="{
      'va-carousel--vertical': $props.vertical,
      [`va-carousel--${$props.effect}`]: true
    }"
    :style="{
      height: ratioComputed ? 'auto' : height,
      aspectRatio: ratioComputed ? ratioComputed : undefined,
    }"
    role="region"
    :aria-label="tp($props.ariaLabel)"
  >
    <template v-if="$props.arrows && doShowDirectionButtons">
      <div
        v-if="doShowPrevButton"
        class="va-carousel__arrow va-carousel__arrow--left"
        @click="prevWithPause"
        @keydown.enter.stop="prevWithPause"
      >
        <slot name="prev-arrow">
          <VaCarouselButton
            :round="false"
            :color="color"
            :icon="vertical ? 'va-arrow-up' : 'va-arrow-left'"
            :aria-label="tp($props.ariaPreviousLabel)"
          />
        </slot>
      </div>
      <div
        v-if="doShowNextButton"
        class="va-carousel__arrow va-carousel__arrow--right"
        @click="nextWithPause"
        @keydown.enter.stop="nextWithPause"
      >
        <slot name="next-arrow">
          <VaCarouselButton
            :round="false"
            :color="color"
            :icon="vertical ? 'va-arrow-down' : 'va-arrow-right'"
            :aria-label="tp($props.ariaNextLabel)"
          />
        </slot>
      </div>
    </template>

    <div class="va-carousel__indicators" v-if="$props.indicators">
      <div
        class="va-carousel__indicator"
        v-for="(item, index) in $props.items" :key="index"
        :class="{ 'va-carousel__indicator--active': isCurrentSlide(index) }"
        v-bind="getIndicatorEvents(index)"
      >
        <slot name="indicator" v-bind="{ item, index, goTo: goToWithPause, isActive: isCurrentSlide(index) }">
          <VaCarouselButton
            :color="color"
            :active="isCurrentSlide(index)"
            :aria-label="tp($props.ariaGoToSlideLabel, { index: index + 1 })"
            round
          >
            {{ index + 1 }}
          </VaCarouselButton>
        </slot>
      </div>
    </div>

    <div class="va-carousel__content">
      <div
        ref="slidesContainer"
        class="va-carousel__slides"
        :style="computedSlidesStyle"
        role="list"
      >
        <div
          v-for="(item, index) in slides" :key="item"
          role="listitem"
          class="va-carousel__slide"
          :style="slideStyleComputed"
          :aria-hidden="!isCurrentSlide(index)"
          :aria-current="isCurrentSlide(index)"
          :aria-label="tp($props.ariaSlideOfLabel, { index: index + 1, length: slides.length })"
        >
          <slot v-bind="{ item, index, goTo: goToWithPause, isActive: isCurrentSlide(index) }">
            <va-image
              v-bind="vaImageProps"
              :src="isObjectSlides ? item.src : item"
              :alt="isObjectSlides ? item.alt : ''"
              :draggable="false"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { shallowRef, PropType, computed } from 'vue'
import { useCarousel } from './hooks/useCarousel'
import { useCarouselAnimation } from './hooks/useCarouselAnimation'
import {
  useStateful, useStatefulProps, useStatefulEmits,
  useSwipe, useSwipeProps, useComponentPresetProp,
  useTranslation, useTranslationProp, useNumericProp,
  makeNumericProp,
  ColorName,
} from '../../composables'

import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { VaImage } from '../va-image'
import VaCarouselButton from './components/VaCarouselButton.vue'

import type { SwipeState } from '../../composables'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

const VaImageProps = extractComponentProps(VaImage, ['src', 'alt'])
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaCarousel',
})

const props = defineProps({
  ...useSwipeProps,
  ...useStatefulProps,
  ...useComponentPresetProp,
  ...VaImageProps,

  stateful: { type: Boolean, default: true },
  modelValue: { type: Number, default: 0 },
  items: { type: Array as PropType<any[]>, required: true },

  // Animations
  autoscroll: { type: Boolean, default: false },
  autoscrollInterval: makeNumericProp({ default: 5000 }),
  autoscrollPauseDuration: makeNumericProp({ default: 2000 }),
  infinite: { type: Boolean, default: true },
  fadeKeyframe: { type: String, default: 'va-carousel-fade-appear 1s' },

    // Visual
  arrows: { type: Boolean, default: true },
  indicators: { type: Boolean, default: true },
  indicatorTrigger: {
    type: String as PropType<'click' | 'hover' | 'none'>,
    default: 'click',
    validator: (value: string) => ['click', 'hover', 'none'].includes(value),
  },
  vertical: { type: Boolean, default: false },
  height: { type: String, default: '300px' },
  effect: {
    type: String as PropType<'fade' | 'transition'>,
    default: 'transition',
    validator: (value: string) => ['fade', 'transition'].includes(value),
  },
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
  ratio: { type: [Number, String] },

  ariaLabel: useTranslationProp('$t:carousel'),
  ariaPreviousLabel: useTranslationProp('$t:goPreviousSlide'),
  ariaNextLabel: useTranslationProp('$t:goNextSlide'),
  ariaGoToSlideLabel: useTranslationProp('$t:goSlide'),
  ariaSlideOfLabel: useTranslationProp('$t:slideOf'),
})

const emit = defineEmits([...useStatefulEmits])

const currentSlide = useStateful(props, emit, 'modelValue')
const autoscrollIntervalComputed = useNumericProp('autoscrollInterval')
const autoscrollPauseDurationComputed = useNumericProp('autoscrollPauseDuration')
const ratioComputed = useNumericProp('ratio')

const {
  goTo, next, prev,
  doShowNextButton, doShowPrevButton, doShowDirectionButtons,
} = useCarousel(props, currentSlide)

const { withPause, computedSlidesStyle, slides } = useCarouselAnimation({
  items: props.items,
  autoscrollInterval: autoscrollIntervalComputed.value!,
  autoscrollPauseDuration: autoscrollPauseDurationComputed.value!,
  autoscroll: props.autoscroll,
  infinite: props.infinite,
  effect: props.effect,
  vertical: props.vertical,
  fadeKeyframe: props.fadeKeyframe,
}, currentSlide)
const isObjectSlides = computed(() => {
  return props.items.length && props.items.every((el) => !!el && typeof el === 'object' && !!el?.src)
})
const isCurrentSlide = (index: number) => index === currentSlide.value

const slideStyleComputed = computed(() => ({
  animation: props.effect === 'fade' ? 'fadeKeyframe' : undefined,
}))

// swiping
const slidesContainer = shallowRef<HTMLElement>()
const onSwipe = (state: SwipeState) => {
  switch (state.direction) {
    case 'right':
    case 'up':
      doShowPrevButton.value && prev()
      break
    case 'left':
    case 'down':
      doShowNextButton.value && next()
  }
}
useSwipe(props, slidesContainer, onSwipe)

const getIndicatorEvents = (index: number) => {
  if (props.indicatorTrigger === 'hover') {
    return { onmouseover: () => goTo(index) }
  }
  if (props.indicatorTrigger === 'click') {
    return { onclick: () => goTo(index) }
  }
  // none
  return {}
}

const { tp } = useTranslation()

const vaImageProps = filterComponentProps(VaImageProps)

const goToWithPause = withPause(goTo)
const prevWithPause = withPause(prev)
const nextWithPause = withPause(next)

defineExpose({
  currentSlide,
  goTo,
  next,
  prev,
  goToWithPause,
  prevWithPause,
  nextWithPause,
})
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

.va-carousel {
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  min-height: var(--va-carousel-min-height);
  background: var(--va-carousel-background);
  box-shadow: var(--va-carousel-box-shadow);
  border-radius: var(--va-carousel-border-radius);
  position: relative;
  overflow: hidden;

  &__content {
    flex: 1;
    width: 100%;
    white-space: nowrap;
  }

  &__slides {
    width: 100%;
    height: 100%;
    transition: var(--va-carousel-slides-transition);
  }

  &__slide {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

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

  &--vertical {
    .va-carousel {
      &__slide {
        display: flex;
      }

      &__arrow {
        z-index: 1;

        &--right {
          bottom: var(--va-carousel-padding);
          top: auto;
          left: 50%;
          transform: translateX(-50%);
        }

        &--left {
          top: var(--va-carousel-padding);
          left: 50%;
          transform: translateX(-50%);
        }
      }

      &__indicators {
        left: var(--va-carousel-padding);
        flex-direction: column;
        width: auto;
        height: 100%;
        top: 50%;
        transform: translateY(-50%);
        overflow-x: hidden;
        overflow-y: auto;

        & > * {
          margin: var(--va-carousel-indicators-gap) 0;
        }
      }
    }
  }

  .va-image {
    height: 100%;
    width: 100%;
  }

  .va-button {
    @include keyboard-focus-outline($offset: -2px);
  }
}
</style>
