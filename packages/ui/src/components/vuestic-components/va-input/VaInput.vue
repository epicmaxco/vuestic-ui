<template>
  <va-input-wrapper
    class="va-input"
    :disabled="disabled"
    :success="success"
    :messages="messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
    @click:prepend="onPrependClick"
    @click:append="onAppendClick"
  >
    <template #prepend v-if="$slots.prepend">
      <slot name="prepend" />
    </template>

    <div
      class="va-input__container"
      :class="{'va-input__container--textarea': isTextarea}"
      :style="containerStyles"
    >
      <div
        v-if="$slots.prependInner"
        @click="onPrependInnerClick"
        class="va-input__container__prepend-inner"
      >
        <slot name="prependInner" />
      </div>
      <div
        class="va-input__container__content-wrapper"
        :style="{ alignItems: label ? 'flex-end' : 'center'}"
      >
        <label
          :style="labelStyles"
          aria-hidden="true"
          class="va-input__container__label"
        >
          {{ label }}
        </label>
        <input
          v-if="!isTextarea"
          :id="id"
          :name="name"
          class="va-input__container__input"
          :aria-label="label"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :value="computedValue"
          v-on="eventListeners"
          v-bind="computedAttributes"
          ref="input"
          :tabindex="tabindex"
        />
        <textarea
          v-else
          :id="id"
          :name="name"
          class="va-input__container__input"
          :style="textareaStyles"
          :aria-label="label"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :value="modelValue"
          v-on="eventListeners"
          v-bind="computedAttributes"
          ref="textarea"
          :tabindex="tabindex"
        />
      </div>
      <div
        v-if="$slots.appendInner"
        @click="onAppendInnerClick"
        class="va-input__container__append-inner"
      >
        <slot name="appendInner" />
      </div>
      <div
        v-if="showIcon"
        class="va-input__container__icon-wrapper"
      >
        <va-icon
          v-if="success"
          class="va-input__container__icon"
          color="success"
          name="check"
        />
        <va-icon
          v-if="computedError"
          class="va-input__container__icon"
          color="danger"
          name="warning"
        />
        <va-icon
          v-if="canBeCleared"
          @click.stop="reset()"
          class="va-input__container__close-icon"
          :color="computedError ? 'danger': 'gray'"
          name="highlight_off"
        />
      </div>
    </div>
    <template #append v-if="$slots.append">
      <slot
        name="append"
      />
    </template>
  </va-input-wrapper>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import { getHoverColor } from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import VaInputWrapper from '../va-input/VaInputWrapper'
import VaIcon from '../va-icon'

import { InputMixin } from './helpers/InputMixin'
import { TextareaMixin } from './helpers/TextareaMixin'

class InputProps {
  color = prop<string>({ type: String, default: '' })
  placeholder = prop<string>({ type: String, default: '' })
  removable = prop<boolean>({ type: Boolean, default: false })
  tabindex = prop<number>({ type: Number, default: 0 })
}

const InputPropsMixin = Vue.with(InputProps)

@Options({
  name: 'VaInput',
  components: { VaInputWrapper, VaIcon },
  emits: ['update:modelValue', 'change', 'click-prepend', 'click-prepend-inner',
    'click-append', 'click-append-inner', 'focus', 'blur', 'keyup', 'keydown', 'click'],
})
export default class VaInput extends mixins(
  ColorMixin,
  InputMixin,
  TextareaMixin,
  InputPropsMixin,
) {
  get labelStyles (): any {
    if (this.computedError) {
      return { color: this.computeColor('danger') }
    }

    if (this.success) {
      return { color: this.computeColor('success') }
    }

    return { color: this.colorComputed }
  }

  get computedAttributes () {
    return { ...this.$attrs, class: this.$attrs.inputClass }
  }

  get containerStyles (): any {
    return {
      backgroundColor:
        this.computedError
          ? (this.computeColor('danger') ? getHoverColor(this.computeColor('danger')) : '')
          : this.success ? (this.computeColor('success') ? getHoverColor(this.computeColor('success')) : '') : '#f5f8f9',
      borderColor:
        this.computedError
          ? this.computeColor('danger')
          : this.success
            ? this.computeColor('success')
            : this.isFocused ? this.computeColor('dark') : this.computeColor('gray'),
    }
  }
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';
@import 'variables';

.va-input {
  &__container {
    display: var(--va-input-container-display);
    position: var(--va-input-container-position);
    width: var(--va-input-container-width);
    min-height: var(--va-input-container-min-height);
    border-style: var(--va-input-container-border-style);
    border-width: var(--va-input-container-border-width);
    border-top-left-radius: var(--va-input-container-border-top-left-radius);
    border-top-right-radius: var(--va-input-container-border-top-right-radius);

    &__content-wrapper {
      display: var(--va-input-container-content-wrapper-display);
      align-items: var(--va-input-container-content-wrapper-align-items);
      width: var(--va-input-container-content-wrapper-width);
      padding: var(--va-input-container-content-wrapper-padding);

      /* min-width: 100%; */
    }

    &__icon-wrapper {
      display: var(--va-input-container-icon-wrapper-display);
      align-items: var(--va-input-container-icon-wrapper-align-items);
      margin-right: var(--va-input-container-icon-wrapper-margin-right);
    }

    &__prepend-inner {
      display: var(--va-input-container-prepend-inner-display);
      align-items: var(--va-input-container-prepend-inner-align-items);
      margin-left: var(--va-input-container-prepend-inner-margin-left);
    }

    &__append-inner {
      display: var(--va-input-container-prepend-inner-display);
      align-items: var(--va-input-container-prepend-inner-align-items);
      margin-right: var(--va-input-container-append-inner-margin-right);
    }

    &__close-icon {
      cursor: var(--va-input-container-close-icon-cursor);
      margin-left: var(--va-input-container-close-icon-margin-left);
    }

    &__label {
      position: var(--va-input-container-label-position);

      /* bottom: 0.875rem; */
      top: var(--va-input-container-label-top);

      /* left: 0.5rem; */
      margin-bottom: var(--va-input-container-label-margin-bottom);
      max-width: var(--va-input-container-label-max-width);
      color: var(--va-input-container-label-color);
      font-size: var(--va-input-container-label-font-size);
      letter-spacing: var(--va-input-container-label-letter-spacing, var(--primary-letter-spacing));
      line-height: var(--va-input-container-label-line-height);
      font-weight: var(--va-input-container-label-font-weight);
      text-transform: var(--va-input-container-label-text-transform);

      @include va-ellipsis();

      transform-origin: top left;
    }

    &.va-input__container--textarea &__label {
      bottom: auto;
      top: 0.125rem;
    }

    input,
    textarea {
      width: var(--va-input-width);
      height: var(--va-input-height);

      /* margin-bottom: 0.125rem; */

      /* padding: 0.25rem 0.5rem; */
      color: var(--va-input-color);
      background-color: var(--va-input-background-color);
      border-style: var(--va-input-border-style);
      outline: var(--va-input-outline);
      font-size: var(--va-input-font-size);
      font-family: var(--va-input-font-family, var(--primary-font-family));
      font-weight: var(--va-input-font-weight);
      font-style: var(--va-input-font-style);
      font-stretch: var(--va-input-font-stretch);
      line-height: var(--va-input-line-height);
      letter-spacing: var(--va-input-letter-spacing);

      &::placeholder {
        color: var(--va-input-letter-placeholder-color);
      }

      &:placeholder-shown {
        /* padding-bottom: 0.875rem; */

        /* margin-bottom: 0.125rem; */
      }

      &:disabled {
        opacity: var(--va-input-letter-disabled-opacity);
      }
    }

    &.va-input__container--textarea &__input {
      resize: vertical;
      height: inherit;
    }
  }
}
</style>
