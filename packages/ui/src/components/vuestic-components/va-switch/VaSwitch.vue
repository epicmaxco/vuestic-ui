<template>
  <div
    class="va-switch"
    :class="computedClass"
    @click="switchValue"
    @keydown.enter="switchValue"
    @mousedown="hasMouseDown = true"
    @mouseup="hasMouseDown = false"
    :tabindex="computedTabindex"
    @blur="isKeyboardFocused = false"
  >
    <div class="va-switch__inner">
      <span class="va-switch__track" :style="trackStyle" />
      <span class="va-switch__input" :style="indicatorStyle">
        <va-progress-circle v-if="loading" indeterminate :size="computedProgressCircleSize" :color="color || 'black'" />
      </span>
    </div>
    <div class="va-switch__label">
      <slot>
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script>
import VaProgressCircle from '../va-progress-bar/progress-types/VaProgressCircle'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { getFocusColor } from '../../../services/color-functions'
import { KeyboardOnlyFocusMixin } from '../va-checkbox/KeyboardOnlyFocusMixin'
import { SelectableMixin } from '../../vuestic-mixins/SelectableComponent/SelectableMixin'
import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaSwitch',
  mixins: [
    ColorThemeMixin,
    KeyboardOnlyFocusMixin,
    SelectableMixin,
    ContextPluginMixin,
    makeContextablePropsMixin({
      value: { type: [Object, Array, Number, String, Boolean], default: false },
      size: {
        type: String,
        default: 'medium',
        validator: value => {
          return ['medium', 'small', 'large'].includes(value)
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    }),
  ],
  components: { VaProgressCircle },
  computed: {
    computedClass () {
      return {
        'va-switch--small': this.size === 'small',
        'va-switch--large': this.size === 'large',
        'va-switch--disabled': this.disabled,
        'va-switch--left-label': this.leftLabel,
      }
    },
    computedProgressCircleSize () {
      if (this.size === 'small') {
        return 15
      } else if (this.size === 'large') {
        return 25
      }
      return 20
    },
    trackStyle () {
      const color = this.isTrue ? this.colorComputed : this.$themes.gray
      const backgroundColor = this.isKeyboardFocused
        ? getFocusColor(color)
        : color
      return { backgroundColor }
    },
    indicatorStyle () {
      const moveStartPoint =
        this.size === 'small' ? 1.5 : this.size === 'large' ? 2.5 : 2
      return {
        transform: this.isTrue
          ? `translateX(${moveStartPoint}rem)`
          : 'translateX(0rem)',
      }
    },
    computedTabindex () {
      return this.disabled ? -1 : 0
    },
    isTrue () {
      return this.modelIsArray
        ? this.value.includes(this.arrayValue)
        : this.value === this.trueValue
    },
    isFalse () {
      return this.modelIsArray
        ? !this.value.includes(this.arrayValue)
        : this.value === this.falseValue
    },
    modelIsArray () {
      return Array.isArray(this.value)
    },
  },
  methods: {
    switchValue () {
      if (this.disabled) {
        return
      }

      if (this.modelIsArray) {
        if (this.value.includes(this.arrayValue)) {
          this.$emit(
            'input',
            this.value.filter(option => option !== this.arrayValue),
          )
        } else {
          this.$emit('input', this.value.concat(this.arrayValue))
        }
        return
      }

      if (this.isTrue) {
        this.$emit('input', this.falseValue)
      } else if (this.isFalse) {
        this.$emit('input', this.trueValue)
      } else {
        this.$emit('input', false)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-switch {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-bottom: $checkbox-between-items-margin;

  &:focus {
    outline: none;
  }

  &__inner {
    display: inline-block;
    position: relative;
    height: 2rem;
    width: 4rem;
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
        width: 3rem;
        min-width: 3rem;
      }

      &__input {
        top: 0.128rem;
        left: 0.1275rem;
        height: 1.2rem;
        width: 1.2rem;
      }

      &__track {
        border-radius: 0.75rem;
      }
    }
  }

  &--large {
    .va-switch {
      &__inner {
        height: 2.5rem;
        width: 5rem;
        min-width: 5rem;
      }

      &__input {
        top: 0.375rem;
        left: 0.375rem;
        height: 1.8rem;
        width: 1.8rem;
      }

      &__track {
        border-radius: 1.25rem;
      }
    }
  }

  &--disabled {
    @include va-disabled;
  }

  &--left-label {
    flex-direction: row-reverse;
  }

  &__label {
    text-align: left;
    margin: 0 4px;
  }

  &__track {
    display: inline-block;
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    background: $white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }

  &__input {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    height: 1.5rem;
    width: 1.5rem;
    background-color: $white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
