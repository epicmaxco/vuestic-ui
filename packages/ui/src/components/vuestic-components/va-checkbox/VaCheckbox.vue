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
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
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
import { Options, mixins, prop, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { SelectableMixin } from '../../vuestic-mixins/SelectableMixin/SelectableMixin'
import VaIcon from '../va-icon/'
import { VaInputWrapper } from '../va-input'

type ModelValue = boolean | boolean[] | string | object

class CheckboxProps {
  modelValue = prop<ModelValue>({ type: [Boolean, Array, String, Object], default: false })
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
  get computedClass () {
    return {
      'va-checkbox--selected': this.isChecked,
      'va-checkbox--readonly': this.readonly,
      'va-checkbox--disabled': this.disabled,
      'va-checkbox--indeterminate': this.indeterminate,
      'va-checkbox--error': this.computedError,
      'va-checkbox--left-label': this.leftLabel,
      'va-checkbox--on-keyboard-focus': this.isKeyboardFocused,
    }
  }

  get labelStyle () {
    return {
      color: this.computedError ? this.theme.getColor('danger') : '',
      padding: !this.label
        ? ''
        : this.leftLabel
          ? '0 0.25rem 0 0'
          : '0 0 0 0.25rem',
    }
  }

  get inputStyle () {
    return this.computedError
      ? (this.isChecked || this.isIndeterminate)
        ? { background: this.colorComputed, borderColor: this.theme.getColor('danger') }
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

<style lang="scss" scoped>
@import "../../vuestic-sass/resources/resources";

.va-checkbox {
  display: block;
  max-width: fit-content;

  &__input-container {
    align-items: center;
    display: flex;
    padding: 0 0.3rem;
    cursor: pointer;

    @at-root {
      .va-checkbox--disabled & {
        @include va-disabled();

        cursor: default;
      }

      .va-checkbox--readonly & {
        cursor: initial;
      }

      .va-checkbox--left-label & {
        flex-direction: row-reverse;
      }
    }
  }

  #{&}__square {
    @include flex-center();

    width: 1.35rem;
    min-width: 1.35rem;
    height: 1.35rem;
    position: relative;
    background-color: $white;
    border: solid 0.125rem $gray-light;
    border-radius: 0.25rem;

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
    display: inline-block;
    position: relative;
  }

  &__icon {
    pointer-events: none;
    position: absolute;
    color: transparent;
  }

  &--selected {
    .va-checkbox {
      &__icon {
        color: $white;
      }
    }
  }

  &--indeterminate {
    .va-checkbox {
      &__icon {
        color: $white;
      }
    }
  }
}

</style>
