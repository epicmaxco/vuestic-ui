<template>
  <VaMessageListWrapper
    class="va-checkbox"
    :class="computedClass"
    :disabled="disabled"
    :success="success"
    :messages="messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <div
      ref="container"
      class="va-checkbox__input-container"
      @click="toggleSelection"
      @blur="onBlur"
    >
      <div
        class="va-checkbox__square"
        :style="inputStyle"
        @selectstart.prevent
      >
        <input
          ref="input"
          type="checkbox"
          class="va-checkbox__input"
          :id="computedId"
          :indeterminate="indeterminate"
          :value="label"
          :checked="isActive"
          v-bind="inputAttributesComputed"
          v-on="keyboardFocusListeners"
          @focus="onFocus"
          @blur="onBlur"
          @click.stop.prevent
          @keypress.prevent="toggleSelection"
        >
        <va-icon
          v-show="isActive"
          class="va-checkbox__icon"
          size="20px"
          :name="computedIconName"
          :color="textColorComputed"
        />
      </div>
      <label
        v-if="label || $slots.label"
        ref="label"
        class="va-checkbox__label"
        :for="computedId"
        :style="labelStyle"
        @blur="onBlur"
      >
        <slot name="label">{{ label }}</slot>
      </label>
    </div>
  </VaMessageListWrapper>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, shallowRef } from 'vue'

import { generateUniqueId } from '../../services/utils'
import {
  useKeyboardOnlyFocus,
  useColors, useTextColor,
  useSelectable, useSelectableProps, useSelectableEmits, Elements,
} from '../../composables'

import { VaMessageListWrapper } from '../va-input'
import { VaIcon } from '../va-icon/'

const VaCheckboxValueType = [Boolean, Array, String, Object] as PropType<boolean | null | string | number | Record<any, unknown> | unknown[]>

export default defineComponent({
  name: 'VaCheckbox',
  components: { VaMessageListWrapper, VaIcon },
  emits: useSelectableEmits,
  props: {
    ...useSelectableProps,
    modelValue: { type: VaCheckboxValueType, default: false },
    color: { type: String, default: 'primary' },
    checkedIcon: { type: String, default: 'check' },
    indeterminate: { type: Boolean, default: false },
    indeterminateValue: { type: VaCheckboxValueType, default: null },
    indeterminateIcon: { type: String, default: 'remove' },
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    ariaLabel: { type: String, default: undefined },
  },
  setup (props, { emit }) {
    const elements: Elements = {
      container: shallowRef<HTMLElement>(),
      input: shallowRef<HTMLElement>(),
      label: shallowRef<HTMLElement>(),
    }

    const {
      isChecked,
      computedError,
      isIndeterminate,
      computedErrorMessages,
      toggleSelection,
      onBlur,
      onFocus,
    } = useSelectable(props, emit, elements)
    const { getColor } = useColors()
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { textColorComputed } = useTextColor()

    const isActive = computed(() => isChecked.value || isIndeterminate.value)

    const computedClass = computed(() => ({
      'va-checkbox--selected': isChecked.value,
      'va-checkbox--readonly': props.readonly,
      'va-checkbox--disabled': props.disabled,
      'va-checkbox--indeterminate': props.indeterminate,
      'va-checkbox--error': computedError.value,
      'va-checkbox--left-label': props.leftLabel,
      'va-checkbox--on-keyboard-focus': hasKeyboardFocus.value,
    }))

    const labelStyle = computed(() => {
      return {
        color: computedError.value ? getColor('danger') : '',
        padding: !props.label
          ? ''
          : props.leftLabel
            ? '0 0.5rem 0 0'
            : '0 0 0 0.5rem',
      }
    })

    const inputStyle = computed(() => {
      const style = {
        background: isActive.value ? getColor(props.color) : '',
        borderColor: isActive.value ? getColor(props.color) : '',
      }

      if (computedError.value) {
        style.borderColor = getColor('danger')
      }

      return style
    })

    const computedIconName = computed(() => props.indeterminate && isIndeterminate.value
      ? props.indeterminateIcon
      : props.checkedIcon,
    )

    const uniqueId = computed(generateUniqueId)
    const computedId = computed(() => props.id || uniqueId.value)
    const computedName = computed(() => props.name || uniqueId.value)
    const inputAttributesComputed = computed(() => ({
      name: computedName.value,
      disabled: props.disabled,
      readonly: props.readonly,
      tabindex: props.disabled ? -1 : 0,
      ariaLabel: props.ariaLabel,
      ariaDisabled: props.disabled,
      ariaReadOnly: props.readonly,
      ariaChecked: isActive.value,
      'aria-invalid': !!computedErrorMessages.value.length,
      'aria-errormessage': typeof computedErrorMessages.value === 'string'
        ? computedErrorMessages.value
        : computedErrorMessages.value.join(', '),
    }))

    return {
      isActive,
      computedClass,
      labelStyle,
      inputStyle,
      computedIconName,
      textColorComputed,
      computedError,
      computedErrorMessages,
      keyboardFocusListeners,
      toggleSelection,
      onBlur,
      onFocus,
      inputAttributesComputed,
      computedId,
      computedName,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-checkbox {
  display: var(--va-checkbox-display);
  max-width: var(--va-checkbox-max-width);
  font-family: var(--va-font-family);

  &__input-container {
    align-items: var(--va-checkbox-input-align-items);
    display: var(--va-checkbox-input-display);
    padding: var(--va-checkbox-input-padding);
    cursor: var(--va-checkbox-input-cursor);

    @at-root {
      .va-checkbox--disabled & {
        @include va-disabled();

        cursor: var(--va-checkbox-disabled-cursor);
      }

      .va-checkbox--readonly & {
        cursor: var(--va-checkbox-readonly-cursor);
      }

      .va-checkbox--left-label & {
        flex-direction: row-reverse;
      }
    }
  }

  #{&}__square {
    @include flex-center();

    width: var(--va-checkbox-square-width);
    min-width: var(--va-checkbox-square-min-width);
    height: var(--va-checkbox-square-height);
    position: var(--va-checkbox-square-position);
    background-color: var(--va-checkbox-square-background-color, var(--va-background-color));
    border: var(--va-checkbox-square-border, var(--va-control-border));
    border-radius: var(--va-checkbox-square-border-radius, var(--va-square-border-radius));

    @at-root {
      .va-checkbox--on-keyboard-focus#{&} {
        transition: all, 0.6s, ease-in;
        box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.3);
      }
    }
  }

  &__input {
    @include visually-hidden;
  }

  &__label {
    display: var(--va-checkbox-label-display);
    position: var(--va-checkbox-label-position);
  }

  &__icon {
    pointer-events: var(--va-checkbox-icon-pointer-events);
    position: var(--va-checkbox-icon-position);
  }

  &--selected {
    .va-checkbox {
      &__icon {
        color: var(--va-checkbox-selected-icon-color);
      }
    }
  }

  &--indeterminate {
    .va-checkbox {
      &__icon {
        color: var(--va-checkbox-indeterminate-icon-color);
      }
    }
  }
}
</style>
