<template>
  <div
    class="va-carousel"
    :class="{
      'va-carousel--vertical': $props.vertical,
      [`va-carousel--${$props.effect}`]: true
    }"
    :style="{ height }"
    role="region"
    aria-label="carousel"
  >
    <template v-if="$props.arrows">
      <div
        v-if="doShowPrevButton"
        class="va-carousel__arrow va-carousel__arrow--left"
        @click="prev"
        @keydown.enter.stop="prev"
      >
        <slot name="prev-arrow">
          <va-hover #default="{ hover }" stateful>
            <va-button
              :color="hover ? computedHoverColor : computedColor"
              :icon="vertical ? 'expand_less' : 'chevron_left'"
              aria-label="go previous slide"
            />
          </va-hover>
        </slot>
      </div>
      <div
        v-if="doShowNextButton"
        class="va-carousel__arrow va-carousel__arrow--right"
        @click="next"
        @keydown.enter.stop="next"
      >
        <slot name="next-arrow">
          <va-hover #default="{ hover }" stateful>
            <va-button
              :color="hover ? computedHoverColor : computedColor"
              :icon="vertical ? 'expand_more' : 'chevron_right'"
              aria-label="go next slide"
            />
          </va-hover>
        </slot>
      </div>
    </template>

    <div class="va-carousel__indicators" v-if="$props.indicators">
      <div
        class="va-carousel__indicator"
        v-for="(item, index) in $props.items" :key="index"
        :class="{ 'va-carousel__indicator--active': index === modelValue }"
        v-bind="indicatorTrigger === 'hover' ? { onmouseover: () => goTo(index) } : { onclick: () => goTo(index) }"
      >
        <slot name="indicator" v-bind="{ item, index, goTo, isActive: isCurrentSlide(index) }">
          <va-hover #default="{ hover }" stateful>
            <va-button
              :aria-label="`go slide #${index + 1}`"
              round
              :color="isCurrentSlide(index) ? computedActiveColor : (hover ? computedHoverColor : computedColor)"
            >
              {{ index + 1 }}
            </va-button>
          </va-hover>
        </slot>
      </div>
    </div>

    <div class="va-carousel__content">
      <div
        class="va-carousel__slides"
        :style="computedSlidesStyle"
        role="list"
      >
        <div
          class="va-carousel__slide"
          v-for="(item, index) in slides" :key="item"
          :style="effect === 'fade' ? { animation: fadeKeyframe } : ''"
          role="listitem"
          :aria-hidden="!isCurrentSlide(index)"
          :aria-current="isCurrentSlide(index)"
          :aria-label="`slide ${index + 1} of ${slides.length}`"
        >
          <slot v-bind="{ item, index, goTo, isActive: isCurrentSlide(index) }">
            <va-image
              :src="isObjectSlides ? item.src : item"
              :alt="isObjectSlides ? item.alt : ''"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useCarousel } from './hooks/useCarousel'
import { useCarouselAnimation } from './hooks/useCarouselAnimation'
import { useCarouselColor } from './hooks/useCarouselColors'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables'
import { VaImage } from '../va-image'
import { VaButton } from '../va-button'
import { VaHover } from '../va-hover'

export default defineComponent({
  name: 'VaCarousel',

  components: { VaImage, VaButton, VaHover },

  props: {
    ...useStatefulProps,

    modelValue: { type: Number, default: 0 },
    items: { type: Array as PropType<any[]>, required: true },

    // Animations
    autoscroll: { type: Boolean, default: false },
    autoscrollInterval: { type: Number, default: 1000 },
    autoscrollPauseDuration: { type: Number, default: 2000 },
    infinite: { type: Boolean, default: false },
    fadeKeyframe: { type: String, default: 'va-carousel-fade-appear 1s' },

    // Visual
    arrows: { type: Boolean, default: true },
    indicators: { type: Boolean, default: true },
    indicatorTrigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click',
      validator: (value: string) => ['click', 'hover'].includes(value),
    },
    vertical: { type: Boolean, default: false },
    height: { type: String, default: '300px' },
    effect: {
      type: String as PropType<'fade' | 'transition'>,
      default: 'transition',
      validator: (value: string) => ['fade', 'transition'].includes(value),
    },
    color: { type: String, default: 'primary' },
  },

  emits: useStatefulEmits,

  setup (props, { emit }) {
    const { valueComputed: currentSlide } = useStateful(props, emit, 0)

    const {
      goTo, next, prev,
      doShowNextButton, doShowPrevButton,
    } = useCarousel(props, currentSlide)

    const { withPause, computedSlidesStyle, slides } = useCarouselAnimation(props, currentSlide)
    const isObjectSlides = computed(() => {
      return props.items.length && props.items.every((el) => !!el && typeof el === 'object' && !!el?.src)
    })
    const isCurrentSlide = (index: number) => +index === currentSlide.value

    return {
      doShowNextButton,
      doShowPrevButton,
      computedSlidesStyle,
      goTo: withPause(goTo),
      prev: withPause(prev),
      next: withPause(next),
      slides,
      isObjectSlides,
      isCurrentSlide,
      ...useCarouselColor(),
    }
  },
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
}
</style>
