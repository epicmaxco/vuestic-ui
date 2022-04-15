<template>
  <component
    :is="tagComputed"
    class="va-button"
    :class="computedClass"
    :style="computedStyle"
    :disabled="$props.disabled"
    :type="computedType"
    :href="hrefComputed"
    :target="$props.target"
    :to="$props.to"
    :replace="$props.replace"
    :append="$props.append"
    :active-class="$props.activeClass"
    :exact="$props.exact"
    :exact-active-class="$props.exactActiveClass"
    @focus="focusState = true"
    @blur="focusState = false"
    :tabindex="loading ? -1 : 0"
    @mouseenter="hoverState = true"
    @mouseleave="hoverState = false"
    v-on="$attrs"
    ref="button"
  >
    <div class="va-button__content" :class="{ 'va-button__content--loading': loading }">
      <va-icon
        v-if="icon"
        :name="icon"
        :size="size"
        :color="textColorComputed"
        class="va-button__left-icon"
      />
      <slot />
      <va-icon
        v-if="iconRight"
        :name="iconRight"
        :size="size"
        :color="textColorComputed"
        class="va-button__right-icon"
      />
    </div>
    <va-progress-circle
      v-if="loading"
      class="va-button__loader"
      indeterminate
      :size="loaderSize"
      :color="computedStyle.color"
      :thickness="0.15"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType, ComputedRef } from 'vue'

import { getGradientBackground, shiftHSLAColor } from '../../services/color-config/color-functions'
import { useColor } from '../../composables/useColor'
import { useRouterLink, useRouterLinkProps } from '../../composables/useRouterLink'
import { useSizeProps, useSize } from '../../composables/useSize'
import { useLoadingProps } from '../../composables/useLoading'
import VaIcon from '../va-icon'
import { VaProgressCircle } from '../va-progress-circle'

export default defineComponent({
  name: 'VaButton',
  components: { VaIcon, VaProgressCircle },
  props: {
    ...useSizeProps,
    ...useLoadingProps,
    ...useRouterLinkProps,
    color: { type: String as PropType<string | undefined>, default: undefined },
    textColor: { type: String as PropType<string | undefined>, default: undefined },
    tag: { type: String as PropType<string>, default: 'button' },
    outline: { type: Boolean as PropType<boolean | undefined>, default: undefined },
    gradient: { type: Boolean as PropType<boolean | undefined>, default: undefined },
    flat: { type: Boolean as PropType<boolean | undefined>, default: undefined },
    type: { type: String as PropType<string>, default: 'button' },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    block: { type: Boolean as PropType<boolean>, default: false },
    rounded: { type: Boolean as PropType<boolean>, default: true },
    round: { type: Boolean as PropType<boolean | undefined>, default: undefined },
    spaceBetweenItems: { type: Boolean as PropType<boolean | undefined>, default: undefined },
    icon: { type: String as PropType<string | undefined>, default: undefined },
    iconRight: { type: String as PropType<string | undefined>, default: undefined },
    size: {
      type: String as PropType<string>,
      default: 'medium',
      validator: (value: string) => ['medium', 'small', 'large'].includes(value),
    },
  },
  setup (props, { slots }) {
    const { sizeComputed } = useSize(props)
    const { computeColor } = useColor(props)
    const { tagComputed, hrefComputed } = useRouterLink(props)

    const hoverState = ref(false)
    const focusState = ref(false)

    const colorComputed = computed(() => computeColor(props.color, 'primary'))
    const isTransparentBackground = computed(() => props.outline || props.flat)

    const computedType = computed(() => {
      // Safari issue. type===button will break styles if the button is used as a link
      switch (tagComputed.value) {
        case 'a':
        case 'router-link':
        case 'nuxt-link':
          return undefined
        default:
          return props.type
      }
    })

    const textColorComputed = computed(() => {
      if (props.textColor !== undefined) {
        return computeColor(props.textColor, 'var(--va-white)')
      }

      if (isTransparentBackground.value) {
        return computeColor(colorComputed.value, 'var(--va-white)')
      }

      return computeColor(props.textColor, 'var(--va-white)')
    })

    const hasOneIcon = computed(() => {
      return Boolean((props.iconRight && !props.icon) || (!props.iconRight && props.icon))
    })

    const computedClass = computed(() => ({
      'va-button--default': !props.flat && !props.outline && !props.disabled,
      'va-button--flat': props.flat,
      'va-button--outline': props.outline,
      'va-button--disabled': props.disabled,
      'va-button--hover': hoverState.value,
      'va-button--focus': focusState.value,
      'va-button--large': props.size === 'large',
      'va-button--small': props.size === 'small',
      'va-button--normal': !props.size || props.size === 'medium',
      'va-button--loading': props.loading,
      'va-button--block': props.block,
      'va-button--square': !props.rounded,
      'va-button--round': props.round || (!slots.default && hasOneIcon.value),
      'va-button--space-between-items': props.spaceBetweenItems,
    }))

    const loaderSize = computed(() => {
      const size = /([0-9]*)(px)/.exec(sizeComputed.value) as null | [string, string, string]

      return size ? `${+size[1] / 2}${size[2]}` : sizeComputed.value
    })

    const computedStyle: ComputedRef<Partial<CSSStyleDeclaration>> = computed(() => {
      const borderColor = props.outline ? colorComputed.value : ''

      let background = props.gradient
        ? getGradientBackground(colorComputed.value)
        : colorComputed.value

      if (isTransparentBackground.value) {
        background = 'var(--va-transparent)'
      }

      if (hoverState.value) {
        const alpha = props.outline ? -0.9 : -0.8
        const lightness = 5
        const color = isTransparentBackground.value
          ? shiftHSLAColor(colorComputed.value, { a: alpha })
          : shiftHSLAColor(colorComputed.value, { l: lightness })

        background = props.gradient ? getGradientBackground(color) : color
      }

      if (focusState.value) {
        const alpha = props.outline ? -0.8 : -0.7
        const lightness = 10
        const color = isTransparentBackground.value ? shiftHSLAColor(colorComputed.value, { a: alpha }) : shiftHSLAColor(colorComputed.value, { l: lightness })

        background = props.gradient ? getGradientBackground(color) : color
      }

      return {
        color: textColorComputed.value,
        borderColor,
        background,
      }
    })

    const button: Ref<HTMLElement | null> = ref(null)
    const focus = () => button.value?.focus()
    const blur = () => button.value?.blur()

    return {
      button,
      tagComputed,
      hrefComputed,
      computedClass,
      computedStyle,
      computedType,
      textColorComputed,
      loaderSize,
      focusState,
      hoverState,
    }
  },

  // we will use this while we have 'withConfigTransport' and problem with 'expose' method in 'setup' func
  methods: {
    focus () { (this as any).button?.focus() },
    blur () { (this as any).button?.blur() },
  },
})
</script>

<style lang='scss'>
@import '../../styles/resources';
@import 'variables';

.va-button {
  display: var(--va-button-display);
  align-items: var(--va-button-align-items);
  justify-content: var(--va-button-justify-content);
  background-image: var(--va-button-background-image);
  box-shadow: var(--va-button-box-shadow, var(--va-control-box-shadow));
  outline: var(--va-button-outline);
  border: var(--va-button-border, var(--va-control-border));
  font-family: var(--va-font-family);
  text-decoration: none !important;
  text-transform: initial;
  cursor: pointer;
  transition: var(--va-button-transition, var(--va-swing-transition));
  background-color: var(--va-button-background-color, var(--va-white));
  vertical-align: middle;
  box-sizing: border-box;
  font-weight: var(--va-button-font-weight);
  margin: var(--va-button-margin);
  padding: var(--va-button-padding);
  position: relative;

  &__content {
    display: flex;
    align-items: center;
    height: 100%;

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

  &--default {
    color: var(--va-button-background-color, var(--va-white));

    i {
      color: var(--va-button-icon-color, var(--va-white));
    }
  }

  &--outline {
    background-color: transparent;
    border: solid var(--va-button-outline-border, var(--va-outline-border-width));
    text-decoration: none;

    .va-button__content {
      margin: calc(var(--va-button-outline-border, var(--va-outline-border-width)) * -1);
    }

    &.va-button--disabled {
      background: transparent;

      @include va-disabled;

      &.va-button--active {
        .va-button__content,
        i {
          color: var(--va-button-outline-icon-color, var(--va-white)) !important;
        }
      }
    }
  }

  &--flat {
    background: transparent;
    border: var(--va-button-flat-border, var(--va-control-border)) solid transparent;
    text-decoration: none;
  }

  &.va-button--disabled {
    @include va-disabled;
  }

  &--large {
    @include va-button(var(--va-button-lg-content-py), var(--va-button-lg-content-px), var(--va-button-lg-font-size), var(--va-button-lg-line-height), var(--va-button-lg-border-radius));

    letter-spacing: var(--va-button-lg-letter-spacing);
    min-height: var(--va-button-lg-size);
    min-width: var(--va-button-lg-size);

    .va-button__content {
      padding: var(--va-button-lg-content-py) var(--va-button-lg-content-px);
    }

    &.va-button--round {
      width: var(--va-button-lg-size);
      height: var(--va-button-lg-size);
    }

    &.va-button--outline {
      line-height: calc(var(--va-button-lg-line-height) - 2 * var(--va-button-outline-border, var(--va-outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-lg-square-border-radius);
    }

    .va-button__left-icon {
      margin-left: calc(var(--va-button-lg-content-px) / -2);
      margin-right: calc(var(--va-button-lg-space-between-items) / 2);
    }

    .va-button__right-icon {
      margin-left: calc(var(--va-button-lg-space-between-items) / 2);
      margin-right: calc(var(--va-button-lg-content-px) / -2);
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

    &.va-button--round {
      width: var(--va-button-sm-size);
      height: var(--va-button-sm-size);
    }

    &.va-button--outline {
      line-height: calc(var(--va-button-sm-line-height) - 2 * var(--va-button-outline-border, var(--va-outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-sm-square-border-radius);
    }

    .va-button__left-icon {
      margin-left: calc(var(--va-button-sm-content-px) / -2);
      margin-right: calc(var(--va-button-sm-space-between-items) / 2);
    }

    .va-button__right-icon {
      margin-left: calc(var(--va-button-sm-space-between-items) / 2);
      margin-right: calc(var(--va-button-sm-content-px) / -2);
    }
  }

  &--normal {
    @include va-button(var(--va-button-content-py), var(--va-button-content-px), var(--va-button-font-size), var(--va-button-line-height), var(--va-button-border-radius));

    letter-spacing: var(--va-button-letter-spacing, var(--va-letter-spacing));
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

    &.va-button--outline {
      line-height: calc(var(--va-button-line-height) - 2 * var(--va-button-outline-border, var(--va-outline-border-width)));
    }

    &.va-button--square {
      border-radius: var(--va-button-square-border-radius);
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

  &--round {
    .va-button__content {
      padding: 0;
    }

    .va-button__left-icon {
      margin-left: 0;
      margin-right: 0;
    }

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

  &--loading {
    pointer-events: none;
  }

  &--block {
    display: flex;
    min-width: 100%;
  }

  &--square {
    border-radius: 0.5rem;
  }

  &__loader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
