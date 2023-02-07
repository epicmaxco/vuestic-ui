<template>
  <div
    ref="rootElement"
    class="va-parallax"
    :style="computedWrapperStyles"
  >
    <div class="va-parallax__image-container">
      <img
        ref="img"
        class="va-parallax__image"
        :src="$props.src"
        :alt="$props.alt"
        :style="computedImgStyles"
      />
    </div>
    <div class="va-parallax__item-container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useScrollParent } from '../../composables/useScrollParent'
import { defineComponent, PropType, ref, computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { warn } from '../../utils/console'

export default defineComponent({
  name: 'VaParallax',
  props: {
    ...useComponentPresetProp,
    target: { type: [Object, String] as PropType<HTMLElement | string | undefined> },
    src: { type: String, default: '', required: true },
    alt: { type: String, default: 'parallax' },
    height: { type: Number, default: 400 },
    reversed: { type: Boolean, default: false },
    speed: {
      type: Number,
      default: 0.5,
      validator: (value: number) => value >= 0 && value <= 1,
    },
  },
  setup (props) {
    const rootElement = shallowRef<HTMLElement>()
    const img = shallowRef<HTMLImageElement>()

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

    const { getScrollableParent } = useScrollParent()

    const targetElement = computed(() => {
      if (!props.target) {
        return getScrollableParent(rootElement.value?.parentElement)
      }

      if (props.target instanceof HTMLElement) { // there is a bug if to target passed ref
        return props.target
      }

      const element = document.querySelector(props.target)

      if (element) { return element }

      warn('VaParallax target prop got wrong selector. Target is null')
      return null
    })

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
  position: relative;
  overflow: hidden;
  width: var(--va-parallax-width);
  z-index: var(--va-parallax-z-index);
  font-family: var(--va-font-family);

  &__image-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    contain: var(--va-parallax-image-container-contain);
    user-select: var(--va-parallax-image-container-user-select);
  }

  &__image {
    position: absolute;
    bottom: 0;
    left: 50%;
    min-width: 100%;
    max-width: unset;
    min-height: 100%;
    display: none;
    transform: translate(-50%, 0);
    will-change: var(--va-parallax-image-will-change);
    transition: var(--va-parallax-image-transition);
    z-index: 1;
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
