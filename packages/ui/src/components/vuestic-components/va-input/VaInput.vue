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
    <template #prepend>
      <slot
        name="prepend"
      />
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
          v-bind="$attrs"
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
          v-bind="$attrs"
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
    <template #append>
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

  get containerStyles (): any {
    return {
      backgroundColor:
        this.computedError ? (this.computeColor('danger') ? getHoverColor(this.computeColor('danger')) : '')
          : this.success ? (this.computeColor('success') ? getHoverColor(this.computeColor('success')) : '') : '#f5f8f9',
      borderColor:
        this.computedError ? this.computeColor('danger')
          : this.success ? this.computeColor('success')
            : this.isFocused ? this.computeColor('dark') : this.computeColor('gray'),
    }
  }
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';

.va-input {
  &__container {
    display: flex;
    position: relative;
    width: 100%;
    min-height: 2.375rem;
    border-style: solid;
    border-width: 0 0 thin 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    &__content-wrapper {
      display: flex;
      align-items: flex-end;
      width: 100%;
      padding: 0 0.5rem;

      /* min-width: 100%; */
    }

    &__icon-wrapper {
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
    }

    &__prepend-inner {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
    }

    &__append-inner {
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
    }

    &__close-icon {
      cursor: pointer;
      margin-left: 0.25rem;
    }

    &__label {
      position: absolute;

      /* bottom: 0.875rem; */
      top: 0.125rem;

      /* left: 0.5rem; */
      margin-bottom: 0.5rem;
      max-width: calc(100% - 0.75rem);
      color: $vue-green;
      font-size: 0.625rem;
      letter-spacing: 0.0375rem;
      line-height: 1.2;
      font-weight: $font-weight-bold;
      text-transform: uppercase;

      @include va-ellipsis();

      transform-origin: top left;
    }

    &.va-input__container--textarea &__label {
      bottom: auto;
      top: 0.125rem;
    }

    &__input {
      width: 100%;
      height: 1.5rem;

      /* margin-bottom: 0.125rem; */

      /* padding: 0.25rem 0.5rem; */
      color: #34495e;
      background-color: transparent;
      border-style: none;
      outline: none;
      font-size: 1rem;
      font-family: $font-family-sans-serif;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: normal;

      &::placeholder {
        color: $brand-secondary;
      }

      &:placeholder-shown {
        /* padding-bottom: 0.875rem; */

        /* margin-bottom: 0.125rem; */
      }

      &:disabled {
        opacity: 0.4;
      }
    }

    &.va-input__container--textarea &__input {
      resize: vertical;
      height: inherit;
    }
  }
}
</style>
