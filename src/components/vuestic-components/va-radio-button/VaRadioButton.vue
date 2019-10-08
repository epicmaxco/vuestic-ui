<template>
  <label
    class="va-radio-button"
    :class="computedClass"
    @click="onClick"
    @focus="focused = true"
    @mouseout="focused = false"
    @blur="focused = false"
  >
    <input
      :checked="isActive" type="radio" class="va-radio-button__input"
      :disabled="disabled"
    />
    <span class="va-radio-button__icon"></span>
    <span class="va-radio-button__text">
      <slot name="label">
        {{ computedLabel }}
      </slot>
    </span>
  </label>
</template>

<script>

export default {
  name: 'va-radio-button',
  props: {
    value: {},
    option: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
  data () {
    return {
      isFocused: false,
    }
  },
  computed: {
    computedClass () {
      return {
        'va-radio-button--active': this.isActive,
        'va-radio-button--disabled': this.disabled,
        'va-radio-button--on-focus': this.focused,
      }
    },
    focused: {
      set (isFocused) {
        if (!this.disabled) {
          this.isFocused = isFocused
        }
      },
      get () {
        return this.isFocused
      },
    },
    computedLabel () {
      if (!this.label) {
        return this.option
      }
      return this.label
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

.va-radio-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.va-radio-button--on-focus {
  background-color: $light-gray;
  transition: all, 0.6s, ease-in;
  border-radius: 3rem;
}

.va-radio-button__input {
  width: 0;
  height: 0;
  position: absolute;
  left: -100px;
  top: -100px;
  opacity: 0;
  z-index: -1;
}

.va-radio-button__icon {
  display: inline-flex;
  align-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 100%;
  border: $gray solid 0.125rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    right: 0.25rem;
    bottom: 0.25rem;
    background-color: $brand-success;
    border-radius: 100%;
    opacity: 0;

    .va-radio-button__input:checked + & {
      opacity: 1
    }
  }

  .va-radio-button__input:focus + & {
    border-color: red;
  }

  .va-radio-button__input:checked + & {
    border-color: $brand-success;
  }

  .va-radio-button--disabled & {
    opacity: 0.4;
  }
}

.va-radio-button__text {
  display: inline-flex;
  margin-left: 0.5rem;
}

</style>
