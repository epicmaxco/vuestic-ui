<template>
  <VaMessageListWrapper
    :class="computedClass"
    :disabled="disabled"
    :success="success"
    :messages="messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    @blur="onBlur"
    ref="container"
  >
    <label
      v-for="(option, index) in options"
      :key="index"
      class="va-radio va-radio__square"
    >
      <input
        ref="input"
        class="va-radio__input"
        type="radio"
        :value="$props.modelValue"
        v-bind="inputAttributesComputed"
        :checked="$props.modelValue === option.value"
        :aria-checked="$props.modelValue === option.value"
        @change="selectOption(option.value)"
        @focus="onFocus"
        @blur="onBlur"
      />

      <span
        aria-hidden="true"
        class="va-radio__icon"
      >
        <span
          class="va-radio__icon__background"
        />
        <span class="va-radio__icon__dot" />
      </span>

      <span ref="label" class="va-radio__text">
        <slot>
          {{ option.label || option.value }}
        </slot>
      </span>
    </label>
  </VaMessageListWrapper>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, shallowRef } from 'vue'

import { generateUniqueId } from '../../utils/uuid'
import {
  useComponentPresetProp,
  useColors,
  useSelectable,
  Elements,
  useSelectableProps,
  useSelectableEmits,
} from '../../composables'
import { VaMessageListWrapper } from '../va-input'
import type { VaRadioOption } from './types'

export default defineComponent({
  name: 'VaRadio',
  components: { VaMessageListWrapper },
  emits: useSelectableEmits,
  props: {
    ...useSelectableProps,
    ...useComponentPresetProp,
    modelValue: {
      type: [Boolean, Array, String, Object, Number] as PropType<
        VaRadioOption['value']
      >,
      default: null,
    },
    options: {
      type: Array<VaRadioOption>,
      default: () => [],
    },
    name: { type: String, default: '' },
    leftLabel: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    ariaLabel: { type: String, default: undefined },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()
    const elements: Elements = {
      container: shallowRef<HTMLElement>(),
      input: shallowRef<HTMLElement>(),
      label: shallowRef<HTMLElement>(),
    }

    const {
      isChecked,
      computedError,
      computedErrorMessages,
      validationAriaAttributes,
      onBlur,
      onFocus,
    } = useSelectable(props, emit, elements)

    const computedClass = computed(() => ({
      'va-radio--left-label': props.leftLabel,
      'va-radio--selected': isChecked.value,
      'va-radio--readonly': props.readonly,
      'va-radio--disabled': props.disabled,
      'va-radio--indeterminate': props.indeterminate,
      'va-radio--error': computedError.value,
    }))

    const selectOption = (option: VaRadioOption['value']) => {
      emit('update:modelValue', option)
    }

    const labelStyle = computed(() => {
      return {
        color: computedError.value ? getColor('danger') : '',
      }
    })

    const inputStyle = computed(() => {
      const style = {
        background: getColor(props.color),
        borderColor: getColor(props.color),
      }

      if (computedError.value) {
        style.borderColor = getColor('danger')
      }

      return style
    })

    const iconBackgroundComputedStyles = computed(() => ({
      backgroundColor: getColor(props.color),
    }))

    const iconDotComputedStyles = computed(() => {
      return {
        borderColor: computedError.value ? getColor('danger') : getColor(props.color),
        backgroundColor: getColor(props.color),
      }
    })

    const iconComputedStyles = computed(() => {
      return { borderColor: computedError.value ? getColor('danger') : getColor(props.color) }
    })

    const computedName = computed(() => props.name || generateUniqueId())
    const inputAttributesComputed = computed(() => ({
      name: computedName.value,
      disabled: props.disabled,
      readonly: props.readonly,
      tabindex: props.disabled ? -1 : 0,
      'aria-label': props.ariaLabel,
      'aria-disabled': props.disabled,
      'aria-readOnly': props.readonly,
      ...validationAriaAttributes.value,
    }))
    return {
      computedClass,
      labelStyle,
      inputStyle,
      computedError,
      computedErrorMessages,
      iconBackgroundComputedStyles,
      iconDotComputedStyles,
      iconComputedStyles,
      selectOption,
      onFocus,
      onBlur,
      inputAttributesComputed,
      computedName,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-radio {
  display: var(--va-radio-display);
  align-items: center;
  cursor: var(--va-radio-cursor);
  position: var(--va-radio-position);
  margin-top: var(--va-radio-margin-top);
  margin-right: var(--va-radio-margin-right);
  transition: var(--va-radio-transition, var(--va-swing-transition));
  font-family: var(--va-font-family);
  color: v-bind("labelStyle.color");

  & + & {
    margin-top: 0.5rem;
  }

  &--disabled {
    cursor: var(--va-radio-disabled-cursor);
  }

  &--readonly {
    @include va-readonly;

    .va-radio--left-label,
    .va-radio__text {
      cursor: initial;
      pointer-events: none;
    }
  }

  &--left-label {
    flex-direction: row-reverse;
    display: inline-flex;
    align-items: baseline;
  }

  &__input {
    @include visually-hidden;
  }

  &__icon {
    transition: var(--va-radio-icon-transition);
    display: flex;
    align-items: center;
    width: var(--va-radio-icon-width);
    height: var(--va-radio-icon-height);
    border-color: v-bind("iconComputedStyles.borderColor");
    border-radius: var(--va-radio-icon-border-radius);
    position: relative;
    border: var(--va-radio-icon-border);
    box-sizing: border-box;

    .va-radio__input:disabled + & {
      @include va-disabled;
    }

    .va-radio__input:focus-visible + & {
      @include focus-outline('inherit');
    }

    &__dot {
      transition: var(--va-radio-dot-transition, var(--va-swing-transition));
      position: absolute;
      top: var(--va-radio-dot-top);
      left: var(--va-radio-dot-left);
      right: var(--va-radio-dot-right);
      bottom: var(--va-radio-dot-bottom);
      border-radius: var(--va-radio-dot-border-radius);
      opacity: var(--va-radio-dot-opacity);
      border-color: v-bind("iconDotComputedStyles.borderColor");
      background-color: v-bind("iconDotComputedStyles.backgroundColor");

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
      position: absolute;
      top: var(--va-radio-background-top);
      left: var(--va-radio-background-left);
      right: var(--va-radio-background-right);
      bottom: var(--va-radio-background-bottom);
      border-radius: var(--va-radio-background-border-radius);
      z-index: var(--va-radio-background-z-index);
      opacity: var(--va-radio-background-opacity);
      background-color: v-bind("iconBackgroundComputedStyles.backgroundColor");

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
  }
}
</style>
