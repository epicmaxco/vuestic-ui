<template>
  <va-input-wrapper
    class="va-switch"
    :class="computedClass"
    :disabled="c_disabled"
    :success="c_success"
    :messages="c_messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <div
      class="va-switch__container"
      @click="clickWrapper()"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      tabindex="-1"
      @blur="onBlur"
      ref="container"
    >
      <div class="va-switch__inner">
        <input
          class="va-switch__input"
          ref="input"
          type="checkbox"
          role="switch"
          :aria-checked="isTrue"
          :id="id"
          :name="name"
          readonly
          :disabled="c_disabled"
          @focus="onFocus"
          @blur="onBlur"
          @keypress.prevent="toggleSelection()"
        >
        <div
          class="va-switch__track"
          :style="trackStyle"
        >
          <div class="va-switch__track-label">
            <slot name="innerLabel">
              {{ computedInnerLabel }}
            </slot>
          </div>
          <div class="va-switch__checker-wrapper">
            <span
              class="va-switch__checker"
            >
              <va-progress-circle
                v-if="loading"
                indeterminate
                :size="progressCircleSize"
                :color="trackStyle.backgroundColor"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        class="va-switch__label"
        ref="label"
        @blur="onBlur"
        :style="labelStyle"
      >
        <slot>
          {{ computedLabel }}
        </slot>
      </div>
    </div>
  </va-input-wrapper>
</template>
<script>
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { SelectableMixin } from '../../vuestic-mixins/SelectableComponent/SelectableMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'
import VaInputWrapper from '../va-input/VaInputWrapper'

export default {
  name: 'VaSwitch',
  mixins: [
    SelectableMixin,
    LoadingMixin,
    makeContextablePropsMixin({
      value: { type: [Boolean, Array, String, Object], default: false },
      size: {
        type: String,
        default: 'medium',
        validator: value => {
          return ['medium', 'small', 'large'].includes(value)
        },
      },
      color: {
        type: String,
        default: 'primary',
      },
      trueLabel: {
        type: String,
        default: null,
      },
      falseLabel: {
        type: String,
        default: null,
      },
      trueInnerLabel: {
        type: String,
        default: null,
      },
      falseInnerLabel: {
        type: String,
        default: null,
      },
    }),
  ],
  components: { VaProgressCircle, VaInputWrapper },
  computed: {
    computedInnerLabel () {
      if (this.c_trueInnerLabel && this.isTrue) {
        return this.c_trueInnerLabel
      }
      if (this.c_falseInnerLabel && !this.isTrue) {
        return this.c_falseInnerLabel
      }
      return ''
    },
    computedLabel () {
      if (this.c_trueLabel && this.isTrue) {
        return this.c_trueLabel
      }
      if (this.c_falseLabel && !this.isTrue) {
        return this.c_falseLabel
      }
      return this.c_label
    },
    computedClass () {
      return {
        'va-switch--checked': this.isTrue,
        'va-switch--small': this.c_size === 'small',
        'va-switch--large': this.c_size === 'large',
        'va-switch--disabled': this.c_disabled,
        'va-switch--left-label': this.c_leftLabel,
        'va-switch--error': this.computedError,
        'va-switch--on-keyboard-focus': this.isKeyboardFocused,
      }
    },
    progressCircleSize () {
      return {
        small: '15px',
        medium: '20px',
        large: '25px',
      }[this.c_size]
    },
    trackStyle () {
      return {
        borderColor: this.c_error
          ? getColor(this, 'danger')
          : '',
        backgroundColor: this.isTrue
          ? this.colorComputed
          : getColor(this, 'gray'),
      }
    },
    labelStyle () {
      return {
        color: this.c_error ? getColor(this, 'danger') : '',
        padding: !this.c_label && !(this.c_trueLabel || this.c_falseLabel)
          ? ''
          : this.c_leftLabel
            ? '0 0.3rem 0 0'
            : '0 0 0 0.3rem',
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-switch {
  @at-root {
    .va-switch__container {
      display: inline-flex;
      align-items: center;
      padding: 0 0.3rem;
    }
  }

  display: inline-block;
  margin-bottom: $checkbox-between-items-margin;

  &:focus {
    outline: none;
  }

  &__inner {
    cursor: pointer;
    display: inline-block;
    position: relative;
    height: 2rem;
    width: auto;
    min-width: 4rem;
    border-radius: 1rem;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.3rem rgba(52, 144, 220, 0.5);
    }
  }

  &--small {
    .va-switch {
      &__inner {
        height: 1.5rem;
        width: auto;
        min-width: 3rem;
      }

      &__checker {
        height: 1.1rem;
        width: 1.1rem;
      }
    }
  }

  &--large {
    .va-switch {
      &__inner {
        height: 2.5rem;
        width: auto;
        min-width: 5rem;
      }

      &__checker {
        height: 1.8rem;
        width: 1.8rem;
      }
    }
  }

  &--disabled {
    @include va-disabled;
  }

  &--left-label {
    .va-switch__container {
      flex-direction: row-reverse;
    }
  }

  &--checked {
    .va-switch {
      &__checker {
        margin: auto -0.3rem;
        transform: translateX(-100%);
      }

      &__checker-wrapper {
        transform: translateX(100%);
      }
    }
  }

  &--error {
    .va-switch {
      &__track {
        border: 0.1rem solid;
      }
    }
  }

  &__label {
    cursor: pointer;
    text-align: left;
  }

  #{&}__track {
    display: flex;
    overflow: hidden;
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    background: $white;
    box-shadow: inset 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;

    @at-root {
      .va-switch--on-keyboard-focus#{&} {
        transition: all, 0.6s, ease-in;
        box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.3);
      }
      .va-switch--small#{&} {
        border-radius: 0.75rem;
      }
      .va-switch--large#{&} {
        border-radius: 1.25rem;
      }
    }
  }

  #{&}__track-label {
    color: $white;
    margin: auto 0.5rem auto 2rem;

    @at-root {
      .va-switch--checked#{&} {
        margin: auto 2rem auto 0.5rem;
      }

      .va-switch--small#{&} {
        margin: auto 0.5rem auto 1.55rem;

        @at-root {
          .va-switch--checked#{&} {
            margin: auto 1.55rem auto 0.5rem;
          }
        }
      }

      .va-switch--large#{&} {
        margin: auto 0.5rem auto 2.3rem;

        @at-root {
          .va-switch--checked#{&} {
            margin: auto 2.3rem auto 0.5rem;
          }
        }
      }
    }
  }

  &__checker {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0.3rem;
    transform: translateX(0);
    height: 1.5rem;
    width: 1.5rem;
    background-color: $white;
    border-radius: 50%;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__checker-wrapper {
    position: absolute;
    margin: auto;
    transform: translateX(0);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease;
    pointer-events: none;
  }

  &__input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
}
</style>
