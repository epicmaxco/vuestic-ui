<template>
  <va-aspect-ratio
    ref="root"
    class="va-image"
    v-bind="aspectRationAttributesComputed"
  >
    <picture
      v-show="isSuccessfullyLoaded"
      class="va-image__content"
      :aria-busy="isLoading"
    >
      <slot v-if="$slots.sources" name="sources" />

      <img
        v-if="isReadyForRender"
        ref="image"
        v-bind="imgAttributesComputed"
        @error="handleError"
        @load="handleLoad"
      />
    </picture>

    <div
      v-if="$slots.default && isSuccessfullyLoaded"
      class="va-image__overlay"
    >
      <slot />
    </div>

    <div
      v-if="isError && ($slots.error || isAnyFallbackPassed)"
      class="va-image__error"
    >
      <slot name="error">
        <va-fallback v-bind="fallbackProps" @fallback="$emit('fallback')" />
      </slot>
    </div>

    <div
      v-if="isLoading && $slots.loader"
      class="va-image__loader"
    >
      <slot name="loader" />
    </div>

    <div
      v-if="isPlaceholderShown"
      class="va-image__placeholder"
    >
      <slot name="placeholder">
        <img
          v-if="$props.placeholderSrc"
          :src="$props.placeholderSrc"
          alt=""
        />
      </slot>
    </div>
  </va-aspect-ratio>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  type PropType,
  useSlots,
} from 'vue'

import { VaAspectRatio } from '../va-aspect-ratio'
import { VaFallback } from '../va-fallback'

import { useNativeImgAttributes, useNativeImgAttributesProps } from './hooks/useNativeImgAttributes'
import {
  useComponentPresetProp,
  useIsMounted,
  useIntersectionObserver,
  useGlobalConfig,
} from '../../composables'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { pick } from '../../utils/pick'

const VaFallbackProps = extractComponentProps(VaFallback)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaImage',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...useNativeImgAttributesProps,
  ...VaFallbackProps,
  ratio: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 'auto',
    validator: (v: number | 'auto') => {
      if (typeof v === 'number') {
        return v > 0
      }

      return v === 'auto'
    },
  },
  fit: {
    type: String as PropType<'contain' | 'fill' | 'cover' | 'scale-down' | 'none'>,
    default: 'cover',
  },
  maxWidth: {
    type: [Number, String],
    default: 0,
    validator: (v: number | string) => Number(v) >= 0,
  },
  lazy: { type: Boolean, default: false },
  placeholderSrc: { type: String, default: '' },
})

const emit = defineEmits(['loaded', 'error', 'fallback'])

const root = ref<HTMLElement>()
const image = ref<HTMLImageElement>()

const renderedImage = ref()
const currentImage = computed(() => renderedImage.value || props.src)

const imgWidth = ref(1)
const imgHeight = ref(1)

const isLoading = ref(false)
const isError = ref(false)

const handleLoad = () => {
  isLoading.value = true

  if (!isReadyForLoad.value) { return }

  isLoading.value = false

  renderedImage.value = image.value?.currentSrc
  getImgSizes()

  emit('loaded', currentImage.value)
}

const handleError = (err?: Event) => {
  isError.value = true
  isLoading.value = false

  emit('error', err || currentImage.value)
}

const isIntersecting = ref(false)
const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) { return }

    isIntersecting.value = true
    init()
    observer.disconnect()
  })
}
useIntersectionObserver(root, handleIntersection, undefined)
const isReadyForLoad = computed(() => !props.lazy || isIntersecting.value)
const isMounted = useIsMounted()
const isReadyForRender = computed(() => !props.lazy || (props.lazy && isMounted.value && isReadyForLoad.value))

const init = () => {
  if (!props.src || (isLoading.value && !props.lazy) || !isReadyForLoad.value) {
    return
  }

  isLoading.value = true
  isError.value = false

  nextTick(() => {
    if (!image.value?.complete) {
      return
    }

    if (!image.value.naturalWidth) {
      handleError()
      return
    }

    handleLoad()
  })
}

let timer: ReturnType<Window['setTimeout']>
const getImgSizes = () => {
  clearTimeout(timer)

  if (isLoading.value) {
    timer = window.setTimeout(getImgSizes, 100)
  }

  const { naturalHeight, naturalWidth } = image.value || {}
  if (naturalHeight && naturalWidth) {
    imgWidth.value = naturalHeight
    imgHeight.value = naturalWidth
  }
}

onBeforeMount(init)
onBeforeUnmount(() => clearTimeout(timer))
watch(() => props.src, init)

const slots = useSlots()
const isPlaceholderPassed = computed(() => slots?.placeholder?.() || props.placeholderSrc)
const isLoaderShown = computed(() => isLoading.value && !slots?.loader?.())
const isErrorShown = computed(() => isError.value && (!slots?.error?.() && !isAnyFallbackPassed.value))
const isPlaceholderShown = computed(() => (isLoaderShown.value || isErrorShown.value) && isPlaceholderPassed.value)

const isSuccessfullyLoaded = computed(() => !(isLoading.value || isError.value))

const imgAttributesComputed = useNativeImgAttributes(props)

const aspectRationAttributesComputed = computed(() => ({
  ...pick(props, ['ratio', 'maxWidth']),
  contentWidth: imgWidth.value,
  contentHeight: imgHeight.value,
}))

const fallbackProps = filterComponentProps(VaFallbackProps)
const checkObjectNonEmptyValues = (obj: Record<string, any> | undefined) => !!Object.values(obj || {}).filter((prop) => prop).length
const hasFallbackGlobalConfig = computed(() => checkObjectNonEmptyValues(useGlobalConfig()?.globalConfig?.value?.components?.VaFallback))
const isAnyFallbackPassed = computed(() => checkObjectNonEmptyValues(fallbackProps.value) || hasFallbackGlobalConfig.value)

const fitComputed = computed(() => props.fit)
</script>

<style lang="scss">
@import 'variables';

.va-image {
  &__content {
    position: var(--va-image-content-position);
    inset: 0;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: v-bind(fitComputed);
      object-position: var(--va-image-content-img-object-position);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
  }

  &__placeholder,
  &__loader,
  &__error,
  &__overlay {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
