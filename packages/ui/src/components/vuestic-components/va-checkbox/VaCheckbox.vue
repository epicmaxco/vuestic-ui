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
          :disabled="c_disabled"
          :indeterminate="c_indeterminate"
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
          {{ c_label }}
        </slot>
      </div>
    </div>
  </va-input-wrapper>
</template>

<script>
import VaIcon from '../va-icon/VaIcon'
import { SelectableMixin } from '../../vuestic-mixins/SelectableMixin/SelectableMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'
import VaInputWrapper from '../va-input/VaInputWrapper'

export default {
  name: 'VaCheckbox',
  components: { VaInputWrapper, VaIcon },
  mixins: [
    SelectableMixin,
    makeContextablePropsMixin({
      value: { type: [Boolean, Array, String, Object], default: false },
      checkedIcon: { type: String, default: 'check' },
      indeterminateIcon: { type: String, default: 'remove' },
      color: { type: String, default: 'primary' },
    }),
  ],
  computed: {
    computedClass () {
      return {
        'va-checkbox--selected': this.isChecked,
        'va-checkbox--readonly': this.c_readonly,
        'va-checkbox--disabled': this.c_disabled,
        'va-checkbox--indeterminate': this.c_indeterminate,
        'va-checkbox--error': this.computedError,
        'va-checkbox--left-label': this.c_leftLabel,
        'va-checkbox--on-keyboard-focus': this.isKeyboardFocused,
      }
    },
    labelStyle () {
      return {
        color: this.computedError ? getColor(this, 'danger') : '',
        padding: !this.c_label
          ? ''
          : this.c_leftLabel
            ? '0 0.25rem 0 0'
            : '0 0 0 0.25rem',
      }
    },
    inputStyle () {
      return this.computedError
        ? (this.isChecked || this.isIndeterminate)
          ? { background: this.colorComputed, borderColor: getColor(this, 'danger') }
          : { borderColor: getColor(this, 'danger') }
        : (this.isChecked || this.isIndeterminate)
          ? { background: this.colorComputed, borderColor: this.colorComputed }
          : {}
    },
    computedIconName () {
      return (this.c_indeterminate && this.isIndeterminate)
        ? this.c_indeterminateIcon
        : this.c_checkedIcon
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
    height: 0;
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
