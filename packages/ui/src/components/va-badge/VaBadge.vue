<template>
  <div
    class="va-badge"
    :class="badgeClass"
  >
    <span
      class="va-badge__text-wrapper"
      :style="badgeStyle"
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

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaBadge',
  props: {
    color: { type: String as PropType<string>, default: 'danger' },
    textColor: { type: String as PropType<string>, default: 'white' },
    text: { type: [String, Number] as PropType<string | number>, default: '' },
    overlap: { type: Boolean as PropType<boolean>, default: false },
    multiLine: { type: Boolean as PropType<boolean>, default: false },
    visibleEmpty: { type: Boolean as PropType<boolean>, default: false },
    dot: { type: Boolean as PropType<boolean>, default: false },
    transparent: { type: Boolean as PropType<boolean>, default: false },
    left: { type: Boolean as PropType<boolean>, default: false },
    bottom: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props, { slots }) {
    const isEmpty = computed(() => !(props.text || props.visibleEmpty || props.dot || slots.text))

    const isFloating = computed(() => slots.default || props.dot)

    const badgeClass = computed(() => ({
      'va-badge--visible-empty': props.visibleEmpty,
      'va-badge--empty': isEmpty.value,
      'va-badge--dot': props.dot,
      'va-badge--multiLine': props.multiLine,
      'va-badge--floating': isFloating.value,
      'va-badge--left': props.left,
      'va-badge--bottom': props.bottom,
      'va-badge--overlap': props.overlap,
    }))

    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const badgeStyle = computed(() => ({
      color: getColor(props.textColor, 'white'),
      borderColor: colorComputed.value,
      backgroundColor: colorComputed.value,
      opacity: props.transparent ? 0.5 : 1,
    }))

    return { badgeClass, badgeStyle }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-badge {
  display: inline-flex;
  position: relative;
  font-family: var(--va-font-family);

  &__text-wrapper {
    transition: var(--va-badge-text-wrapper-transition, var(--va-transition));
    display: var(--va-badge-text-wrapper-display);
    border: var(--va-badge-text-wrapper-border, var(--va-control-border));
    border-radius: var(--va-badge-text-wrapper-border-radius);
    font-weight: var(--va-badge-text-wrapper-font-weight);
    line-height: var(--va-badge-text-wrapper-line-height);
    letter-spacing: var(--va-badge-text-wrapper-letter-spacing, var(--va-letter-spacing));
    justify-content: var(--va-badge-text-wrapper-justify-content);
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

    .va-badge--multiLine & {
      white-space: normal;
    }

    .va-badge--floating & {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 100%;
      transform: translateX(0) translateY(-50%);
    }

    .va-badge--overlap & {
      margin-left: calc(-1 * var(--va-badge-overlap));
      margin-right: 0;
      transform: translateY(-25%);
    }

    .va-badge--left & {
      left: 0;
      transform: translateX(-100%) translateY(-50%);
    }

    .va-badge--left.va-badge--overlap & {
      margin-left: var(--va-badge-overlap);
      transform: translateX(-100%) translateY(-25%);
    }

    .va-badge--bottom & {
      top: 100%;
      transform: translateX(0) translateY(-50%);
    }

    .va-badge--left.va-badge--bottom & {
      transform: translateX(-100%) translateY(-50%);
    }

    .va-badge--bottom.va-badge--overlap & {
      margin-left: calc(-1 * var(--va-badge-overlap));
      transform: translateX(0) translateY(-75%);
    }

    .va-badge--bottom.va-badge--left.va-badge--overlap & {
      margin-left: var(--va-badge-overlap);
      transform: translateX(-100%) translateY(-75%);
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

    .va-badge--multiLine & {
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
