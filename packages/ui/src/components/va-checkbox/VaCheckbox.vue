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
      class="va-checkbox__input-container"
      @click="toggleSelection"
      tabindex="-1"
      @blur="onBlur"
      ref="container"
    >
      <div
        class="va-checkbox__square"
        :style="inputStyle"
        @selectstart.prevent
      >
        <input
          ref="input"
          type="checkbox"
          role="checkbox"
          readonly
          :id="id"
          :name="name"
          v-on="keyboardFocusListeners"
          @focus="onFocus"
          @blur="onBlur"
          class="va-checkbox__input"
          @click.stop.prevent
          @keypress.prevent="toggleSelection"
          :disabled="disabled"
          :indeterminate="indeterminate"
        >
        <va-icon
          class="va-checkbox__icon"
          :name="computedIconName"
          size="20px"
        />
      </div>
      <div
        class="va-checkbox__label"
        :style="labelStyle"
        ref="label"
        tabindex="-1"
        @blur="onBlur"
      >
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
  </VaMessageListWrapper>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue'

import { VaMessageListWrapper } from '../va-input'
import VaIcon from '../va-icon/'

import { useColors } from '../../composables/useColor'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'
import { useSelectable, useSelectableProps, useSelectableEmits } from '../../composables/useSelectable'

export default defineComponent({
  name: 'VaCheckbox',
  components: { VaMessageListWrapper, VaIcon },
  emits: useSelectableEmits,
  props: {
    ...useSelectableProps,
    modelValue: { type: null as any as PropType<unknown>, default: false },
    color: { type: String as PropType<string>, default: 'primary' },
    checkedIcon: { type: String as PropType<string>, default: 'check' },
    indeterminateIcon: { type: String as PropType<string>, default: 'remove' },
    id: { type: String as PropType<string>, default: '' },
    name: { type: String as PropType<string>, default: '' },
  },
  setup (props, { emit }) {
    const elements = {
      container: ref(null),
      input: ref(null),
      label: ref(null),
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
      const isActive = isChecked.value || isIndeterminate.value
      const style = {
        background: isActive ? getColor(props.color) : '',
        borderColor: isActive ? getColor(props.color) : '',
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

    return {
      computedClass,
      labelStyle,
      inputStyle,
      computedIconName,
      computedError,
      computedErrorMessages,
      keyboardFocusListeners,
      toggleSelection,
      onBlur,
      onFocus,
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
    opacity: 0;
    width: 0;
    height: 0 !important;
  }

  &__label {
    display: var(--va-checkbox-label-display);
    position: var(--va-checkbox-label-position);
  }

  &__icon {
    pointer-events: var(--va-checkbox-icon-pointer-events);
    position: var(--va-checkbox-icon-position);
    color: var(--va-checkbox-icon-color);
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
