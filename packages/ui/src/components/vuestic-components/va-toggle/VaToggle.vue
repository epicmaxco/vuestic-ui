<template>
  <div
    class="va-toggle"
    :class="computedClass"
    @click="toggle"
    @keydown.enter="toggle"
    @mousedown="hasMouseDown = true"
    @mouseup="hasMouseDown = false"
    :tabindex="computedTabindex"
    @focus="onFocus"
    @blur="isKeyboardFocused = false"
  >
    <div class="va-toggle__inner">
      <span
        class="va-toggle__track"
        :style="trackStyle"
      />
      <span
        class="va-toggle__input"
        :style="indicatorStyle"
      />
    </div>
    <div class="va-toggle__label">
      <slot>
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { getFocusColor } from '../../../services/color-functions'
import { KeyboardOnlyFocusMixin } from '../va-checkbox/KeyboardOnlyFocusMixin'

export default {
  name: 'VaToggle',
  mixins: [ColorThemeMixin, KeyboardOnlyFocusMixin],
  props: {
    value: {
      type: [Object, Array, Number, String, Boolean],
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return ['medium', 'small', 'large'].includes(value)
      },
    },
    disable: {
      type: Boolean,
      default: false,
    },
    arrayValue: {
      type: String,
      default: null,
    },
    trueValue: {
      type: Boolean,
      default: true,
    },
    falseValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass () {
      return {
        'va-toggle--small': this.size === 'small',
        'va-toggle--large': this.size === 'large',
        'va-toggle--disabled': this.disable,
      }
    },
    trackStyle () {
      const color = this.isTrue ? this.colorComputed : this.$themes.gray
      const backgroundColor = this.isKeyboardFocused ? getFocusColor(color) : color
      return { backgroundColor }
    },
    indicatorStyle () {
      const moveStartPoint = this.size === 'small' ? 1.5 : this.size === 'large' ? 2.5 : 2
      return { transform: this.isTrue ? `translateX(${moveStartPoint}rem)` : 'translateX(0rem)' }
    },
    computedTabindex () {
      return this.disable ? -1 : 0
    },
    isTrue () {
      return this.modelIsArray ? this.value.includes(this.arrayValue) : this.value === this.trueValue
    },
    isFalse () {
      return this.modelIsArray ? !this.value.includes(this.arrayValue) : this.value === this.falseValue
    },
    modelIsArray () {
      return Array.isArray(this.value)
    },
  },
  methods: {
    toggle () {
      if (this.disable) {
        return
      }

      if (this.modelIsArray) {
        if (this.value.includes(this.arrayValue)) {
          this.$emit('input', this.value.filter(option => option !== this.arrayValue))
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
@import '../../vuestic-sass/resources/resources';

.va-toggle {
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
    .va-toggle {
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
    .va-toggle {
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

  &__label {
    text-align: left;
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
  }
}

</style>
