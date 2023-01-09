<template>
  <div
    class="va-avatar"
    :style="computedStyle"
    :aria-hidden="!$props.src"
    aria-live="polite"
  >
    <va-progress-circle
      v-if="$props.loading"
      :size="sizeComputed"
      :color="colorComputed"
      indeterminate
    />
    <slot v-bind="avatarOptions" v-else>
      <img
        v-if="srcComputed"
        :src="srcComputed"
        :alt="$props.alt"
        @error="onLoadError"
      >
      <va-icon
        v-else-if="$props.icon"
        :name="$props.icon"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

import {
  useSize,
  useColors,
  useTextColor,
  useSizeProps,
  useLoadingProps,
  useComponentPresetProp,
} from '../../composables'

import { VaIcon, VaProgressCircle } from '../index'
import { useAvatarProps } from './hooks/useAvatarProps'

export default defineComponent({
  name: 'VaAvatar',

  components: { VaIcon, VaProgressCircle },

  props: {
    ...useLoadingProps,
    ...useSizeProps,
    ...useComponentPresetProp,
    ...useAvatarProps,

    src: { type: String, default: null },
    icon: { type: String, default: '' },
    alt: { type: String, default: '' },
  },

  emits: ['error', 'fallback'],

  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const backgroundColorComputed = computed(() => props.loading || props.src ? 'transparent' : colorComputed.value)
    const { sizeComputed, fontSizeComputed } = useSize(props, 'VaAvatar')
    const { textColorComputed } = useTextColor()

    const computedStyle = computed(() => ({
      borderRadius: props.square ? 0 : '',
      fontSize: props.fontSize || fontSizeComputed.value,
    }))

    const hasLoadError = ref(false)

    const srcComputed = computed(() => {
      if (props.src && props.fallbackSrc && hasLoadError.value) {
        emit('fallback')

        return props.fallbackSrc
      }

      return props.src
    })

    const onLoadError = (event: Event) => {
      hasLoadError.value = true
      emit('error', event)
    }

    watch(() => props.src, () => {
      hasLoadError.value = false
    })

    const avatarOptions = computed(() => ({
      hasError: hasLoadError.value,
      onError: onLoadError,
    }))

    return {
      srcComputed,
      sizeComputed,
      avatarOptions,
      computedStyle,
      colorComputed,
      textColorComputed,
      backgroundColorComputed,

      onLoadError,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-avatar {
  align-items: var(--va-avatar-align-items);
  display: var(--va-avatar-display);
  justify-content: var(--va-avatar-justify-content);
  line-height: var(--va-avatar-line-height);
  position: var(--va-avatar-position);
  text-align: var(--va-avatar-text-align);
  vertical-align: var(--va-avatar-vertical-align);
  border-radius: var(--va-avatar-border-radius);
  font-family: var(--va-font-family);
  background-color: v-bind(backgroundColorComputed);
  color: v-bind(textColorComputed);
  width: v-bind(sizeComputed);
  min-width: v-bind(sizeComputed);  // We only define width because common use case would be flex row, for column we expect user to set appropriate styling externally.
  height: v-bind(sizeComputed);

  img,
  svg {
    border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    margin: auto;
  }
}
</style>
