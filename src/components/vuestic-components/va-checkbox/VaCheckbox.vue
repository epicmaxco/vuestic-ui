<template>
  <va-input-wrapper
    class="va-checkbox"
    :class="computedClass"
    :disabled="c_disabled"
    :success="c_success"
    :messages="c_messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <div
      class="va-checkbox__input-container"
      @click="toggleSelection()"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
    >
      <div class="va-checkbox__square">
        <input
          ref="input"
          :id="id"
          :name="name"
          readonly
          @focus="onFocus"
          @blur="onBlur"
          class="va-checkbox__input"
          @keypress.prevent="toggleSelection()"
          :disabled="c_disabled"
          :indeterminate="c_indeterminate"
          :style="inputStyle"
        >
        <va-icon
          class="va-checkbox__icon-selected"
          :name="computedIconName"
        />
      </div>
      <div
        class="va-checkbox__label-text"
        :style="labelStyle"
      >
        <slot name="label">
          {{ c_label }}
        </slot>
      </div>
    </div>
  </va-input-wrapper>
</template>

<script>
import VaIcon from '../va-icon/VaIcon'
import { KeyboardOnlyFocusMixin } from './KeyboardOnlyFocusMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'
import VaInputWrapper from '../va-input/VaInputWrapper'

export default {
  name: 'VaCheckbox',
  components: { VaInputWrapper, VaIcon },
  mixins: [
    makeContextablePropsMixin({
      label: { type: String, default: '' },
      value: { type: [Boolean, Array], default: false },
      arrayValue: { type: String, default: '' },
      indeterminate: { type: Boolean, default: false },
      checkedIcon: { type: String, default: 'check' },
      indeterminateIcon: { type: String, default: 'remove' },
    }),
    FormComponentMixin,
    KeyboardOnlyFocusMixin,
    ColorThemeMixin,
    ContextPluginMixin,
  ],
  computed: {
    computedClass () {
      return {
        'va-checkbox--selected': this.isChecked,
        'va-checkbox--readonly': this.c_readonly,
        'va-checkbox--disabled': this.c_disabled,
        'va-checkbox--indeterminate': this.c_indeterminate,
        'va-checkbox--error': this.computedError,
        'va-checkbox--on-keyboard-focus': this.isKeyboardFocused,
      }
    },
    labelStyle () {
      if (this.computedError) {
        return { color: this.$themes.danger }
      }

      return {}
    },
    inputStyle () {
      if (this.computedError) {
        if (this.isChecked) {
          return { background: this.$themes.danger }
        } else {
          return { borderColor: this.$themes.danger }
        }
      } else {
        if (this.isChecked) return { background: this.colorComputed }
      }

      return {}
    },
    computedIconName () {
      return this.c_indeterminate ? this.c_indeterminateIcon : this.c_checkedIcon
    },
    isChecked () {
      return this.modelIsArray ? this.c_value.includes(this.c_arrayValue) : this.c_value
    },
    modelIsArray () {
      return Array.isArray(this.c_value)
    },
  },
  methods: {
    /** @public */
    focus () {
      this.$refs.input.focus()
    },
    /** @public */
    reset () {
      this.$emit('input', false)
    },
    onFocus () {
      this.KeyboardOnlyFocusMixin_onFocus()

      this.$emit('focus')
    },
    onBlur (event) {
      this.ValidateMixin_onBlur()
      this.isKeyboardFocused = false
      this.$emit('blur', event)
    },
    toggleSelection () {
      if (this.c_readonly) {
        return
      }
      if (this.c_disabled) {
        return
      }
      if (this.modelIsArray) {
        if (this.c_value.includes(this.c_arrayValue)) {
          this.$emit('input', this.c_value.filter(option => option !== this.c_arrayValue))
        } else {
          this.$emit('input', this.value.concat(this.c_arrayValue))
        }
        return
      }

      this.$emit('input', !this.c_value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../vuestic-sass/resources/resources";

.va-checkbox {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__input-container {
    align-items: center;
    display: flex;
    cursor: pointer;

    @at-root {
      .va-checkbox--disabled & {
        @include va-disabled();

        cursor: default;
      }

      .va-checkbox--readonly & {
        cursor: initial;
      }
    }
  }

  #{&}__square {
    @include flex-center();

    width: 2rem;
    height: 2rem;
    position: relative;
    flex: 0 0 2rem;

    @at-root {
      .va-checkbox--on-keyboard-focus#{&} {
        background-color: $light-gray;
        transition: all, 0.6s, ease-in;
        border-radius: 5rem;
      }
    }
  }

  #{&}__input {
    box-sizing: border-box;
    height: 1.375rem;
    width: 1.375rem;
    cursor: inherit;
    color: $white;
    background-color: $white;
    border: solid 0.125rem $gray-light;
    border-radius: 0.25rem;

    &:focus {
      outline: none;
    }

    @at-root {
      .va-checkbox--selected#{&} {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.4rem;
        width: 1.4rem;
        color: $white;
        background-color: $vue-green;
        border: 0;
      }

      .va-checkbox--error#{&} {
        border-color: $theme-red;
      }
    }
  }

  #{&}__label-text {
    display: inline-block;
    position: relative;
    margin-left: 0.25rem;

    @at-root {
      .va-checkbox--error#{&} {
        color: $theme-red;
      }
    }
  }

  &__error-message {
    vertical-align: middle;
    color: $theme-red;
    font-size: $font-size-mini;
  }

  &__icon-selected {
    pointer-events: none;
    position: absolute;
    color: $white;
  }

  &__error-message-container {
    flex: 0 0 100%;
    margin-left: 0.3rem; // To fit with checkbox.
  }

  &__label-container {
    margin-left: 2rem;
  }

  &__content {
    flex-direction: row;
  }
}
</style>
