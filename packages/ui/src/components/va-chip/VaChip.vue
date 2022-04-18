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
      v-on="keyboardFocusListeners"
      @focus="$emit('focus')"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      :tabindex="indexComputed"
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
        class="va-chip__close-icon"
        name="close"
        :size="iconSize"
        @click.stop="close"
      />
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import {
  getBoxShadowColor,
  getHoverColor,
  getFocusColor,
  getTextColor,
} from '../../services/color-config/color-functions'
import { useRouterLink, useRouterLinkProps } from '../../composables/useRouterLink'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'
import { useColors, useColorProps } from '../../composables/useColor'
import { useStateful, useStatefulEmits, useStatefulProps } from '../../composables/useStateful'
import { useHover } from '../../composables/useHover'
import VaIcon from '../va-icon'

export default defineComponent({
  name: 'VaChip',

  components: { VaIcon },

  emits: [...useStatefulEmits, 'focus'],

  props: {
    ...useRouterLinkProps,
    ...useColorProps,
    ...useStatefulProps,
    modelValue: { type: Boolean, default: true },
    closeable: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
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
  },

  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const borderColor = computed(() => props.outline ? colorComputed.value : '')

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

      indexComputed: computed(() => props.disabled ? -1 : 0),

      computedClass: computed(() => ({
        'va-chip--small': props.size === 'small',
        'va-chip--large': props.size === 'large',
        'va-chip--square': props.square,
        'va-chip--disabled': props.disabled,
      })),

      computedStyle: computed(() => {
        const result = {
          color: colorComputed.value,
          borderColor: borderColor.value,
          background: '',
          boxShadow: shadowStyle.value,
        }

        if (props.outline || props.flat) {
          if (hasKeyboardFocus.value) {
            result.background = getFocusColor(colorComputed.value)
          } else if (isHovered.value) {
            result.background = getHoverColor(colorComputed.value)
          }
        } else {
          result.color = getTextColor(colorComputed.value)
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

  &:hover {
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
    height: var(--va-sm-chip-height);
    font-size: var(--va-sm-chip-font-size);
  }

  &--large {
    height: var(--va-lg-chip-height);
    font-size: var(--va-lg-chip-font-size);
  }

  &.va-chip--disabled {
    @include va-disabled;
  }
}
</style>
