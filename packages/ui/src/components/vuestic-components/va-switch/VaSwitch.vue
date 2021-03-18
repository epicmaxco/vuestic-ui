<template>
  <va-input-wrapper
    class="va-switch"
    :class="computedClass"
    :disabled="$props.disabled"
    :success="$props.success"
    :messages="$props.messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="$props.errorCount"
  >
    <div
      class="va-switch__container"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      tabindex="-1"
      @blur="onBlur"
      ref="container"
    >
      <div
        class="va-switch__inner"
        @click="onWrapperClick()"
      >
        <input
          class="va-switch__input"
          ref="input"
          type="checkbox"
          role="switch"
          :aria-checked="isChecked"
          :id="$props.id"
          :name="$props.name"
          readonly
          :disabled="$props.disabled"
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
                v-if="$props.loading"
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
        @click="onWrapperClick()"
      >
        <slot>
          {{ computedLabel }}
        </slot>
      </div>
    </div>
  </va-input-wrapper>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { SelectableMixin } from '../../vuestic-mixins/SelectableMixin/SelectableMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import { VaProgressCircle } from '../va-progress-bar'
import { VaInputWrapper } from '../va-input'

class SwitchProps {
  modelValue = prop<boolean | any[] | string | object>({ type: [Boolean, Array, String, Object], default: false })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (modelValue: string) => {
      return ['medium', 'small', 'large'].includes(modelValue)
    },
  })

  trueLabel = prop<string>({ type: String, default: null })
  falseLabel = prop<string>({ type: String, default: null })
  trueInnerLabel = prop<string>({ type: String, default: null })
  falseInnerLabel = prop<string>({ type: String, default: null })
}

const SwitchPropsMixin = Vue.with(SwitchProps)

@Options({
  name: 'VaSwitch',
  components: { VaProgressCircle, VaInputWrapper },
  emits: ['focus', 'blur', 'update:modelValue'],
})
export default class VaSwitch extends mixins(
  SelectableMixin,
  LoadingMixin,
  ColorMixin,
  SwitchPropsMixin,
) {
  get computedInnerLabel () {
    if (this.$props.trueInnerLabel && this.isChecked) {
      return this.$props.trueInnerLabel
    }
    if (this.$props.falseInnerLabel && !this.isChecked) {
      return this.$props.falseInnerLabel
    }
    return ''
  }

  get computedLabel () {
    if (this.$props.trueLabel && this.isChecked) {
      return this.$props.trueLabel
    }
    if (this.$props.falseLabel && !this.isChecked) {
      return this.$props.falseLabel
    }
    return this.$props.label
  }

  get computedClass () {
    return {
      'va-switch--checked': this.isChecked,
      'va-switch--small': this.$props.size === 'small',
      'va-switch--large': this.$props.size === 'large',
      'va-switch--disabled': this.$props.disabled,
      'va-switch--left-label': this.$props.leftLabel,
      'va-switch--error': this.computedError,
      'va-switch--on-keyboard-focus': this.isKeyboardFocused,
    }
  }

  get progressCircleSize () {
    const size: any = {
      small: '15px',
      medium: '20px',
      large: '25px',
    }
    return size[this.$props.size as string]
  }

  get trackStyle () {
    return {
      borderColor: this.$props.error
        ? this.theme.getColor('danger')
        : '',
      backgroundColor: this.isChecked
        ? this.colorComputed
        : this.theme.getColor('gray'),
    }
  }

  get labelStyle () {
    return {
      color: this.$props.error ? this.theme.getColor('danger') : '',
      padding: !this.$props.label && !(this.$props.trueLabel || this.$props.falseLabel)
        ? ''
        : this.$props.leftLabel
          ? '0 0.3rem 0 0'
          : '0 0 0 0.3rem',
    }
  }
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
