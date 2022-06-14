<template>
  <component
    :is="tagComputed"
    ref="button"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    v-bind="attributesComputed"
  >
    <div class="va-button__content" :class="wrapperClassComputed">
      <va-icon
        v-if="icon"
        class="va-button__left-icon"
        :name="icon"
        v-bind="iconAttributesComputed"
      />
      <slot />
      <va-icon
        v-if="iconRight"
        class="va-button__right-icon"
        :name="iconRight"
        v-bind="iconAttributesComputed"
      />
    </div>
    <va-progress-circle
      v-if="loading"
      class="va-button__loader"
      :size="loaderSizeComputed"
      :color="textColorComputed"
      :thickness="0.15"
      indeterminate
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, ShallowRef, toRef } from 'vue'

import { useFocus } from '../../composables/useFocus'
import { useHover, useHoverProps } from '../../composables/useHover'
import { usePressed, usePressedProps } from '../../composables/usePressed'
import { useTextColor } from '../../composables/useTextColor'
import { useColors } from '../../services/color-config/color-config'
import {
  colorToRgba,
  isLightBackground,
  getGradientBackground,
  getStateMaskGradientBackground,
} from '../../services/color-config/color-functions'
import { useLoadingProps } from '../../composables/useLoading'
import { useSize, useSizeProps } from '../../composables/useSize'
import { useRouterLink, useRouterLinkProps } from '../../composables/useRouterLink'

import VaIcon from '../va-icon'
import { VaProgressCircle } from '../va-progress-circle'

export default defineComponent({
  name: 'VaButton',
  components: { VaIcon, VaProgressCircle },
  props: {
    ...useSizeProps,
    ...useHoverProps,
    ...usePressedProps,
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

    gradient: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },

    // only for standalone-icon state
    round: { type: Boolean, default: false },
    spaceBetweenItems: { type: Boolean, default: false },
    size: {
      type: String as PropType<'small' | 'medium'>,
      default: 'medium',
      validator: (v: string) => ['small', 'medium'].includes(v),
    },

    icon: { type: String, default: '' },
    iconRight: { type: String, default: '' },
    iconColor: { type: String, default: '' },
  },
  setup (props, { slots }) {
    // colors
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color, 'primary'))
    const isTransparentBg = toRef(props, 'plain')

    // loader size
    const { sizeComputed } = useSize(props)
    const loaderSizeComputed = computed(() => {
      const size = /([0-9]*)(px)/.exec(sizeComputed.value) as null | [string, string, string]
      return size ? `${+size[1] / 2}${size[2]}` : sizeComputed.value
    })

    // attributes
    const { tagComputed, hrefComputed, isLinkTag } = useRouterLink(props)
    const linkAttributesComputed = computed(() => {
      if (!isLinkTag.value) { return {} }

      return tagComputed.value === 'a'
        ? {
          target: props.target,
          href: hrefComputed.value,
        }
        : {
          target: props.target,
          to: props.to,
          replace: props.replace,
          append: props.append,
          activeClass: props.activeClass,
          exact: props.exact,
          exactActiveClass: props.exactActiveClass,
        }
    })

    const typeComputed = computed(() => isLinkTag.value ? undefined : props.type)
    const buttonAttributesComputed = computed(() => {
      const disabledAttributes = {
        ariaDisabled: props.disabled,
        disabled: props.disabled,
      }

      if (isLinkTag.value) { return disabledAttributes }

      return {
        type: typeComputed.value,
        tabindex: props.loading || props.disabled ? -1 : 0,
        ...disabledAttributes,
      }
    })

    const attributesComputed = computed(() => ({ ...linkAttributesComputed.value, ...buttonAttributesComputed.value }))

    // states
    const button: ShallowRef<HTMLElement | undefined> = ref()
    const { isFocused, focus, blur } = useFocus(button)
    const { isHovered } = useHover(button)
    const { isPressed } = usePressed(button)

    // icon attributes
    const iconColorComputed = computed(() => props.iconColor ? getColor(props.iconColor) : textColorComputed.value)
    const iconAttributesComputed = computed(() => ({
      size: props.size,
      color: iconColorComputed.value,
    }))

    // classes
    const wrapperClassComputed = computed(() => ({ 'va-button__content--loading': props.loading }))

    const isSlotContentPassed = computed(() => !!slots.default?.()?.[0]?.children)
    const isOneIcon = computed(() => (props.iconRight && !props.icon) || (!props.iconRight && props.icon))
    const computedClass = computed(() => ({
      'va-button--small': props.size === 'small',
      'va-button--normal': !props.size || props.size === 'medium',
      'va-button--plain': props.plain,
      'va-button--opacity': props.textOpacity < 1,
      'va-button--icon-only': !slots.default && isOneIcon.value,
      'va-button--round': props.round && !isSlotContentPassed.value && isOneIcon.value,
      'va-button--bordered': !!props.borderColor,
      'va-button--no-label': !isSlotContentPassed.value,
      'va-button--space-between-items': props.spaceBetweenItems,
      'va-button--focused': isFocused.value,
      'va-button--loading': props.loading,
      'va-button--block': props.block,
      'va-button--disabled': props.disabled,
    }))

    // background color
    const backgroundColorComputed = computed(() => (
      props.gradient
        ? getGradientBackground(colorComputed.value)
        : colorComputed.value
    ))

    const getOpacityStateBackground = (stateOpacity: number) => ({
      background: props.gradient
        ? backgroundColorComputed.value
        : colorToRgba(backgroundColorComputed.value, stateOpacity),
    })

    const getStateBackground = (maskColor: string, stateOpacity: number, stateBehaviour: string) => {
      return stateBehaviour === 'opacity'
        ? { ...getOpacityStateBackground(stateOpacity) }
        : { background: getStateMaskGradientBackground(colorComputed.value, maskColor, stateOpacity) }
    }

    const hoverBackgroundComputed = computed(() => {
      return getStateBackground(props.hoverMaskColor, props.hoverOpacity, props.hoverBehaviour)
    })

    const pressedBackgroundComputed = computed(() => {
      return getStateBackground(props.pressedMaskColor, props.pressedOpacity, props.pressedBehaviour)
    })

    const backgroundComputed = computed(() => {
      if (isTransparentBg.value) { return { background: 'transparent' } }
      if (isPressed.value) { return pressedBackgroundComputed.value }
      if (isHovered.value) { return hoverBackgroundComputed.value }

      return { ...getOpacityStateBackground(props.backgroundOpacity) }
    })

    // content color
    const plainColorStyles = computed(() => ({
      color: 'transparent',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      background: textColorComputed.value,
      opacity: getPlainTextOpacity.value,
    }))

    const getStateColor = (maskColor: string, stateOpacity: number, stateBehaviour: string) => {
      const res = stateBehaviour === 'opacity'
        ? { color: colorToRgba(textColorComputed.value, stateOpacity) }
        : { background: getStateMaskGradientBackground(colorComputed.value, maskColor, stateOpacity) }
      return { ...plainColorStyles.value, ...res }
    }

    const hoverTextColorComputed = computed(() => {
      return getStateColor(props.hoverMaskColor, props.hoverOpacity, props.hoverBehaviour)
    })

    const pressedTextColorComputed = computed(() => {
      return getStateColor(props.pressedMaskColor, props.pressedOpacity, props.pressedBehaviour)
    })

    const { textColorComputed } = useTextColor(
      colorComputed,
      isTransparentBg.value || isLightBackground(colorComputed.value, props.backgroundOpacity),
    )

    const getPlainTextOpacity = computed(() => {
      if (props.disabled) { return undefined }
      if (props.textOpacity === 1 || (isHovered.value && !isPressed.value)) { return 1 }
      return isPressed.value ? 0.9 : props.textOpacity
    })

    const contentColorComputed = computed(() => {
      const defaultColorStyles = {
        color: textColorComputed.value,
      }

      props.plain && Object.assign(defaultColorStyles, plainColorStyles.value)

      if (!isTransparentBg.value) { return defaultColorStyles }
      if (isPressed.value) { return pressedTextColorComputed.value }
      if (isHovered.value) { return hoverTextColorComputed.value }
      return defaultColorStyles
    })

    // styles object
    const computedStyle = computed(() => ({
      borderColor: props.borderColor ? getColor(props.borderColor) : 'transparent',
      ...backgroundComputed.value,
      ...contentColorComputed.value,
    }))

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

      // exposed only for external usage
      focus,
      blur,
    }
  },
})
</script>

<style lang='scss'>
@import 'variables';
@import '../../styles/resources';

.va-button {
  position: relative;
  margin: var(--va-button-margin);
  padding: var(--va-button-padding);
  display: var(--va-button-display);
  justify-content: var(--va-button-justify-content);
  align-items: var(--va-button-align-items);
  border: var(--va-button-border);
  background-image: var(--va-button-background-image);
  box-shadow: var(--va-button-box-shadow);
  font-family: var(--va-font-family);
  font-weight: var(--va-button-font-weight);
  text-decoration: none;
  text-transform: initial;
  transition: var(--va-button-transition);
  box-sizing: border-box;
  cursor: pointer;

  &__content {
    height: 100%;
    display: flex;
    align-items: center;

    &__title,
    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      white-space: nowrap;
    }

    &--loading {
      opacity: 0;
    }
  }

  &--small {
    @include va-button(var(--va-button-sm-content-py), var(--va-button-sm-content-px), var(--va-button-sm-font-size), var(--va-button-sm-line-height), var(--va-button-sm-border-radius));

    letter-spacing: var(--va-button-sm-letter-spacing);
    min-height: var(--va-button-sm-size);
    min-width: var(--va-button-sm-size);

    .va-button__content {
      padding: var(--va-button-sm-content-py) var(--va-button-sm-content-px);
    }

    &.va-button--icon-only {
      width: var(--va-button-sm-size);
      height: var(--va-button-sm-size);

      & .va-button__content {
        padding-right: var(--va-button-sm-content-px);
        padding-left: var(--va-button-sm-content-px);
      }
    }

    &.va-button--bordered {
      line-height: calc(var(--va-button-sm-line-height) - 2 * var(--va-button-bordered-border));
    }

    .va-button__left-icon,
    .va-button__right-icon {
      // until we haven't size config for icons
      font-size: var(--va-button-sm-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-button-sm-icons-spacing);
    }

    .va-button__right-icon {
      margin-left: var(--va-button-sm-icons-spacing);
    }
  }

  &--normal {
    @include va-button(var(--va-button-content-py), var(--va-button-content-px), var(--va-button-font-size), var(--va-button-line-height), var(--va-button-border-radius));

    letter-spacing: var(--va-button-letter-spacing);
    min-height: var(--va-button-size);
    min-width: var(--va-button-size);

    .va-button__content {
      padding: var(--va-button-content-py) var(--va-button-content-px);
      line-height: var(--va-button-line-height);
    }

    &.va-button--icon-only {
      width: var(--va-button-size);
      height: var(--va-button-size);

      & .va-button__content {
        padding-right: var(--va-button-content-px);
        padding-left: var(--va-button-content-px);
      }
    }

    &.va-button--bordered {
      line-height: calc(var(--va-button-line-height) - 2 * var(--va-button-bordered-border));
    }

    .va-button__left-icon,
    .va-button__right-icon {
      // until we haven't size config for icons
      font-size: var(--va-button-line-height) !important;
    }

    .va-button__left-icon {
      margin-right: var(--va-button-icons-spacing);
    }

    .va-button__right-icon {
      margin-left: var(--va-button-icons-spacing);
    }
  }

  &--plain {
    min-width: auto;
    min-height: auto;

    & .va-button__content {
      padding: 0;
    }
  }

  &--round {
    border-radius: 50%;
  }

  &--bordered {
    border-width: var(--va-button-bordered-border);
    border-style: var(--va-button-bordered-style);
  }

  &.va-button--disabled {
    @include va-disabled;
  }

  &.va-button--disabled.va-button--opacity {
    opacity: 0.24;
  }

  &--no-label {
    .va-button__left-icon,
    .va-button__right-icon {
      margin-left: 0;
      margin-right: 0;
    }
  }

  &--space-between-items {
    .va-button__content > * {
      margin-right: calc(var(--va-button-space-between-items) / 2);
      margin-left: calc(var(--va-button-space-between-items) / 2);

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &--focused {
    @include focus-outline;
  }

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
