<template>
  <label
    class="va-radio"
    :class="computedClass"
    @click="onClick"
  >
    <input :checked="isActive" type="radio" class="va-radio__input" :disabled="disabled" />
    <span class="va-radio__icon">
      <span class="va-radio__icon__background"></span>
      <span class="va-radio__icon__dot"></span>
    </span>

    <span class="va-radio__text">
      <slot name="label">
        {{ computedLabel }}
      </slot>
    </span>
  </label>
</template>

<script>

export default {
  name: 'va-radio',
  props: {
    value: {},
    option: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
  computed: {
    computedClass () {
      return {
        'va-radio--disabled': this.disabled,
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

  &--disabled {
    cursor: default;
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

    .va-radio--disabled & {
      opacity: 0.4;
    }
  }

}

</style>
