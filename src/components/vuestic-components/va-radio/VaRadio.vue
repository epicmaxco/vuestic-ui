<template>
  <label
    class="va-radio"
    :class="computedClass"
  >
    <input
      class="va-radio__input"
      type="radio"
      :checked="isActive"
      :disabled="disabled"
      :name="name"
      @change="onClick"
      @focus="onFocus"
    />

    <span class="va-radio__icon">
      <span class="va-radio__icon__background"></span>
      <span class="va-radio__icon__dot"></span>
    </span>

    <span class="va-radio__text">
      <slot>
        {{ computedLabel }}
      </slot>
    </span>
  </label>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-radio',
  mixins: [ ColorThemeMixin ],
  props: {
    value: {
    },
    option: {
      type: [Object, String, Number, Boolean],
    },
    name: {
      type: [ String, Number ],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    leftLabel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass () {
      return {
        'va-radio--disabled': this.disabled,
        'va-radio--leftLabel': this.leftLabel,
      }
    },
    computedLabel () {
      return this.label || this.option
    },
    isActive () {
      return this.value === this.option
    },
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.$emit('input', this.option)
      }
    },
    onFocus (e) {
      if (!this.disabled) {
        this.$emit('focus', e)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-right: 0.5rem;

  &--disabled {
    cursor: default;
  }

  &--leftLabel {
    flex-direction: row-reverse;
    display: inline-flex;
  }

  &__input {
    width: 0;
    height: 0;
    position: absolute;
    left: -100px;
    top: -100px;
    opacity: 0;
    z-index: -1;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 100%;
    position: relative;

    .va-radio__input:checked + & {
      border-color: $brand-success;
    }

    .va-radio__input:disabled + & {
      opacity: 0.4;
    }

    &__dot {
      transition: $transition-primary;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 100%;
      border: $gray solid 0.125rem;
      z-index: 2;

      .va-radio__input:checked + .va-radio__icon & {
        border-color: $brand-success;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        right: 0.25rem;
        bottom: 0.25rem;
        border-radius: 100%;
        background-color: $brand-success;
        opacity: 0;

        .va-radio__input:checked + .va-radio__icon & {
          opacity: 1;
        }
      }
    }

    &__background {
      transition: $transition-primary;
      position: absolute;
      top: -0.25rem;
      left: -0.25rem;
      right: -0.25rem;
      bottom: -0.25rem;
      background-color: $vue-light-green;
      border-radius: 100%;
      z-index: 0;
      opacity: 0;

      .va-radio__input:focus + .va-radio__icon & {
        opacity: 1;
      }

      .va-radio:hover & {
        opacity: 1;
      }

      .va-radio--disabled:hover & {
        opacity: 0;
      }
    }
  }

  &__text {
    display: inline-flex;
    margin-left: 0.5rem;
    margin-right: 0;

    .va-radio--disabled & {
      opacity: 0.4;
    }

    .va-radio--leftLabel & {
      margin-left: 0;
      margin-right: 0.5rem;
    }
  }
}

</style>
