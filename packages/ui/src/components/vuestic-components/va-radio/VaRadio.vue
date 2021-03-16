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
      :tabindex="tabindex"
    >

    <span
      class="va-radio__icon"
      :style="iconComputedStyles"
    >
      <span
        class="va-radio__icon__background"
        :style="iconBackgroundComputedStyles"
      />
      <span
        class="va-radio__icon__dot"
        :style="iconDotComputedStyles"
      />
    </span>

    <span class="va-radio__text">
      <slot>
        {{ computedLabel }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { Options, mixins, Vue, prop } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'

class RadioProps {
  modelValue = prop<string|number|object|boolean>({ type: [Object, String, Number, Boolean], default: null })
  option = prop<string|number|object|boolean>({ type: [Object, String, Number, Boolean], default: null })
  name = prop<string | number>({ type: [String, Number], default: '' })
  disabled = prop<boolean>({ type: Boolean, default: false })
  label = prop<string>({ type: String, default: '' })
  leftLabel = prop<boolean>({ type: Boolean, default: false })
  color = prop<string>({ type: String, default: '' })
  tabindex = prop<number>({ type: Number, default: 0 })
}

const RadioPropsMixin = Vue.with(RadioProps)

@Options({
  name: 'VaRadio',
  emits: ['update:modelValue', 'focus'],
})
export default class VaRadio extends mixins(
  ColorMixin,
  RadioPropsMixin,
) {
  get isActive () {
    return this.modelValue === this.option
  }

  get computedClass () {
    return {
      'va-radio--disabled': this.disabled,
      'va-radio--left-label': this.leftLabel,
    }
  }

  get iconBackgroundComputedStyles () {
    return {
      backgroundColor: this.colorComputed,
    }
  }

  get iconDotComputedStyles () {
    if (this.isActive) {
      return {
        borderColor: this.colorComputed,
        backgroundColor: this.colorComputed,
      }
    }
    return {}
  }

  get iconComputedStyles () {
    if (this.isActive) {
      return {
        borderColor: this.colorComputed,
      }
    }
    return {}
  }

  get computedLabel () {
    return this.label || this.option
  }

  onClick (e: Event) {
    if (!this.disabled) {
      this.$emit('update:modelValue', this.option, e)
    }
  }

  onFocus (e: Event) {
    if (!this.disabled) {
      this.$emit('focus', e)
    }
  }

  validate () {
    return null
  }

  clear () {
    this.$emit('update:modelValue', null)
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-radio {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-top: 0;
  margin-right: 0.5rem;
  transition: $transition-primary;

  & + & {
    margin-top: 0.5rem;
  }

  &--disabled {
    cursor: default;
  }

  &--left-label {
    flex-direction: row-reverse;
    display: inline-flex;

    & + & {
      margin-top: 0;
    }
  }

  &__input {
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -1;
  }

  &__icon {
    transition: $transition-primary;
    display: inline-flex;
    align-items: center;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 100%;
    position: relative;
    border: $gray solid 0.125rem;
    box-sizing: border-box;

    .va-radio__input:disabled + & {
      @include va-disabled;
    }

    &__dot {
      transition: $transition-primary;
      position: absolute;
      top: 50%;
      left: 50%;
      right: 50%;
      bottom: 50%;
      border-radius: 100%;
      background-color: inherit;
      opacity: 0;

      .va-radio__input:checked + .va-radio__icon & {
        opacity: 1;
        top: 0.25rem;
        left: 0.25rem;
        right: 0.25rem;
        bottom: 0.25rem;
      }
    }

    &__background {
      transition: $transition-primary;
      position: absolute;
      top: -0.35rem;
      left: -0.35rem;
      right: -0.35rem;
      bottom: -0.35rem;
      background-color: $gray;
      border-radius: 100%;
      z-index: 0;
      opacity: 0;

      .va-radio__input:focus + .va-radio__icon & {
        opacity: 0.2;
      }

      .va-radio:hover & {
        opacity: 0.2;
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
      @include va-disabled;
    }

    .va-radio--left-label & {
      margin-left: 0;
      margin-right: 0.5rem;
    }
  }
}

</style>
