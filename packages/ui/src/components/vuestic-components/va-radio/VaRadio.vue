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
  modelValue = prop<string | number | object | boolean>({
    type: [Object, String, Number, Boolean],
    default: null,
  })

  option = prop<string | number | object | boolean>({
    type: [Object, String, Number, Boolean],
    default: null,
  })

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
@import 'variables';

.va-radio {
  display: var(--va-radio-display);
  flex-direction: var(--va-radio-flex-direction);
  align-items: var(--va-radio-align-items);
  cursor: var(--va-radio-cursor);
  position: var(--va-radio-position);
  margin-top: var(--va-radio-margin-top);
  margin-right: var(--va-radio-margin-right);
  transition: var(--va-radio-transition, var(--primary-transition));

  & + & {
    margin-top: 0.5rem;
  }

  &--disabled {
    cursor: var(--va-radio-disabled-cursor);
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
    transition: var(--va-radio-icon-transition);
    display: var(--va-radio-icon-display);
    align-items: var(--va-radio-icon-align-items);
    width: var(--va-radio-icon-width);
    height: var(--va-radio-icon-height);
    border-radius: var(--va-radio-icon-border-radius);
    position: var(--va-radio-icon-position);
    border: var(--va-radio-icon-border);
    box-sizing: var(--va-radio-icon-box-sizing);

    .va-radio__input:disabled + & {
      @include va-disabled;
    }

    &__dot {
      transition: var(--va-radio-dot-transition, var(--primary-transition));
      position: var(--va-radio-dot-position);
      top: var(--va-radio-dot-top);
      left: var(--va-radio-dot-left);
      right: var(--va-radio-dot-right);
      bottom: var(--va-radio-dot-bottom);
      border-radius: var(--va-radio-dot-border-radius);
      background-color: var(--va-radio-dot-background-color);
      opacity: var(--va-radio-dot-opacity);

      .va-radio__input:checked + .va-radio__icon & {
        opacity: 1;
        top: 0.25rem;
        left: 0.25rem;
        right: 0.25rem;
        bottom: 0.25rem;
      }
    }

    &__background {
      transition: var(--va-radio-background-transition, var(--primary-transition));
      position: var(--va-radio-background-position);
      top: var(--va-radio-background-top);
      left: var(--va-radio-background-left);
      right: var(--va-radio-background-right);
      bottom: var(--va-radio-background-bottom);
      background-color: var(--va-radio-background-background-color);
      border-radius: var(--va-radio-background-border-radius);
      z-index: var(--va-radio-background-z-index);
      opacity: var(--va-radio-background-opacity);

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
    display: var(--va-radio-text-display);
    margin-left: var(--va-radio-text-margin-left);
    margin-right: var(--va-radio-text-margin-right);

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
