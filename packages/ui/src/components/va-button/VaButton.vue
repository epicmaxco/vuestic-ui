<template>
  <component
    :is="tagComputed"
    ref="button"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    v-bind="{ ...buttonAttributesComputed, ...linkAttributesComputed }"
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
import { defineComponent, PropType, computed, ref, ShallowRef } from 'vue'

import { useHover } from '../../composables/useHover'
import { useFocus } from '../../composables/useFocus'
import { usePressed } from '../../composables/usePressed'
import { useTextColor } from '../../composables/useTextColor'
import { useColors } from '../../services/color-config/color-config'
import { colorToRgba, getGradientBackground } from '../../services/color-config/color-functions'

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
    ...useLoadingProps,
    ...useRouterLinkProps,
    tag: { type: String, default: 'button' },
    type: { type: String, default: 'button' },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

    color: { type: String, default: 'primary' },
    textColor: { type: String, default: '' },
    borderColor: { type: String, default: '' },
    backgroundColor: { type: String, default: '' },
    backgroundOpacity: { type: Number, default: 1 },
    contentOpacity: { type: Number, default: 1 },

    hoverBehaviour: { type: String as PropType<'opacity' | 'gradient'>, default: '' },
    hoverOpacity: { type: Number, default: 1 },
    hoverGradientMask: { type: String, default: 'rgba(255, 255, 255, 0.15)' },

    pressedBehaviour: { type: String as PropType<'opacity' | 'gradient'>, default: '' },
    pressedOpacity: { type: Number, default: 1 },
    pressedGradientMask: { type: String, default: 'rgba(0, 0, 0, 0.13)' },

    gradient: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
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

    // temp
    preset: { type: String, default: '' },
  },
  setup (props, { slots }) {
    // colors
    const { getColor } = useColors()
    const bgColorComputed = computed(() => getColor(props.backgroundColor, 'primary'))
    const colorComputed = computed(() => getColor(props.color, 'primary'))

    // loader size
    const { sizeComputed } = useSize(props)
    const loaderSizeComputed = computed(() => {
      const size = /([0-9]*)(px)/.exec(sizeComputed.value) as null | [string, string, string]
      return size ? `${+size[1] / 2}${size[2]}` : sizeComputed.value
    })

    // link attributes
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

    // button attributes
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

    // states
    const button: ShallowRef<HTMLElement | undefined> = ref()
    const { isFocused } = useFocus(button)
    const { isHovered } = useHover(button)
    const { isPressed } = usePressed(button)

    // icons attributes
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
      'va-button--round': props.round && (!slots.default && isOneIcon.value),
      'va-button--bordered': !!props.borderColor,
      'va-button--no-label': !isSlotContentPassed.value,
      'va-button--space-between-items': props.spaceBetweenItems,
      'va-button--focused': isFocused.value,
      'va-button--loading': props.loading,
      'va-button--block': props.block,
      'va-button--disabled': props.disabled,
    }))

    // background color
    const gradientBgColorComputed = computed(() => getGradientBackground(bgColorComputed.value))

    const backGroundColorComputed = computed(() => props.gradient
      ? gradientBgColorComputed.value
      : bgColorComputed.value)

    const hoverBackgroundComputed = computed(() => {
      if (!props.backgroundColor) { return { background: 'transparent' } }

      if (props.hoverBehaviour === 'opacity') {
        return {
          [props.gradient ? 'background' : 'backgroundColor']: backGroundColorComputed.value,
          backgroundOpacity: props.hoverOpacity,
        }
      } else {
        return {
          background: getGradientBackground(bgColorComputed.value, props.hoverGradientMask),
        }
      }
    })

    const pressedBackgroundComputed = computed(() => {
      if (!props.backgroundColor) { return { background: 'transparent' } }

      if (props.pressedBehaviour === 'opacity') {
        return {
          [props.gradient ? 'background' : 'backgroundColor']: backGroundColorComputed.value,
          backgroundOpacity: props.pressedOpacity,
        }
      } else {
        return {
          background: getGradientBackground(bgColorComputed.value, props.pressedGradientMask),
        }
      }
    })

    const backgroundComputed = computed(() => {
      if (!props.backgroundColor && !isHovered.value && !isPressed.value) { return { background: 'transparent' } }

      if (isHovered.value) { return hoverBackgroundComputed.value }

      if (isPressed.value) { return pressedBackgroundComputed.value }

      return { [props.gradient ? 'background' : 'backgroundColor']: backGroundColorComputed.value }
    })

    // content color
    const { textColorComputed } = useTextColor(colorComputed, !!props.backgroundColor)
    const contentColorComputed = computed(() => {
      if (props.backgroundColor) { return textColorComputed.value }

      if (isHovered.value && props.hoverOpacity) {
        return colorToRgba(textColorComputed.value, props.hoverOpacity)
      }

      if (isPressed.value && props.pressedOpacity) {
        return colorToRgba(textColorComputed.value, props.pressedOpacity)
      }

      return textColorComputed.value
    })

    // final styles object
    const computedStyle = computed(() => {
      return {
        color: contentColorComputed.value,
        borderColor: props.borderColor ? getColor(props.borderColor) : 'inherit',
        ...backgroundComputed.value,
      }
    })

    return {
      button,
      tagComputed,
      computedClass,
      computedStyle,
      textColorComputed,
      loaderSizeComputed,
      wrapperClassComputed,
      iconAttributesComputed,
      linkAttributesComputed,
      buttonAttributesComputed,
    }
  },
})
</script>

<style lang='scss'>
@import 'variables';
@import '../../styles/resources';

.va-button {

  // check only this & then unused variables
  display: var(--va-button-display);
  align-items: var(--va-button-align-items);
  justify-content: var(--va-button-justify-content);
  border: var(--va-button-border);
  background-image: var(--va-button-background-image);
  box-shadow: var(--va-button-box-shadow);
  font-family: var(--va-font-family);
  text-decoration: none !important;
  text-transform: initial;
  cursor: pointer;
  transition: var(--va-button-transition);
  background-color: var(--va-button-background-color);
  vertical-align: middle;
  box-sizing: border-box;
  font-weight: var(--va-button-font-weight);
  margin: var(--va-button-margin);
  padding: var(--va-button-padding);
  position: relative;

  // checked
  &__content {
    height: 100%;
    display: flex;
    align-items: center;

    // checked
    &__title,
    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      white-space: nowrap;
    }

    // checked
    &--loading {
      opacity: 0;
    }
  }

  // checked
  &--small {
    @include va-button(var(--va-button-sm-content-py), var(--va-button-sm-content-px), var(--va-button-sm-font-size), var(--va-button-sm-line-height), var(--va-button-sm-border-radius));

    letter-spacing: var(--va-button-sm-letter-spacing);
    min-height: var(--va-button-sm-size);
    min-width: var(--va-button-sm-size);

    .va-button__content {
      padding: var(--va-button-sm-content-py) var(--va-button-sm-content-px);
    }

    &.va-button--round {
      width: var(--va-button-sm-size);
      height: var(--va-button-sm-size);
    }

    &.va-button--bordered {
      line-height: calc(var(--va-button-sm-line-height) - 2 * var(--va-button-bordered-border));
    }

    .va-button__left-icon {
      margin-left: calc(var(--va-button-sm-content-px) / -2);
      margin-right: calc(var(--va-button-space-between-items) / 2);
    }

    .va-button__right-icon {
      margin-left: calc(var(--va-button-space-between-items) / 2);
      margin-right: calc(var(--va-button-sm-content-px) / -2);
    }
  }

  // checked
  &--normal {
    @include va-button(var(--va-button-content-py), var(--va-button-content-px), var(--va-button-font-size), var(--va-button-line-height), var(--va-button-border-radius));

    letter-spacing: var(--va-button-letter-spacing);
    min-height: var(--va-button-size);
    min-width: var(--va-button-size);

    .va-button__content {
      padding: var(--va-button-content-py) var(--va-button-content-px);
      line-height: var(--va-button-line-height);
    }

    &.va-button--round {
      width: var(--va-button-size);
      height: var(--va-button-size);
    }

    &.va-button--bordered {
      line-height: calc(var(--va-button-line-height) - 2 * var(--va-button-bordered-border));
    }

    .va-button__left-icon {
      margin-left: calc(var(--va-button-content-px) / -2);
      margin-right: calc(var(--va-button-space-between-items) / 2);
    }

    .va-button__right-icon {
      margin-left: calc(var(--va-button-space-between-items) / 2);
      margin-right: calc(var(--va-button-content-px) / -2);
    }
  }

  // checked
  &--plain {
    padding: 0;

    &__content {
      padding: 0;
    }
  }

  // checked
  &--round {
    .va-button__content {
      padding: 0;
      border-radius: 50%;
    }
  }

  // checked
  &--bordered {
    border-width: var(--va-button-bordered-border);
    border-style: var(--va-button-bordered-style);
  }

  // checked
  &.va-button--disabled {
    @include va-disabled;
  }

  // checked
  &--no-label {
    .va-button__left-icon,
    .va-button__right-icon {
      margin-left: 0;
      margin-right: 0;
    }
  }

  // checked
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

  // checked
  &--focused {
    @include focus-outline;

    outline-offset: -2px;
  }

  // checked
  &--loading {
    pointer-events: none;
  }

  // checked
  &--block {
    display: flex;
    min-width: 100%;
  }

  // checked
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
