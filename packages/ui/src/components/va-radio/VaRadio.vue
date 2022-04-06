<template>
  <label
    class="va-radio"
    :class="computedClass"
  >
    <input
      class="va-radio__input"
      type="radio"
      :checked="isActive"
      :disabled="disabled"
      :name="name"
      @change="onClick"
      @focus="onFocus"
      :tabindex="tabindex"
    >

    <span
      class="va-radio__icon"
      :style="iconComputedStyles"
    >
      <span
        class="va-radio__icon__background"
        :style="iconBackgroundComputedStyles"
      />
      <span
        class="va-radio__icon__dot"
        :style="iconDotComputedStyles"
      />
    </span>

    <span class="va-radio__text">
      <slot>
        {{ computedLabel }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaRadio',
  emits: ['update:modelValue', 'focus'],
  props: {
    modelValue: { type: null as any as PropType<unknown>, default: null },
    option: { type: null as any as PropType<unknown>, default: null },
    name: { type: String as PropType<string>, default: '' },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    label: { type: String as PropType<string>, default: '' },
    leftLabel: { type: Boolean as PropType<boolean>, default: false },
    color: { type: String as PropType<string>, default: 'primary' },
    tabindex: { type: Number as PropType<number>, default: 0 },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()

    const isActive = computed(() => props.modelValue === props.option)

    const computedClass = computed(() => ({
      'va-radio--disabled': props.disabled,
      'va-radio--left-label': props.leftLabel,
    }))

    const iconBackgroundComputedStyles = computed(() => ({
      backgroundColor: getColor(props.color),
    }))

    const iconDotComputedStyles = computed(() => {
      if (!isActive.value) { return }

      return {
        borderColor: getColor(props.color),
        backgroundColor: getColor(props.color),
      }
    })

    const iconComputedStyles = computed(() => {
      if (!isActive.value) { return }

      return { borderColor: getColor(props.color) }
    })

    const computedLabel = computed(() => props.label || props.option)

    const onClick = (e: Event) => emit('update:modelValue', props.option, e)

    const onFocus = (e: Event) => emit('focus', e)

    return {
      computedClass,
      isActive,
      iconBackgroundComputedStyles,
      iconDotComputedStyles,
      iconComputedStyles,
      computedLabel,
      onClick,
      onFocus,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-radio {
  display: var(--va-radio-display);
  flex-direction: var(--va-radio-flex-direction);
  align-items: var(--va-radio-align-items);
  cursor: var(--va-radio-cursor);
  position: var(--va-radio-position);
  margin-top: var(--va-radio-margin-top);
  margin-right: var(--va-radio-margin-right);
  transition: var(--va-radio-transition, var(--va-swing-transition));
  font-family: var(--va-font-family);

  & + & {
    margin-top: 0.5rem;
  }

  &--disabled {
    cursor: var(--va-radio-disabled-cursor);
  }

  &--left-label {
    flex-direction: row-reverse;
    display: inline-flex;

    & + & {
      margin-top: 0;
    }
  }

  &__input {
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -1;
  }

  &__icon {
    transition: var(--va-radio-icon-transition);
    display: var(--va-radio-icon-display);
    align-items: var(--va-radio-icon-align-items);
    width: var(--va-radio-icon-width);
    height: var(--va-radio-icon-height);
    border-radius: var(--va-radio-icon-border-radius);
    position: var(--va-radio-icon-position);
    border: var(--va-radio-icon-border);
    box-sizing: var(--va-radio-icon-box-sizing);

    .va-radio__input:disabled + & {
      @include va-disabled;
    }

    &__dot {
      transition: var(--va-radio-dot-transition, var(--va-swing-transition));
      position: var(--va-radio-dot-position);
      top: var(--va-radio-dot-top);
      left: var(--va-radio-dot-left);
      right: var(--va-radio-dot-right);
      bottom: var(--va-radio-dot-bottom);
      border-radius: var(--va-radio-dot-border-radius);
      background-color: var(--va-radio-dot-background-color);
      opacity: var(--va-radio-dot-opacity);

      .va-radio__input:checked + .va-radio__icon & {
        opacity: 1;
        top: 0.25rem;
        left: 0.25rem;
        right: 0.25rem;
        bottom: 0.25rem;
      }
    }

    &__background {
      transition:
        var(
          --va-radio-background-transition,
          var(--va-swing-transition)
        );
      position: var(--va-radio-background-position);
      top: var(--va-radio-background-top);
      left: var(--va-radio-background-left);
      right: var(--va-radio-background-right);
      bottom: var(--va-radio-background-bottom);
      background-color: var(--va-radio-background-background-color);
      border-radius: var(--va-radio-background-border-radius);
      z-index: var(--va-radio-background-z-index);
      opacity: var(--va-radio-background-opacity);

      .va-radio__input:focus + .va-radio__icon & {
        opacity: 0.2;
      }

      .va-radio:hover & {
        opacity: 0.2;
      }

      .va-radio--disabled:hover & {
        opacity: 0;
      }
    }
  }

  &__text {
    display: var(--va-radio-text-display);
    margin-left: var(--va-radio-text-margin-left);
    margin-right: var(--va-radio-text-margin-right);

    .va-radio--disabled & {
      @include va-disabled;
    }

    .va-radio--left-label & {
      margin-left: 0;
      margin-right: 0.5rem;
    }
  }
}
</style>
