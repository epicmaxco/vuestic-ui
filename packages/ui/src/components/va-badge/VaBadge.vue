<template>
  <div
    class="va-badge"
    role="status"
    :aria-labelledby="ariaLabelledByComputed"
    :class="badgeClass"
  >
    <span
      class="va-badge__text-wrapper"
      :style="stylesComputed"
    >
      <span class="va-badge__text">
        <slot name="text">
          {{ text }}
        </slot>
      </span>
    </span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, unref, useSlots, PropType } from 'vue'

import {
  useBem,
  useColors,
  useElementTextColor,
  useDeprecated,
  useComponentPresetProp,
  ColorName,
} from '../../composables'

import { useFloatingPosition, useFloatingPositionProps } from './hooks/useFloatingPositionStyles'
import { pick } from '../../utils/pick'
import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { VaBadge } from '.'

defineOptions({
  name: 'VaBadge',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...useFloatingPositionProps,

  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'danger' },
  textColor: { type: String },
  text: { type: [String, Number], default: '' },
  multiLine: { type: Boolean, default: false },
  visibleEmpty: { type: Boolean, default: false },
  dot: { type: Boolean, default: false },
    // TODO: Remove after 1.8.0
  transparent: { type: Boolean, default: false },
})

// TODO: Remove after 1.8.0
useDeprecated(['transparent'])

const slots = useSlots()

const isEmpty = computed(() => !(props.text || props.visibleEmpty || props.dot || slots.text))

const isFloating = computed(() => !!(slots.default || props.dot))

const badgeClass = useBem('va-badge', () => ({
  ...pick(props, ['visibleEmpty', 'dot', 'multiLine']),
  empty: isEmpty.value,
  floating: isFloating.value,
}))

const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))
const textColorComputed = useElementTextColor(colorComputed)

const positionStylesComputed = useFloatingPosition(props, isFloating)

const stylesComputed = computed(() => ({
  color: textColorComputed.value,
  borderColor: colorComputed.value,
  backgroundColor: colorComputed.value,
  opacity: props.transparent ? 0.5 : 1,
  ...unref(positionStylesComputed),
}))

const ariaLabelledByComputed = computed(() => props.text ? String(props.text) : undefined)
</script>

<style lang="scss">
@import "variables";

.va-badge {
  display: inline-flex;
  position: relative;
  font-family: var(--va-font-family);
  width: var(--va-badge-width);

  &__text-wrapper {
    transition: var(--va-badge-text-wrapper-transition, var(--va-transition));
    display: var(--va-badge-text-wrapper-display);
    border: var(--va-badge-text-wrapper-border, var(--va-control-border));
    border-radius: var(--va-badge-text-wrapper-border-radius);
    font-weight: var(--va-badge-text-wrapper-font-weight);
    line-height: var(--va-badge-text-wrapper-line-height);
    letter-spacing: var(--va-badge-text-wrapper-letter-spacing, var(--va-letter-spacing));
    justify-content: var(--va-badge-text-wrapper-justify-content);
    align-items: center;
    white-space: var(--va-badge-text-wrapper-white-space);
    width: var(--va-badge-text-wrapper-width);
    height: var(--va-badge-text-wrapper-height);
    min-width: var(--va-badge-text-wrapper-min-width);
    min-height: var(--va-badge-text-wrapper-min-height);
    margin: var(--va-badge-text-wrapper-margin);

    .va-badge--visible-empty & {
      min-width: var(--va-badge-size);
      min-height: var(--va-badge-size);
    }

    .va-badge--dot & {
      min-width: var(--va-badge-dot-size);
      min-height: var(--va-badge-dot-size);
      border-width: 0;
      border-radius: 100%;
      padding: 0;
    }

    .va-badge--empty & {
      width: 0;
      height: 0;
      min-width: 0;
      min-height: 0;
      border-width: 0;
    }

    .va-badge--multi-line & {
      white-space: normal;
    }

    .va-badge--floating & {
      position: absolute;
      z-index: 2;
    }
  }

  &__text {
    margin: var(--va-badge-margin);
    text-transform: var(--va-badge-text-transform);
    overflow: hidden;
    min-width: calc(var(--va-badge-font-size) * var(--va-badge-line-height));
    padding: var(--va-badge-text-py) var(--va-badge-text-px);
    text-align: center;
    display: inline-flex;
    justify-content: center;
    text-overflow: clip;
    white-space: nowrap;
    font-size: var(--va-badge-font-size);

    .va-badge--multi-line & {
      overflow: auto;
      max-height: initial;
      text-align: initial;
      text-overflow: initial;
      white-space: normal;
    }

    .va-badge--dot & {
      display: none;
    }

    .va-badge--floating & {
      align-items: center;
      padding: var(--va-badge-py) 0.15rem;
    }
  }
}
</style>
