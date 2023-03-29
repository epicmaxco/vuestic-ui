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
        size: loaderSizeComputed,
        color: textColorComputed,
      }">
        <va-progress-circle
          class="va-button__loader"
          :size="loaderSizeComputed"
          :color="textColorComputed"
          :thickness="0.15"
          indeterminate
        />
      </slot>
      </template>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRefs, shallowRef } from 'vue'
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

export default defineComponent({
  name: 'VaButton',
  components: { VaIcon, VaProgressCircle },
  props: {
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
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
      validator: (v: string) => ['small', 'medium', 'large'].includes(v),
    },

    icon: { type: String, default: '' },
    iconRight: { type: String, default: '' },
    iconColor: { type: String, default: '' },
  },
  setup (props) {
    // colors
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    // loader size
    const { sizeComputed } = useSize(props)
    const loaderSizeComputed = computed(() => {
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

    const computedStyle = computed(() => ({
      borderColor: props.borderColor ? getColor(props.borderColor) : 'transparent',
      ...contentColorComputed.value,
    }))

    const publicMethods = { focus, blur }

    return {
      button,
      tagComputed,
      computedClass,
      computedStyle,
      textColorComputed,
      loaderSizeComputed,
      attributesComputed,
      wrapperClassComputed,
      iconAttributesComputed,

      backgroundColor,
      backgroundMaskColor,
      backgroundMaskOpacity,
      backgroundColorOpacity,

      ...publicMethods,
    }
  },
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
      font-size: var(--va-button-sm-line-height) !important;
      height: var(--va-button-sm-line-height) !important;
      line-height: var(--va-button-sm-line-height) !important;
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
      font-size: var(--va-button-line-height) !important;
      height: var(--va-button-line-height) !important;
      line-height: var(--va-button-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-button-icons-spacing);
    }

    .va-button__right-icon {
      margin-left: var(--va-button-icons-spacing);
    }

    &.va-button--bordered {
      .va-button__content {
        padding-top: calc(var(--va-button-content-py) - var(--va-button-bordered-border));
        padding-bottom: calc(var(--va-button-content-py) - var(--va-button-bordered-border));
      }
    }

    &.va-button--left-icon {
      .va-button__content {
        padding-left: var(--va-button-icon-side-padding);
      }
    }

    &.va-button--right-icon {
      .va-button__content {
        padding-right: var(--va-button-icon-side-padding);
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
      font-size: var(--va-button-lg-line-height) !important;
      height: var(--va-button-lg-line-height) !important;
      line-height: var(--va-button-lg-line-height) !important;
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
