<template>
  <div
    class="va-radio-button"
    :class="computedClass"
    @click="onClick"
    @focus="focused = true"
    @mouseout="focused = false"
    @blur="focused = false"
  >
    <label class="va-radio-button__label">
      <input
        :checked="isActive" type="radio" class="va-radio-button__input"
        :disabled="disabled"
      />
      <span class="va-radio-button__icon" :style="computedStyle">
<!--          <span-->
<!--            class="va-radio-button__icon-circle"-->
<!--            :style="computedStyle"-->
<!--          />-->
      </span>
      <span>
        <slot name="label">
          {{ computedLabel }}
        </slot>
      </span>
    </label>
  </div>
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
    computedStyle () {
      if (this.isActive) {
        const borderColor = `${this.$themes.primary} '!important'`
        return { borderColor: borderColor }
      }
      return {}
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
  /*justify-content: center;*/

  &.active {
    background-color: $lighter-green;
  }
}

.va-radio-button__label {
  cursor: pointer;
  position: relative;
}

.va-radio-button--on-focus {
  background-color: $light-gray;
  transition: all, 0.6s, ease-in;
  border-radius: 3rem;
}

.va-radio-button__input {
  width: 1.375rem;
  height: 1.375rem;
  position: absolute;
  left: 0;
  right: 0;
}

.va-radio-button__icon {
  display: inline-flex;
  align-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 1.8rem;
  border: $gray solid 0.15rem;

  .va-radio-button--disabled & {
    opacity: 0.4;
  }
}

.va-radio-button__icon-circle {
  .va-radio-button--active & {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 1rem;
    border: solid 0.35rem;
    margin-left: 0.1875rem;
  }
}

</style>
