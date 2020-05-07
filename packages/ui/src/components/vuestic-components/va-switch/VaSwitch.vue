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
      :class="computedClass"
      :id="id"
      :name="name"
      @click="toggleSelection"
      @keydown.enter="toggleSelection"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      :tabindex="computedTabindex"
      @blur="onBlur($event)"
      @focus="onFocus"
      ref="input"
    >
      <div class="va-switch__inner">
        <span
          class="va-switch__track"
          :style="trackStyle"
          :class="computedTrackClass"
        />
        <span class="va-switch__input" :style="indicatorStyle">
          <va-progress-circle
            v-if="loading"
            indeterminate
            :size="computedProgressCircleSize"
            :color="trackStyle.backgroundColor"
          />
        </span>
      </div>
      <div class="va-switch__label" :class="computedLabelClass">
        <slot>
          {{ label }}
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
      loading: {
        type: Boolean,
        default: false,
      },
    }),
  ],
  components: { VaProgressCircle, VaInputWrapper },
  computed: {
    computedClass () {
      return {
        'va-switch--small': this.size === 'small',
        'va-switch--large': this.size === 'large',
        'va-switch--disabled': this.c_disabled,
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
        : getColor(this, color, '#000')
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
    computedTrackClass () {
      return {
        'va-switch__track--error': this.computedError,
      }
    },
    computedLabelClass () {
      return {
        'va-switch__label--error': this.computedError,
      }
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

    &--error {
      color: $theme-red;
    }
  }

  &__track {
    display: inline-block;
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    background: $white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;

    &--error {
      border: 2px solid $theme-red;
    }
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
