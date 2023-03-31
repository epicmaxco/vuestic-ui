<template>
  <div
    class="va-avatar"
    :class="classesComputed"
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
        v-if="$props.src && !hasLoadError"
        :src="$props.src"
        :alt="$props.alt"
        @error="onLoadError"
      >
      <slot v-else-if="hasLoadError && $props.src" name="fallback">
        <va-fallback v-bind="VaFallbackProps" @fallback="$emit('fallback')" />
      </slot>
      <va-icon
        v-else-if="$props.icon"
        :name="$props.icon"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import pick from 'lodash/pick'

import {
  useBem,
  useSize,
  useColors,
  useTextColor,
  useSizeProps,
  useLoadingProps,
  useComponentPresetProp,
} from '../../composables'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import { VaIcon, VaProgressCircle, VaFallback } from '../index'
import { useAvatarProps } from './hooks/useAvatarProps'

const VaFallbackProps = extractComponentProps(VaFallback)

export default defineComponent({
  name: 'VaAvatar',

  components: { VaIcon, VaProgressCircle, VaFallback },

  props: {
    ...useLoadingProps,
    ...useSizeProps,
    ...useComponentPresetProp,
    ...useAvatarProps,
    ...VaFallbackProps,

    src: { type: String, default: null },
    icon: { type: String, default: '' },
    alt: { type: String, default: '' },
  },

  emits: ['error', 'fallback'],

  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const backgroundColorComputed = computed(() => {
      if (props.loading || (props.src && !hasLoadError.value)) {
        return 'transparent'
      }

      return colorComputed.value
    })
    const { sizeComputed, fontSizeComputed } = useSize(props, 'VaAvatar')
    const { textColorComputed } = useTextColor()

    const computedStyle = computed(() => ({
      fontSize: props.fontSize || fontSizeComputed.value,
    }))

    const classesComputed = useBem('va-avatar', () => ({
      ...pick(props, ['square']),
    }))

    const hasLoadError = ref(false)

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
      hasLoadError,
      sizeComputed,
      avatarOptions,
      computedStyle,
      colorComputed,
      classesComputed,
      textColorComputed,
      backgroundColorComputed,
      VaFallbackProps: filterComponentProps(VaFallbackProps),

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

  &--square {
    --va-avatar-border-radius: 0;
  }

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
