<template>
  <div
    class="va-parallax"
    :style="computedWrapperStyles"
    ref="rootElement"
  >
    <div class="va-parallax__image-container">
      <img
        class="va-parallax__image"
        ref="img"
        :src="$props.src"
        :alt="$props.alt"
        :style="computedImgStyles"
      />
    </div>
    <div class="va-parallax__item-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref, computed, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'VaParallax',
  props: {
    target: { type: [Object, String] as PropType<Element | string | undefined> },
    src: { type: String as PropType<string>, default: '', required: true },
    alt: { type: String as PropType<string>, default: 'parallax' },
    height: { type: Number as PropType<number>, default: 400 },
    reversed: { type: Boolean as PropType<boolean>, default: false },
    speed: {
      type: Number as PropType<number>,
      default: 0.5,
      validator: (value: number) => value >= 0 && value <= 1,
    },
  },
  setup (props) {
    const elOffsetTop = ref(0)
    const parallax = ref(0)
    const parallaxDist = ref(0)
    const percentScrolled = ref(0)
    const scrollTop = ref(0)
    const windowHeight = ref(0)
    const windowBottom = ref(0)
    const isLoaded = ref(false)

    const computedWrapperStyles = computed(() => ({ height: props.height + 'px' }))

    const computedImgStyles = computed(() => ({
      display: 'block',
      transform: `translate(-50%, ${parallax.value}px)`,
      opacity: isLoaded.value ? 1 : 0,
      top: props.reversed ? 0 : 'auto',
    }))

    const rootElement: Ref<HTMLElement | null> = ref(null)
    const targetElement = computed(() => {
      if (typeof props.target !== 'string') {
        return getScrollableParent(rootElement.value?.parentElement)
      }

      const element = document.querySelector(props.target)

      if (element) { return element }

      throw new Error('VaParallax target prop got wrong selector. Target is null')
    })
    const getScrollableParent = (element?: Element | null): Element | null => {
      if (!element) {
        return document.body
      }

      if (element.scrollHeight > element.clientHeight) {
        return element
      }

      return getScrollableParent(element.parentElement)
    }

    const img: Ref<HTMLImageElement | null> = ref(null)
    const imgHeight = computed(() => img.value?.naturalHeight || 0)

    const calcDimensions = () => {
      const offset = rootElement.value?.getBoundingClientRect() || { top: 0 }

      scrollTop.value = targetElement.value?.scrollTop || 0
      parallaxDist.value = imgHeight.value - props.height
      elOffsetTop.value = offset.top + scrollTop.value
      windowHeight.value = window.innerHeight
      windowBottom.value = scrollTop.value + windowHeight.value
    }

    const translate = () => {
      calcDimensions()

      percentScrolled.value = (windowBottom.value - elOffsetTop.value) / (props.height + windowHeight.value)

      parallax.value = Math.round(parallaxDist.value * percentScrolled.value) * props.speed

      if (props.reversed) {
        parallax.value = -parallax.value
      }
    }

    const addEventListeners = () => {
      targetElement.value?.addEventListener('scroll', translate)
      targetElement.value?.addEventListener('resize', translate)
    }

    const removeEventListeners = () => {
      targetElement.value?.removeEventListener('scroll', translate)
      targetElement.value?.removeEventListener('resize', translate)
    }

    const initImage = () => {
      if (img.value?.complete) {
        translate()
        addEventListeners()
      } else {
        img.value?.addEventListener('load', () => {
          translate()
          addEventListeners()
        }, false)
      }

      isLoaded.value = true
    }

    onMounted(initImage)
    onBeforeUnmount(removeEventListeners)

    return {
      img,
      rootElement,
      computedWrapperStyles,
      computedImgStyles,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-parallax {
  display: var(--va-parallax-display);
  position: var(--va-parallax-position);
  overflow: var(--va-parallax-overflow);
  width: var(--va-parallax-width);
  z-index: var(--va-parallax-z-index);
  font-family: var(--va-font-family);

  &__image-container {
    position: var(--va-parallax-image-container-position);
    top: var(--va-parallax-image-container-top);
    left: var(--va-parallax-image-container-left);
    right: var(--va-parallax-image-container-right);
    bottom: var(--va-parallax-image-container-bottom);
    z-index: var(--va-parallax-image-container-z-index);
    contain: var(--va-parallax-image-container-contain);
    user-select: var(--va-parallax-image-container-user-select);
  }

  &__image {
    position: var(--va-parallax-image-position);
    bottom: var(--va-parallax-image-bottom);
    left: var(--va-parallax-image-left);
    min-width: var(--va-parallax-image-min-width);
    min-height: var(--va-parallax-image-min-height);
    display: var(--va-parallax-image-display);
    transform: var(--va-parallax-image-transform);
    will-change: var(--va-parallax-image-will-change);
    transition: var(--va-parallax-image-transition);
    z-index: var(--va-parallax-image-z-index);
  }

  &__item-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    contain: strict;
  }
}
</style>
