<template>
  <component
    :is="tagComputed"
    ref="button"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    v-bind="attributesComputed"
  >
    <span class="va-button__content" :class="wrapperClassComputed">
      <slot
        name="prepend"
        v-bind="{ icon, iconAttributes: iconAttributesComputed }"
      >
        <va-icon
          v-if="icon"
          class="va-button__left-icon"
          :name="icon"
          v-bind="iconAttributesComputed"
        />
      </slot>
      <slot />
      <slot
        name="append"
        v-bind="{ icon: iconRight, iconAttributes: iconAttributesComputed }"
      >
        <va-icon
          v-if="iconRight"
          class="va-button__right-icon"
          :name="iconRight"
          v-bind="iconAttributesComputed"
        />
      </slot>
    </span>
    <template v-if="loading">
      <slot name="loading" v-bind="{
        size: iconSizeComputed,
        color: textColorComputed,
      }">
        <va-progress-circle
          class="va-button__loader"
          :size="iconSizeComputed"
          :color="textColorComputed"
          :thickness="0.15"
          indeterminate
        />
      </slot>
      </template>
  </component>
</template>

<script lang="ts" setup>
import { PropType, computed, toRefs, shallowRef, toRef } from 'vue'
import {
  useBem,
  useFocusableControl, useFocusableControlProps, useFocusableControlEmits,
  useColors, useElementTextColor,
  useLoadableControlProps,
  useSize, useSizeProps,
  useRouterLink, useRouterLinkProps,
  useComponentPresetProp,
  useSlotPassed,
  useNumericProp,
  useElementPressed,
  makeNumericProp,
  useElementHovered,
} from '../../composables'

import { useButtonBackground } from './hooks/useButtonBackground'
import { useButtonAttributes } from './hooks/useButtonAttributes'
import { useButtonTextColor } from './hooks/useButtonTextColor'

import { VaIcon, VaIconName } from '../va-icon'
import { VaProgressCircle } from '../va-progress-circle'
import { pick } from '../../utils/pick'

import type { ColorName } from '../../composables'
import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { VaButton } from '.'
defineOptions({
  name: 'VaButton',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...useSizeProps,
  ...useLoadableControlProps,
  ...useRouterLinkProps,
  ...useFocusableControlProps,
  tag: { type: String, default: 'button' },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },

  color: { type: String as PropType<ColorName>, default: 'primary' },
  textColor: { type: String, default: '' },
  textOpacity: makeNumericProp({ default: 1 }),
  backgroundOpacity: makeNumericProp({ default: 1 }),
  borderColor: { type: String, default: '' },

    // only for filled bg state
  gradient: { type: Boolean, default: false },
  plain: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
    validator: (v: string) => ['small', 'medium', 'large'].includes(v),
  },

  icon: { type: String as PropType<StringWithAutocomplete<VaIconName>>, default: '' },
  iconRight: { type: String, default: '' },
  iconColor: { type: String, default: '' },

  // Hover styles
  hoverBehavior: {
    type: String as PropType<'opacity' | 'mask'>,
    default: 'mask',
    validator: (value: string) => ['opacity', 'mask'].includes(value),
  },
  hoverOpacity: { type: [Number, String], default: 0.15 },
  hoverMaskColor: { type: String, default: 'textInverted' },

  // Pressed styles
  pressedBehavior: {
    type: String as PropType<'opacity' | 'mask'>,
    default: 'mask',
    validator: (value: string) => ['opacity', 'mask'].includes(value),
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: 'textPrimary' },
})

const emit = defineEmits([...useFocusableControlEmits])

// colors
const { getColor } = useColors()
// loader size
const { sizeComputed } = useSize(props)
const iconSizeComputed = computed(() => {
  const size = /([0-9]*)(px)/.exec(sizeComputed.value) as null | [string, string, string]
  return size ? `${+size[1] / 2}${size[2]}` : sizeComputed.value
})

// attributes
const { tagComputed } = useRouterLink(props)
const attributesComputed = useButtonAttributes(props)

// states
const { disabled } = toRefs(props)
const button = shallowRef<HTMLElement>()
const { focus, blur } = useFocusableControl(button, props, emit)
const isHovered = useElementHovered(button)
const isPressed = useElementPressed(button)

// icon attributes
const iconColorComputed = computed(() => props.iconColor ? getColor(props.iconColor) : textColorComputed.value)
const iconAttributesComputed = computed(() => ({
  color: iconColorComputed.value,
  size: props.size,
}))

// classes
const wrapperClassComputed = computed(() => ({ 'va-button__content--loading': props.loading }))

const isSlotContentPassed = useSlotPassed()

const isOneIcon = computed(() => !!((props.iconRight && !props.icon) || (!props.iconRight && props.icon)))
const isOnlyIcon = computed(() => !isSlotContentPassed.value && isOneIcon.value)
const textOpacityComputed = useNumericProp('textOpacity')
const backgroundOpacityComputed = useNumericProp('backgroundOpacity')

const computedClass = useBem('va-button', () => ({
  ...pick(props, ['disabled', 'block', 'loading', 'round', 'plain']),
  small: props.size === 'small',
  normal: !props.size || props.size === 'medium',
  large: props.size === 'large',
  opacity: textOpacityComputed.value! < 1,
  bordered: !!props.borderColor,
  iconOnly: isOnlyIcon.value,
  leftIcon: !isOnlyIcon.value && !!props.icon && !props.iconRight,
  rightIcon: !isOnlyIcon.value && !props.icon && !!props.iconRight,
}))

const color = toRef(props, 'color')

// styles
const isTransparentBg = computed(() => props.plain || backgroundOpacityComputed.value! < 0.5)
const textColorComputed = useElementTextColor(color, isTransparentBg)

const {
  backgroundColor,
  backgroundColorOpacity,
  backgroundMaskOpacity,
  backgroundMaskColor,
} = useButtonBackground(color, isPressed, isHovered)
const contentColorComputed = useButtonTextColor(textColorComputed, color, isPressed, isHovered)

const computedStyle = computed(() => ({
  borderColor: props.borderColor ? getColor(props.borderColor) : 'transparent',
  ...contentColorComputed.value,
}))

defineExpose({
  focus,
  blur,
})
</script>

<style lang="scss">
@import 'variables';
@import '../../styles/resources';

.va-button {
  position: relative;
  padding: var(--va-button-padding);
  display: var(--va-button-display);
  justify-content: var(--va-button-justify-content);
  align-items: var(--va-button-align-items);
  border-width: var(--va-button-border-width);
  border-color: var(--va-button-border-color);
  border-style: var(--va-button-border-style);
  background-image: var(--va-button-background-image);
  box-shadow: var(--va-button-box-shadow);
  font-family: var(--va-font-family);
  font-weight: var(--va-button-font-weight);
  text-decoration: none;
  text-transform: initial;
  transition: var(--va-button-transition);
  box-sizing: border-box;
  cursor: var(--va-button-cursor);
  z-index: 0;
  vertical-align: top;

  &::after,
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    left: 0;
    top: 0;
    z-index: -1;
  }

  &::before {
    background: v-bind(backgroundColor);
    opacity: v-bind(backgroundColorOpacity);
  }

  &::after {
    background-color: v-bind(backgroundMaskColor);
    opacity: v-bind(backgroundMaskOpacity);
  }

  &__content {
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;

    &--loading {
      opacity: 0;
    }
  }

  &--small {
    line-height: var(--va-button-sm-line-height);
    border-radius: var(--va-button-sm-border-radius);
    letter-spacing: var(--va-button-sm-letter-spacing);
    min-height: var(--va-button-sm-size);
    min-width: var(--va-button-sm-size);

    .va-button__content {
      font-size: var(--va-button-sm-font-size);
      padding: var(--va-button-sm-content-py) var(--va-button-sm-content-px);
    }

    // set icons the same size as text
    .va-button__left-icon,
    .va-button__right-icon {
      // font-size: var(--va-button-sm-line-height) !important;
      // height: var(--va-button-sm-line-height) !important;
      // line-height: var(--va-button-sm-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-button-sm-icons-spacing);
    }

    .va-button__right-icon {
      margin-left: var(--va-button-sm-icons-spacing);
    }

    &.va-button--bordered {
      .va-button__content {
        padding-top: calc(var(--va-button-sm-content-py) - var(--va-button-bordered-border));
        padding-bottom: calc(var(--va-button-sm-content-py) - var(--va-button-bordered-border));
      }
    }

    &.va-button--left-icon {
      .va-button__content {
        padding-left: var(--va-button-sm-icon-side-padding);
      }
    }

    &.va-button--right-icon {
      .va-button__content {
        padding-right: var(--va-button-sm-icon-side-padding);
      }
    }
  }

  &--normal {
    line-height: var(--va-button-line-height);
    border-radius: var(--va-button-border-radius);
    letter-spacing: var(--va-button-letter-spacing);
    min-height: var(--va-button-size);
    min-width: var(--va-button-size);

    .va-button__content {
      font-size: var(--va-button-font-size);
      padding: var(--va-button-content-py) var(--va-button-content-px);
      line-height: var(--va-button-line-height);
    }

    // set icons the same size as text
    .va-button__left-icon,
    .va-button__right-icon {
      // font-size: var(--va-button-line-height) !important;
      // height: var(--va-button-line-height) !important;
      // line-height: var(--va-button-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-gap-medium);
    }

    .va-button__right-icon {
      margin-left: var(--va-gap-medium);
    }

    &.va-button--bordered {
      .va-button__content {
        padding-top: calc(var(--va-button-content-py) - var(--va-button-bordered-border));
        padding-bottom: calc(var(--va-button-content-py) - var(--va-button-bordered-border));
      }
    }

    &.va-button--left-icon {
      .va-button__content {
        // padding-left: var(--va-button-icon-side-padding);
      }
    }

    &.va-button--right-icon {
      .va-button__content {
        // padding-right: var(--va-button-icon-side-padding);
      }
    }
  }

  &--large {
    line-height: var(--va-button-lg-line-height);
    border-radius: var(--va-button-lg-border-radius);
    letter-spacing: var(--va-button-lg-letter-spacing);
    min-height: var(--va-button-lg-size);
    min-width: var(--va-button-lg-size);

    .va-button__content {
      font-size: var(--va-button-lg-font-size);
      padding: var(--va-button-lg-content-py) var(--va-button-lg-content-px);
    }

    // set icons the same size as text
    .va-button__left-icon,
    .va-button__right-icon {
      // font-size: var(--va-button-lg-line-height) !important;
      // height: var(--va-button-lg-line-height) !important;
      // line-height: var(--va-button-lg-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-button-lg-icons-spacing);
    }

    .va-button__right-icon {
      margin-left: var(--va-button-lg-icons-spacing);
    }

    &.va-button--bordered {
      .va-button__content {
        padding-top: calc(var(--va-button-lg-content-py) - var(--va-button-bordered-border));
        padding-bottom: calc(var(--va-button-lg-content-py) - var(--va-button-bordered-border));
      }
    }

    &.va-button--left-icon {
      .va-button__content {
        padding-left: var(--va-button-lg-icon-side-padding);
      }
    }

    &.va-button--right-icon {
      .va-button__content {
        padding-right: var(--va-button-lg-icon-side-padding);
      }
    }
  }

  &--small,
  &--normal,
  &--large {
    &.va-button--icon-only {
      .va-button__content {
        padding-right: 0;
        padding-left: 0;
      }
    }
  }

  &--plain {
    min-width: auto;
    min-height: auto;

    .va-button__content {
      padding: 0;
      z-index: unset;
    }
  }

  &--round {
    border-radius: 999px;
  }

  &--bordered {
    border-width: var(--va-button-bordered-border);
    border-style: var(--va-button-bordered-style);
  }

  &.va-button--disabled {
    @include va-disabled;
  }

  &--icon-only {
    .va-button__left-icon,
    .va-button__right-icon {
      margin-left: 0;
      margin-right: 0;
    }

    .va-button__content {
      padding: 0;
    }
  }

  @include keyboard-focus-outline;

  &--loading {
    pointer-events: none;
  }

  &--block {
    display: flex;
    min-width: 100%;
  }

  &__loader {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
