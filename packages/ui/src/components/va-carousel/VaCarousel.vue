<template>
  <div
    class="va-carousel"
    :class="{ 'va-carousel--vertical': $props.vertical }"
    :style="{ height }"
  >
    <template v-if="$props.arrows">
      <div
        v-if="doShowPrevButton"
        class="va-carousel__arrow va-carousel__arrow--left"
        @click="prev"
      >
        <slot name="prev-arrow">
          <va-button icon="chevron_left" />
        </slot>
      </div>
      <div
        v-if="doShowNextButton"
        class="va-carousel__arrow va-carousel__arrow--right"
        @click="next"
      >
        <slot name="prev-next">
          <va-button icon="chevron_right" />
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
        <slot name="indicator" v-bind="{ item, index, goTo }">
          <va-button round>{{ index + 1 }}</va-button>
        </slot>
      </div>
    </div>

    <div class="va-carousel__content">
      <div
        class="va-carousel__slides"
        :style="computedSlidesStyle"
      >
        <div class="va-carousel__slide" v-for="item in items" :key="item">
          <slot v-bind="{ item }">
            {{ item }}
          </slot>
        </div>
        <div class="va-carousel__slide">
          <slot v-bind="{ item: items[0] }">
            {{ items[0] }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue'
import { useCarousel } from './hooks/useCarousel'
import { useCarouselAnimation } from './hooks/useCarouselAnimation'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'

export default defineComponent({
  name: 'VaCarousel',

  props: {
    ...statefulComponentOptions.props,

    modelValue: { type: Number, default: 0 },
    items: { type: Array as PropType<any[]>, required: true },

    // Animations
    autoscroll: { type: Boolean, default: false },
    autoscrollInterval: { type: Number, default: 1000 },
    autoscrollPauseDuration: { type: Number, default: 2000 },
    loop: { type: Boolean, default: false },
    infinite: { type: Boolean, default: false },

    // Visual
    arrows: { type: Boolean, default: false },
    indicators: { type: Boolean, default: false },
    indicatorTrigger: { type: String as PropType<'click' | 'hover'>, default: 'click' },
    vertical: { type: Boolean, default: false },
    height: { type: String, default: '300px' },
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const items = toRef(props, 'items')
    const { valueComputed: currentSlide } = useStateful(props, emit, 0)

    const {
      goTo, next, prev,
      doShowNextButton, doShowPrevButton,
    } = useCarousel(items, currentSlide)

    const { withPause, slidesContainerStyle, sliderToBeShown } = useCarouselAnimation(props, currentSlide)

    const computedSlidesStyle = computed(() => {
      if (props.vertical) {
        return {
          ...slidesContainerStyle.value,
          transform: `translateY(${sliderToBeShown.value * -100}%)`,
        }
      }

      return {
        ...slidesContainerStyle.value,
        transform: `translateX(${sliderToBeShown.value * -100}%)`,
      }
    })

    return {
      doShowNextButton,
      doShowPrevButton,
      computedSlidesStyle,
      goTo: withPause(goTo),
      prev: withPause(prev),
      next: withPause(next),
      currentSlide,
      sliderToBeShown,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";

.va-carousel {
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  box-shadow: -1px -1px 15px -2px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  &__content {
    flex: 1;
    white-space: nowrap;
  }

  &__slides {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
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
    bottom: 10px;
    display: flex;
    justify-content: center;
    z-index: 2;

    & > * {
      margin: 0 5px;
    }
  }

  &__arrow {
    z-index: 1;

    &--right {
      right: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &--left {
      left: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &--vertical {
    .va-carousel__slide {
      display: flex;
    }
  }
}
</style>
