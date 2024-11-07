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
          @focus="onFocus"
          @blur="onBlur"
          @click.stop.prevent
          @keypress.prevent="toggleSelection"
        >
        <va-icon
          v-if="isActive"
          class="va-checkbox__icon"
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
import { computed, PropType, ref, shallowRef } from 'vue'

import {
  useComponentUuid,
  useComponentPresetProp,
  useElementFocusedKeyboard,
  useColors, useElementTextColor,
  useSelectable, useSelectableProps, useSelectableEmits, Elements,
} from '../../composables'

import { VaMessageListWrapper } from '../va-message-list'
import { VaIcon } from '../va-icon/'

const VaCheckboxValueType = [Boolean, Array, String, Object] as PropType<boolean | null | string | number | Record<any, unknown> | unknown[]>
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaCheckbox',
})

const props = defineProps({
  ...useSelectableProps,
  ...useComponentPresetProp,
  modelValue: { type: VaCheckboxValueType, default: false },
  color: { type: String, default: 'primary' },
  checkedIcon: { type: String, default: 'va-check' },
  indeterminate: { type: Boolean, default: false },
  indeterminateValue: { type: VaCheckboxValueType, default: null },
  indeterminateIcon: { type: String, default: 'remove' },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  ariaLabel: { type: String, default: undefined },
  vertical: { type: Boolean, default: false },
})

const emit = defineEmits(useSelectableEmits)

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
  validationAriaAttributes,
  toggleSelection,
  onBlur,
  onFocus,
  isDirty,
  isTouched,
  isError,
  isLoading,
  isValid,
} = useSelectable(props, emit, elements)
const { getColor } = useColors()
const input = elements.input
const hasKeyboardFocus = useElementFocusedKeyboard(input)
const textColorComputed = useElementTextColor(computed(() => getColor(props.color)))

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

const getPaddingStyle = () => {
  switch (true) {
    case !props.label:
      return ''
    case props.vertical:
      return 'var(--va-checkbox-vertical-padding)'
    case Boolean(props.arrayValue):
      return 'var(--va-checkbox-horizontal-padding)'
    case props.leftLabel:
      return 'var(--va-checkbox-right-padding)'
    default:
      return 'var(--va-checkbox-left-padding)'
  }
}

const labelStyle = computed(() => {
  return {
    color: computedError.value ? getColor('danger') : (props.success ? getColor('success') : ''),
    padding: getPaddingStyle(),
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

  if (props.success) {
    style.borderColor = getColor('success')
  }

  return style
})

const computedIconName = computed(() => props.indeterminate && isIndeterminate.value
  ? props.indeterminateIcon
  : props.checkedIcon,
)

const uniqueId = useComponentUuid()
const computedId = computed(() => props.id || String(uniqueId))
const computedName = computed(() => props.name || String(uniqueId))
const inputAttributesComputed = computed(() => ({
  name: computedName.value,
  disabled: props.disabled,
  readonly: props.readonly,
  tabindex: props.disabled ? -1 : 0,
  'aria-label': props.ariaLabel,
  'aria-disabled': props.disabled,
  'aria-readOnly': props.readonly,
  'aria-checked': isActive.value,
  ...validationAriaAttributes.value,
}))
const displayVal = computed(() => props.vertical ? '--va-checkbox-display-flex' : 'var(--va-checkbox-display)')

defineExpose({
  toggleSelection,
  isDirty,
  isTouched,
  isError,
  isLoading,
  isValid,
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-checkbox {
  display: v-bind(displayVal);
  max-width: fit-content;
  font-family: var(--va-font-family);

  &__input-container {
    align-items: center;
    display: flex;
    padding: var(--va-checkbox-input-padding);
    cursor: var(--va-checkbox-input-cursor);
    font-size: var(--va-checkbox-font-size);
    line-height: var(--va-checkbox-line-height);

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
    position: relative;
    background: var(--va-checkbox-background, --va-checkbox-square-background-color);
    border: var(--va-checkbox-square-border, var(--va-control-border));
    border-radius: var(--va-checkbox-square-border-radius);

    @at-root {
      .va-checkbox--on-keyboard-focus#{&} {
        transition: all, 0.6s, ease-in;
        outline: 2px solid var(--va-focus);
      }
    }
  }

  &__input {
    @include visually-hidden;
  }

  &__label {
    display: var(--va-checkbox-label-display);
    position: relative;
    cursor: var(--va-checkbox-label-cursor);
  }

  &__icon {
    pointer-events: none;
    position: absolute;
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
