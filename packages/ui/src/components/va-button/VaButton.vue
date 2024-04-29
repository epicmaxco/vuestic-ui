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
      <slot
        name="loading"
        v-bind="{
          size: props.size,
          color: textColorComputed,
        }"
      >
        <va-progress-circle
          class="va-button__loader"
          :size="props.size"
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
import pick from 'lodash/pick'

import {
  useBem,
  useFocus,
  useHover,
  useHoverStyleProps,
  usePressed,
  usePressedStyleProps,
  useColors,
  useTextColor,
  useLoadingProps,
  useSizeProps,
  useRouterLink,
  useRouterLinkProps,
  useComponentPresetProp,
  useSlotPassed,
  useNumericProp,
} from '../../composables'

import { useButtonBackground } from './hooks/useButtonBackground'
import { useButtonAttributes } from './hooks/useButtonAttributes'
import { useButtonTextColor } from './hooks/useButtonTextColor'

import { VaIcon } from '../va-icon'
import { VaProgressCircle } from '../va-progress-circle'
import { useComponentVariables } from '../../composables/useComponentVariables'
import { variables } from './const'

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
  textOpacity: { type: [Number, String], default: 1 },
  backgroundOpacity: { type: [Number, String], default: 1 },
  borderColor: { type: String, default: '' },

  // only for filled bg state
  gradient: { type: Boolean, default: false },
  plain: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | string | number>,
    default: 'medium',
  },
  icon: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  iconColor: { type: String, default: '' },
})

// colors
const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

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
const iconColorComputed = computed(() =>
  props.iconColor ? getColor(props.iconColor) : textColorComputed.value,
)
const iconAttributesComputed = computed(() => ({
  color: iconColorComputed.value,
  size: props.size,
}))

// classes
const wrapperClassComputed = computed(() => ({
  'va-button__content--loading': props.loading,
}))

const isSlotContentPassed = useSlotPassed()

const isOneIcon = computed(() => !!((props.iconRight && !props.icon) || (!props.iconRight && props.icon)))
const isOnlyIcon = computed(() => !isSlotContentPassed.value && isOneIcon.value)
const textOpacityComputed = useNumericProp('textOpacity')
const backgroundOpacityComputed = useNumericProp('backgroundOpacity')

const computedClass = useBem('va-button', () => ({
  ...pick(props, ['disabled', 'block', 'loading', 'round', 'plain']),
  opacity: textOpacityComputed.value! < 1,
  bordered: !!props.borderColor,
  iconOnly: isOnlyIcon.value,
  leftIcon: !isOnlyIcon.value && !!props.icon && !props.iconRight,
  rightIcon: !isOnlyIcon.value && !props.icon && !!props.iconRight,
}))

// styles
const isTransparentBg = computed(() => props.plain || backgroundOpacityComputed.value! < 0.5)
const { textColorComputed } = useTextColor(colorComputed, isTransparentBg)

const {
  backgroundColor,
  backgroundColorOpacity,
  backgroundMaskOpacity,
  backgroundMaskColor,
} = useButtonBackground(colorComputed, isPressed, isHovered)
const contentColorComputed = useButtonTextColor(
  textColorComputed,
  colorComputed,
  isPressed,
  isHovered,
)

const variablesComputed = useComponentVariables(variables, props)

const computedStyle = computed(() => ({
  borderColor: props.borderColor ? getColor(props.borderColor) : 'transparent',
  ...contentColorComputed.value,
  ...variablesComputed.value,
}))

defineExpose({
  focus,
  blur,
})
</script>

<style lang="scss">
@import "variables";
@import "../../styles/resources";

.va-button {
  position: relative;
  padding: var(--va-button-padding-current);
  display: var(--va-button-display-current);
  justify-content: var(--va-button-justify-content-current);
  align-items: var(--va-button-align-items-current);
  border-width: var(--va-button-border-width-current);
  border-color: var(--va-button-border-color-current);
  border-style: var(--va-button-border-style-current);
  background-image: var(--va-button-background-image-current);
  box-shadow: var(--va-button-box-shadow-current);
  font-family: var(--va-font-family);
  font-weight: var(--va-button-font-weight-current);
  text-decoration: none;
  text-transform: initial;
  transition: var(--va-button-transition-current);
  box-sizing: border-box;
  cursor: var(--va-button-cursor-current);
  z-index: 0;
  vertical-align: top;

  --va-progress-circle-small-size: 16px;
  --va-progress-circle-size: 24px;
  --va-progress-circle-large-size: 32px;

  &::after,
  &::before {
    content: "";
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

  line-height: var(--va-button-line-height-current);
  border-radius: var(--va-button-border-radius-current);
  letter-spacing: var(--va-button-letter-spacing-current);
  min-height: var(--va-button-size-current);
  min-width: var(--va-button-size-current);

  .va-button__content {
    font-size: var(--va-button-font-size-current);
    padding:
      var(--va-button-content-py-current)
      var(--va-button-content-px-current);
    line-height: var(--va-button-line-height-current);
  }

  // set icons the same size as text
  .va-button__left-icon,
  .va-button__right-icon {
    // font-size: var(--va-button-line-height-current) !important;
    // height: var(--va-button-line-height-current) !important;
    // line-height: var(--va-button-line-height-current) !important;
  }

  .va-button__left-icon {
    margin-right: var(--va-button-icons-spacing-current);
  }

  .va-button__right-icon {
    margin-left: var(--va-button-icons-spacing-current);
  }

  &--bordered {
    border-width: var(--va-button-bordered-border-current);
    border-style: var(--va-button-bordered-style-current);

    .va-button__content {
      padding-top:
        calc(
          var(--va-button-content-py-current) -
          var(--va-button-bordered-border-current)
        );
      padding-bottom:
        calc(
          var(--va-button-content-py-current) -
          var(--va-button-bordered-border-current)
        );
    }
  }

  &--left-icon {
    .va-button__content {
      padding-left: var(--va-button-icon-side-padding-current);
    }
  }

  &--right-icon {
    .va-button__content {
      padding-right: var(--va-button-icon-side-padding-current);
    }
  }

  .va-button--icon-only {
    .va-button__content {
      padding-right: 0;
      padding-left: 0;
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

  &--disabled {
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
