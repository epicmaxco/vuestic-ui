<template>
  <component
    :is="computedTag"
    translate="no"
    class="va-icon"
    :class="computedClass"
    :style="computedStyle"
    :aria-hidden="ariaHiddenComputed"
    v-bind="computedAttrs"
  >
    <slot>
      <template v-if="iconConfig.content">
        {{ iconConfig.content }}
      </template>
    </slot>
  </component>
</template>

<script lang="ts" setup>
import { PropType, computed, useAttrs } from 'vue'
import { AnyStringPropType } from '../../utils/types/prop-type'
import { VaIconName } from './types'

import {
  useComponentPresetProp,
  useColors,
  useSize, useSizeProps,
  useIcon,
} from '../../composables'
import { omit } from '../../utils/omit'

defineOptions({
  name: 'VaIcon',
})

const props = defineProps({
  ...useSizeProps,
  ...useComponentPresetProp,
  name: { type: String as AnyStringPropType<VaIconName>, default: '' },
  tag: { type: String },
  component: { type: Object as PropType<any> },
  color: { type: String },
  rotation: { type: [String, Number] },
  spin: { type: [String, Boolean] },
  flip: {
    type: String as PropType<'off' | 'horizontal' | 'vertical' | 'both'>,
    default: 'off',
    validator: (value: string) => ['off', 'horizontal', 'vertical', 'both'].includes(value),
  },
})

const { getColor } = useColors()
const { sizeComputed } = useSize(props)
const { getIcon } = useIcon()

const iconConfig = computed(() => getIcon(props.name))

const computedTag = computed(() => props.component || props.tag || iconConfig.value.component || iconConfig.value.tag || 'i')

const attrs = useAttrs()
const computedAttrs = computed(() => ({ ...iconConfig.value.attrs, ...omit(attrs, ['class']) }))

const getSpinClass = (spin?: string | boolean) => {
  if (spin === undefined || spin === false) { return }
  return spin === 'counter-clockwise' ? 'va-icon--spin-reverse' : 'va-icon--spin'
}

const computedClass = computed(() => [
  iconConfig.value.class,
  getSpinClass(props.spin ?? iconConfig.value.spin),
])

const transformStyle = computed(() => {
  const rotation = props.rotation ? `rotate(${props.rotation}deg)` : ''

  const flipY = (props.flip === 'vertical' || props.flip === 'both') ? -1 : 1
  const flipX = (props.flip === 'horizontal' || props.flip === 'both') ? -1 : 1
  const scale = props.flip === 'off' ? '' : `scale(${flipY}, ${flipX})`

  return `${scale} ${rotation}`.trim()
})

const computedStyle = computed(() => ({
  transform: transformStyle.value,
  cursor: attrs.onClick ? 'pointer' : null,
  color: props.color ? getColor(props.color, undefined, true) : iconConfig.value.color,
  fontSize: sizeComputed.value,
  height: sizeComputed.value,
  lineHeight: sizeComputed.value,
}))

const tabindexComputed = computed(() => attrs.tabindex as number | undefined ?? -1)
const ariaHiddenComputed = computed(() => (attrs.role !== 'button' && props.tag !== 'button') || tabindexComputed.value < 0)
</script>

<style lang="scss">
@import "variables";
@import '../../styles/resources';

.va-icon {
  vertical-align: var(--va-icon-vertical-align);
  user-select: var(--va-icon-user-select);

  &[role^="button"][tabindex]:not([tabindex^="-"]) {
    cursor: pointer;

    @include keyboard-focus-outline($radius: 2px);
  }

  &#{&} {
    // need 2 classes to make it work
    font-style: normal;
  }

  &--spin {
    animation: va-icon--spin-animation 1500ms linear infinite;

    &-reverse {
      animation: va-icon--spin-animation 1500ms linear infinite;
      animation-direction: reverse;
    }
  }

  @keyframes va-icon--spin-animation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  svg {
    fill: currentColor;
    height: 100%;
  }
}
</style>
