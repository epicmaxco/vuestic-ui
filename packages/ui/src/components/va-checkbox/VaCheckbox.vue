<template>
  <va-input-wrapper
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
      @click="onWrapperClick()"
      tabindex="-1"
      @blur="onBlur"
      ref="container"
    >
      <div
        class="va-checkbox__square"
        :style="inputStyle"
      >
        <input
          ref="input"
          :id="id"
          :name="name"
          type="checkbox"
          role="checkbox"
          readonly
          v-on="SetupContext.keyboardFocusListeners"
          @focus="onFocus"
          @blur="onBlur($event)"
          class="va-checkbox__input"
          @keypress.prevent="toggleSelection()"
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
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </div>
  </va-input-wrapper>
</template>

<script lang="ts">
import { Options, mixins, prop, setup, Vue } from 'vue-class-component'

import ColorMixin from '../../services/color-config/ColorMixin'
import { SelectableMixin } from '../../mixins/SelectableMixin/SelectableMixin'
import VaIcon from '../va-icon/'
import { VaInputWrapper } from '../va-input'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'

type ModelValue = boolean | boolean[] | string | Record<string, unknown>

class CheckboxProps {
  modelValue = prop<ModelValue>({
    type: [Boolean, Array, String, Object],
    default: false,
  })

  color = prop<string>({ type: String, default: 'primary' })
  checkedIcon = prop<string>({ type: String, default: 'check' })
  indeterminateIcon = prop<string>({ type: String, default: 'remove' })
}

const CheckboxPropsMixin = Vue.with(CheckboxProps)

@Options({
  name: 'VaCheckbox',
  components: { VaInputWrapper, VaIcon },
})
export default class VaCheckbox extends mixins(
  ColorMixin,
  SelectableMixin,
  CheckboxPropsMixin,
) {
  SetupContext = setup(() => {
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    return {
      hasKeyboardFocus,
      keyboardFocusListeners,
    }
  })

  get computedClass () {
    return {
      'va-checkbox--selected': this.isChecked,
      'va-checkbox--readonly': this.readonly,
      'va-checkbox--disabled': this.disabled,
      'va-checkbox--indeterminate': this.indeterminate,
      'va-checkbox--error': this.computedError,
      'va-checkbox--left-label': this.leftLabel,
      'va-checkbox--on-keyboard-focus': this.SetupContext.hasKeyboardFocus,
    }
  }

  get labelStyle () {
    return {
      color: this.computedError ? this.theme.getColor('danger') : '',
      padding: !this.label
        ? ''
        : this.leftLabel
          ? '0 0.5rem 0 0'
          : '0 0 0 0.5rem',
    }
  }

  get inputStyle () {
    return this.computedError
      ? (this.isChecked || this.isIndeterminate)
        ? {
          background: this.colorComputed,
          borderColor: this.theme.getColor('danger'),
        }
        : { borderColor: this.theme.getColor('danger') }
      : (this.isChecked || this.isIndeterminate)
        ? { background: this.colorComputed, borderColor: this.colorComputed }
        : {}
  }

  get computedIconName () {
    return (this.indeterminate && this.isIndeterminate)
      ? this.indeterminateIcon
      : this.checkedIcon
  }
}
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-checkbox {
  display: var(--va-checkbox-display);
  max-width: var(--va-checkbox-max-width);

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
