<template>
  <component
    v-if="valueComputed"
    class="va-chip"
    :is="tagComputed"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="computedClass"
    :style="computedStyle"
  >
    <span
      class="va-chip__inner"
      @focus="$emit('focus')"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      v-on="keyboardFocusListeners"
    >
      <va-icon
        v-if="icon"
        class="va-chip__icon"
        :name="icon"
        :size="iconSize"
      />
      <span class="va-chip__content">
        <slot></slot>
      </span>
      <va-icon
        v-if="closeable"
        role="button"
        name="va-close"
        class="va-chip__close-icon"
        :aria-label="tp($props.ariaCloseLabel)"
        :tabindex="tabIndexComputed"
        :size="iconSize"
        @click.stop="close"
        @keydown.enter.stop="close"
        @keydown.space.stop="close"
      />
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef } from 'vue'
import pick from 'lodash/pick'

import { getBoxShadowColor, getHoverColor, getFocusColor } from '../../services/color'
import {
  useComponentPresetProp,
  useKeyboardOnlyFocus,
  useRouterLink, useRouterLinkProps,
  useColors, useColorProps,
  useStateful, useStatefulEmits, useStatefulProps,
  useHover,
  useTextColor,
  useBem,
  useTranslation,
} from '../../composables'

import { VaIcon } from '../va-icon'

export default defineComponent({
  name: 'VaChip',

  components: { VaIcon },

  emits: [...useStatefulEmits, 'focus'],

  props: {
    ...useRouterLinkProps,
    ...useColorProps,
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Boolean, default: true },
    closeable: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    tag: { type: String, default: 'span' },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value),
    },

    ariaCloseLabel: { type: String, default: '$t:close' },
  },

  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const borderColor = computed(() => props.outline ? colorComputed.value : '')
    const isTransparentBackground = computed(() => Boolean(props.outline || props.flat))
    const { textColorComputed } = useTextColor(colorComputed, isTransparentBackground)
    const size = {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
    } as Record<string, string>

    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const shadowStyle = computed(() => {
      if (!props.shadow || props.flat || props.outline || props.disabled || hasKeyboardFocus.value) {
        return
      }
      return `0 0.125rem 0.19rem 0 ${getBoxShadowColor(colorComputed.value)}`
    })

    const { valueComputed } = useStateful(props, emit)
    const { tagComputed, hrefComputed } = useRouterLink(props)
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()

    return {
      ...useTranslation(),
      keyboardFocusListeners,
      valueComputed,
      hrefComputed,
      tagComputed,
      onMouseEnter,
      onMouseLeave,
      isHovered,

      close: () => {
        if (!props.disabled) {
          valueComputed.value = false
        }
      },

      iconSize: computed(() => size[props.size]),

      tabIndexComputed: computed(() => props.disabled ? -1 : 0),

      computedClass: useBem('va-chip', () => ({
        ...pick(props, ['disabled', 'readonly', 'square']),
        small: props.size === 'small',
        large: props.size === 'large',
      })),

      computedStyle: computed(() => {
        const result = {
          color: textColorComputed.value,
          borderColor: borderColor.value,
          background: '',
          boxShadow: shadowStyle.value,
        }

        if (props.outline || props.flat) {
          if (hasKeyboardFocus.value) {
            result.background = getFocusColor(colorComputed.value)
          } else if (!props.readonly && isHovered.value) {
            result.background = getHoverColor(colorComputed.value)
          }
        } else {
          result.background = colorComputed.value
        }

        return result
      }),
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-chip {
  display: var(--va-chip-display);
  border: var(--va-chip-border, var(--va-control-border));
  position: var(--va-chip-position);
  border-radius: var(--va-chip-border-radius);
  width: var(--va-chip-width);
  height: var(--va-chip-height);
  min-width: var(--va-chip-min-width);
  min-height: var(--va-chip-min-height);
  padding: var(--va-chip-padding);
  color: var(--va-chip-color);
  cursor: var(--va-chip-cursor);
  font-size: var(--va-chip-font-size);
  font-family: var(--va-font-family);
  vertical-align: var(--va-chip-vertical-align);

  &__inner {
    display: var(--va-chip-inner-display);
    align-items: var(--va-chip-inner-align-items);
    width: var(--va-chip-inner-width);
    vertical-align: inherit;
  }

  &:hover:not(&--readonly) {
    opacity: var(--va-chip-hover-opacity);
  }

  &__content {
    display: var(--va-chip-content-display);
    justify-content: var(--va-chip-content-justify-content);
    align-items: var(--va-chip-content-align-items);
    padding: var(--va-chip-content-padding);
    line-height: var(--va-chip-content-line-height);
    width: var(--va-chip-content-width);
  }

  &__close-icon {
    cursor: pointer;

    @at-root {
      .va-chip--disabled {
        .va-chip__close-icon {
          cursor: default !important;
        }
      }
    }
  }

  &--square {
    border-radius: var(--va-chip-square-border-radius, var(--va-square-border-radius));
  }

  &--small {
    height: var(--va-chip-sm-height);
    font-size: var(--va-chip-sm-font-size);
  }

  &--large {
    height: var(--va-chip-lg-height);
    font-size: var(--va-chip-lg-font-size);
  }

  &.va-chip--disabled {
    @include va-disabled;
  }
}
</style>
