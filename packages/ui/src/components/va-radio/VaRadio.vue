<template>
  <VaMessageListWrapper
    :disabled="disabled"
    :success="success"
    :messages="messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    :role="roleComputed"
    @blur="onBlur"
    ref="container"
    class="va-radio"
  >
    <label
      v-for="(option, index) in computedOptions"
      :key="index"
      :class="radioClass(option)"
      class="va-radio__square"
    >
      <input
        ref="input"
        class="va-radio__input"
        type="radio"
        role="radio"
        :value="isChecked(option)"
        :checked="isChecked(option)"
        :aria-checked="isChecked(option)"
        v-bind="inputAttributesComputed(option)"
        @change="selectOption(getValue(option), $event)"
        @focus="onFocus"
        @blur="onBlur"
      />

      <slot name="icon" v-bind="{
        value: isChecked(option),
        text: getText(option),
        disabled: getDisabled(option),
        index,
      }">
        <span
          aria-hidden="true"
          class="va-radio__icon"
        >
          <span
            class="va-radio__icon__background"
          />
          <span class="va-radio__icon__dot" />
        </span>
      </slot>

      <div
        v-if="getText(option) || $slots.default"
        ref="label"
        class="va-radio__text"
      >
         <slot v-bind="{
          value: isChecked(option),
          text: getText(option),
          disabled: getDisabled(option),
          index,
        }">
          {{ getText(option) }}
        </slot>
      </div>
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
  useSelectableList,
  useSelectableListProps,
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
    ...useSelectableListProps,
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
    label: { type: String, default: undefined },
    leftLabel: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    option: {
      type: [Object, String, Number] as PropType<VaRadioOption>,
      default: undefined,
    },
    vertical: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()
    const elements: Elements = {
      container: shallowRef<HTMLElement>(),
      input: shallowRef<HTMLElement>(),
      label: shallowRef<HTMLElement>(),
    }

    const {
      computedError,
      computedErrorMessages,
      validationAriaAttributes,
      onBlur,
      onFocus,
    } = useSelectable(props, emit, elements)

    const { getText: originalGetText, getDisabled: originalGetDisabled, getValue } = useSelectableList(props)

    const getText = (option: Parameters<typeof originalGetText>[0]) => {
      if (props.options.length > 0) { return originalGetText(option) }

      return props.label ?? originalGetText(option)
    }
    const getDisabled = (option: Parameters<typeof originalGetDisabled>[0]) => originalGetDisabled(option) || props.disabled

    const isNoOption = computed(() => props.options.length === 0 && !props.option)

    const isChecked = (option: VaRadioOption) => {
      if (isNoOption.value) {
        return props.modelValue
      }

      return props.modelValue === getValue(option)
    }

    const computedOptions = computed(() => {
      if (isNoOption.value) {
        return [{}]
      }

      if (props.option) {
        return [props.option]
      } else {
        return props.options
      }
    })

    const radioClass = (option: VaRadioOption) => ({
      'va-radio--left-label': props.leftLabel,
      'va-radio--selected': isChecked(option),
      'va-radio--readonly': props.readonly,
      'va-radio--disabled': props.disabled,
      'va-radio--indeterminate': props.indeterminate,
      'va-radio--error': computedError.value,
    })

    const selectOption = (option: any, event?: any) => {
      if (isNoOption.value) {
        emit('update:modelValue', event?.target?.checked || false)
        return
      }

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
    const inputAttributesComputed = (option: any) => {
      const disabled = getDisabled(option)
      return {
        name: computedName.value,
        disabled: disabled,
        readonly: props.readonly,
        tabindex: disabled ? -1 : 0,
        'aria-disabled': disabled,
        'aria-readOnly': props.readonly,
        ...validationAriaAttributes.value,
      }
    }

    const flexDirection = computed(() => props.vertical ? 'column' : 'row')

    return {
      flexDirection,
      getDisabled,
      isChecked,
      computedOptions,
      radioClass,
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
      roleComputed: computed(() => props.options?.length > 0 ? 'radiogroup' : ''),
      getText,
      getValue,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-radio {
  display: flex;
  width: max-content;
  flex-direction: v-bind(flexDirection);
  gap: var(--va-radio-gap);

  &__square {
    display: inline-flex;
    align-items: center;
    width: 100%;
    cursor: var(--va-radio-cursor);
    position: var(--va-radio-position);
    margin-top: var(--va-radio-margin-top);
    margin-right: var(--va-radio-margin-right);
    transition: var(--va-radio-transition, var(--va-swing-transition));
    font-family: var(--va-font-family);
    color: v-bind("labelStyle.color");
  }

  & + & {
    margin-top: 0.5rem;
  }

  .va-radio:last-child {
    margin: 0;
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
    align-items: center;

    &.va-radio__square {
      justify-content: space-between;
    }
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
    background: var(--va-radio-background);
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
      background-color: v-bind('iconBackgroundComputedStyles.backgroundColor');

      .va-radio__square:hover & {
        opacity: 0.2;
      }

      .va-radio--disabled .va-radio__square:hover & {
        opacity: 0;
      }
    }
  }

  &__text {
    display: var(--va-radio-text-display);
    margin-left: var(--va-radio-text-margin-left);
    margin-right: var(--va-radio-text-margin-right);
    white-space: nowrap;

    .va-radio--disabled & {
      @include va-disabled;
    }

    .va-radio--left-label & {
      margin-right: var(--va-radio-text-margin-left);
      margin-left: var(--va-radio-text-margin-right);
    }
  }
}
</style>
