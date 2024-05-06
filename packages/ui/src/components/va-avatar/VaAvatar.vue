<template>
  <div
    class="va-avatar"
    :class="classesComputed"
    :style="computedStyle"
    v-bind="variablesComputed"
  >
    <va-progress-circle
      v-if="$props.loading"
      :size="props.size"
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
      <slot v-else name="fallback">
        <va-fallback v-bind="VaFallbackProps" @fallback="$emit('fallback')" />
      </slot>
    </slot>
  </div>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue'
import pick from 'lodash/pick'

import {
  useBem,
  useColors,
  useTextColor,
  useSizeProps,
  useLoadingProps,
  useComponentPresetProp,
} from '../../composables'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import { VaIcon, VaProgressCircle, VaFallback } from '../index'

import { useComponentVariables } from '../../composables/useComponentVariables'
import type { Variables, Sizes } from './const'

const VaFallbackPropsDeclaration = extractComponentProps(VaFallback)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaAvatar',
})

const props = defineProps({
  ...useLoadingProps,
  ...useSizeProps<Variables, Sizes>(),
  ...useComponentPresetProp,
  ...VaFallbackPropsDeclaration,

  color: { type: String, default: 'primary' },
  textColor: { type: String },
  square: { type: Boolean, default: false },
  fontSize: { type: String, default: '' },
  src: { type: String, default: null },
  icon: { type: String, default: '' },
  alt: { type: String, default: '' },
})

const emit = defineEmits(['error', 'fallback'])

const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))
const backgroundColorComputed = computed(() => {
  if (props.loading || (props.src && !hasLoadError.value)) {
    return undefined
  }

  return colorComputed.value
})

const { textColorComputed } = useTextColor(backgroundColorComputed)

const variablesComputed = useComponentVariables(props)

const computedStyle = computed(() => ({
  fontSize: props.fontSize,
}))

const classesComputed = useBem('va-avatar', () => pick(props, ['square']))

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

const VaFallbackProps = filterComponentProps(VaFallbackPropsDeclaration)

defineExpose({
  hasLoadError,
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
  width: var(--va-avatar-size);
  min-width: var(--va-avatar-size);  // We only define width because common use case would be flex row, for column we expect user to set appropriate styling externally.
  height: var(--va-avatar-size);
  font-size: var(--va-avatar-font-size, var(--va-font-size));

  &--small {
    --va-avatar-size: 32px;
  }

  &--large {
    --va-avatar-size: 64px;
  }

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
