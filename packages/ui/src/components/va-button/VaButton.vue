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
import { PropType, computed, toRefs, shallowRef } from 'vue'
import pick from 'lodash/pick.js'

import {
  useBem,
  useFocus,
  useHover, useHoverStyleProps,
  usePressed, usePressedStyleProps,
  useColors, useTextColor,
  useLoadingProps,
  useSize, useSizeProps,
  useRouterLink, useRouterLinkProps,
  useComponentPresetProp,
  useSlotPassed,
} from '../../composables'

import { useButtonBackground } from './hooks/useButtonBackground'
import { useButtonAttributes } from './hooks/useButtonAttributes'
import { useButtonTextColor } from './hooks/useButtonTextColor'

import { VaIcon } from '../va-icon'
import { VaProgressCircle } from '../va-progress-circle'

defineOptions({
  name: 'VaButton',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...useSizeProps,
  ...useHoverStyleProps,
  ...usePressedStyleProps,
  ...useLoadingProps,
  ...useRouterLinkProps,
  tag: { type: String, default: 'button' },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },

  color: { type: String, default: 'primary' },
  textColor: { type: String, default: '' },
  textOpacity: { type: Number, default: 1 },
  backgroundOpacity: { type: Number, default: 1 },
  borderColor: { type: String, default: '' },

    // only for filled bg state
  gradient: { type: Boolean, default: false },
  plain: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
    default: 'medium',
    validator: (v: string | number) => ['small', 'medium', 'large'].includes(v as string) || typeof v === 'number',
  },
  icon: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  iconColor: { type: String, default: '' },
})

// colors
const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

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
const { focus, blur } = useFocus(button)
const { isHovered } = useHover(button, disabled)
const { isPressed } = usePressed(button)

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
const computedClass = useBem('va-button', () => ({
  ...pick(props, ['disabled', 'block', 'loading', 'round', 'plain']),
  small: props.size === 'small',
  normal: !props.size || props.size === 'medium',
  large: props.size === 'large',
  opacity: props.textOpacity < 1,
  bordered: !!props.borderColor,
  iconOnly: isOnlyIcon.value,
  leftIcon: !isOnlyIcon.value && !!props.icon && !props.iconRight,
  rightIcon: !isOnlyIcon.value && !props.icon && !!props.iconRight,
  px: typeof props.size === 'number',
}))

// styles
const isTransparentBg = computed(() => props.plain || props.backgroundOpacity < 0.5)
const { textColorComputed } = useTextColor(colorComputed, isTransparentBg)

const {
  backgroundColor,
  backgroundColorOpacity,
  backgroundMaskOpacity,
  backgroundMaskColor,
} = useButtonBackground(colorComputed, isPressed, isHovered)
const contentColorComputed = useButtonTextColor(textColorComputed, colorComputed, isPressed, isHovered)

const computedPxSizeStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      '--va-button-px-size': `${props.size}px`,
      '--va-button-px-content-py': `${props.size * 0.2}px`,
      '--va-button-px-content-px': `${props.size * 0.3}px`,
      '--va-button-px-only-icon-content-px': `${props.size * 0.2}px`,
      '--va-button-px-font-size': `${props.size * 0.4}px`,
      '--va-button-px-letter-spacing': `${props.size * 0}px`,
      '--va-button-px-line-height': `${props.size * 0.5}px`,
      '--va-button-px-border-radius': `${props.size * 0.1}px`,
      '--va-button-px-icon-side-padding': `${props.size * 0.2}px`,
      '--va-button-px-icon-spacing': `${props.size * 0.1}px`,
    }
  }

  return {}
})

const computedStyle = computed(() => ({
  borderColor: props.borderColor ? getColor(props.borderColor) : 'transparent',
  ...contentColorComputed.value,
  ...computedPxSizeStyle.value,
}))

defineExpose({
  focus,
  blur,
})
</script>

<style lang='scss'>
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

  &--px {
    line-height: var(--va-button-px-line-height);
    border-radius: var(--va-button-px-border-radius);
    letter-spacing: var(--va-button-px-letter-spacing);
    min-height: var(--va-button-px-size);
    min-width: var(--va-button-px-size);

    .va-button__content {
      font-size: var(--va-button-px-font-size);
      padding: var(--va-button-px-content-py) var(--va-button-px-content-px);
      line-height: var(--va-button-px-line-height);
    }

    // set icons the same size as text
    .va-button__left-icon,
    .va-button__right-icon {
      // font-size: var(--va-button-px-line-height) !important;
      // height: var(--va-button-px-line-height) !important;
      // line-height: var(--va-button-px-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-button-px-icons-spacing);
    }

    .va-button__right-icon {
      margin-left: var(--va-button-px-icons-spacing);
    }

    &.va-button--bordered {
      .va-button__content {
        padding-top: calc(var(--va-button-px-content-py) - var(--va-button-bordered-border));
        padding-bottom: calc(var(--va-button-px-content-py) - var(--va-button-bordered-border));
      }
    }

    &.va-button--left-icon {
      .va-button__content {
        padding-left: var(--va-button-px-icon-side-padding);
      }
    }

    &.va-button--right-icon {
      .va-button__content {
        padding-right: var(--va-button-px-icon-side-padding);
      }
    }
  }

  &--small,
  &--normal,
  &--large,
  &--px {
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
