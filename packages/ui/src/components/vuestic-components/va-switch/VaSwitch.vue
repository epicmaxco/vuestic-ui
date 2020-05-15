<template>
  <va-input-wrapper
    class="va-switch-wrapper"
    :class="computedClass"
    :disabled="c_disabled"
    :success="c_success"
    :messages="c_messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <div
      class="va-switch"
      :id="id"
      :name="name"
      :class="computedClass"
      @blur="onBlur($event)"
      @focus="onFocus"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      :tabindex="computedTabindex"
      ref="input"
    >
      <div class="va-switch__inner"
        @click="toggleSelection"
        @keydown.enter="toggleSelection"
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
          <div class="va-switch__input-wrapper">
            <span class="va-switch__input">
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
      <div class="va-switch__label">
        <slot>
          {{ computedLabel }}
        </slot>
      </div>
    </div>
  </va-input-wrapper>
</template>
<script>
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { getFocusColor } from '../../../services/color-functions'
import { SelectableMixin } from '../../vuestic-mixins/SelectableComponent/SelectableMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'
import VaInputWrapper from '../va-input/VaInputWrapper'

export default {
  name: 'VaSwitch',
  mixins: [
    SelectableMixin,
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
      loading: {
        type: Boolean,
        default: false,
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
      if (this.trueInnerLabel && this.isTrue) {
        return this.trueInnerLabel
      }
      if (this.falseInnerLabel && !this.isTrue) {
        return this.falseInnerLabel
      }
      return ''
    },
    computedLabel () {
      if (this.trueLabel && this.isTrue) {
        return this.trueLabel
      }
      if (this.falseLabel && !this.isTrue) {
        return this.falseLabel
      }
      return this.label
    },
    computedClass () {
      return {
        'va-switch--checked': this.isTrue,
        'va-switch--small': this.size === 'small',
        'va-switch--large': this.size === 'large',
        'va-switch--disabled': this.c_disabled,
        'va-switch--left-label': this.leftLabel,
        'va-switch--error': this.computedError,
      }
    },
    progressCircleSize () {
      return {
        small: '15px',
        medium: '20px',
        large: '25px',
      }[this.size]
    },
    trackStyle () {
      const color = this.isTrue
        ? this.colorComputed
        : this.$themes.gray
      const backgroundColor = this.isKeyboardFocused
        ? getFocusColor(color)
        : getColor(this, color, '#000')
      return { backgroundColor }
    },
    computedTabindex () {
      return this.disabled ? -1 : 0
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-switch-wrapper {
  display: inline-block;
}

.va-switch {
  display: inline-flex;
  align-items: center;
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
      box-shadow: 0 0 0 4px rgba(52, 144, 220, 0.5);
    }
  }

  &--small {
    .va-switch {
      &__inner {
        height: 1.5rem;
        width: auto;
        min-width: 3rem;
      }

      &__input {
        height: 1.1rem;
        width: 1.1rem;
      }

      &__track {
        border-radius: 0.75rem;
      }

      &__track-label {
        margin: auto 7px auto 25px;
      }

      &--checked {
        .va-switch {
          &__track-label {
            margin: auto 25px auto 7px;
          }
        }
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

      &__input {
        height: 1.8rem;
        width: 1.8rem;
      }

      &__track {
        border-radius: 1.25rem;
      }

      &__track-label {
        margin: auto 7px auto 37px;
      }

      &--checked {
        .va-switch {
          &__track-label {
            margin: auto 37px auto 7px;
          }
        }
      }
    }
  }

  &--disabled {
    @include va-disabled;
  }

  &--left-label {
    flex-direction: row-reverse;
  }

  &--checked {
    .va-switch {
      &__track-label {
        margin: auto 33px auto 7px;
      }

      &__input {
        margin: auto -5px;
        transform: translateX(-100%);
      }

      &__input-wrapper {
        transform: translateX(100%);
      }
    }
  }

  &--error {
    .va-switch {
      &__label {
        color: $theme-red;
      }

      &__track {
        border: 2px solid $theme-red;
      }
    }
  }

  &__label {
    text-align: left;
    margin: 0 4px;
  }

  &__track {
    display: flex;
    overflow: hidden;
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    background: $white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }

  &__track-label {
    color: $white;
    margin: auto 7px auto 33px;
  }

  &__input {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 5px;
    transform: translateX(0);
    height: 1.5rem;
    width: 1.5rem;
    background-color: $white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__input-wrapper {
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
}
</style>
