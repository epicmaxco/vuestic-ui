<template>
  <va-input-wrapper
    :class="wrapperClass"
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
      :class="containerClass"
      :style="computedBorderColorStyle"
    >
      <div
        v-if="$slots.prependInner"
        class="va-input__container__prepend-inner"
        @click="onPrependInnerClick"
      >
        <slot name="prependInner" />
      </div>

      <div class="va-input__container__content-wrapper" @click="focus()">
        <div class="va-input__container__content">
          <label
            aria-hidden="true"
            class="va-input__container__label"
            :style="labelStyle"
          >
            {{ label }}
          </label>
          <input
            v-if="!isTextarea"
            v-on="eventListeners"
            v-bind="computedInputAttributes"
            ref="input"
          />
          <textarea
            v-else
            v-on="eventListeners"
            v-bind="computedInputAttributes"
            ref="textarea"
            :tabindex="tabindex"
          />
        </div>
      </div>

      <div v-if="showIcon" class="va-input__container__icons">
        <va-icon
          v-if="success"
          color="success"
          name="check_circle"
          size="small"
        />
        <va-icon
          v-if="computedError"
          color="danger"
          name="warning"
          size="small"
        />
        <va-icon
          v-if="canBeCleared"
          @click.stop="reset()"
          :color="clearIconColor"
          name="highlight_off"
          size="small"
        />
      </div>

      <div
        v-if="$slots.appendInner"
        @click="onAppendInnerClick"
        class="va-input__container__append-inner"
      >
        <slot name="appendInner" />
      </div>
    </div>

    <div
      v-if="bordered"
      class="va-input_bordered__border"
      :style="computedBorderColorStyle"
    />

    <template #append v-if="$slots.append">
      <slot name="append" />
    </template>
  </va-input-wrapper>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import VaInputWrapper from '../va-input/VaInputWrapper'
import VaIcon from '../va-icon'

import { InputMixin } from './helpers/InputMixin'
import { TextareaMixin } from './helpers/TextareaMixin'

const InputProps = Vue.with(class InputProps {
  color = prop<string>({ type: String, default: 'primary' })
  placeholder = prop<string>({ type: String, default: '' })
  removable = prop<boolean>({ type: Boolean, default: false })
  tabindex = prop<number>({ type: Number, default: 0 })
  outline = prop({ type: Boolean, default: false })
  bordered = prop({ type: Boolean, default: false })
})

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
  InputProps,
) {
  isFocused = false

  get labelStyle (): any {
    return { color: this.colorComputed }
  }

  stateClassed (baseclass: string) {
    const classes = [baseclass]

    if (this.isTextarea) {
      classes.push(`${baseclass}_textarea`)
    }
    if (this.isFocused) {
      classes.push(`${baseclass}_focused`)
    }

    if (this.label) {
      classes.push(`${baseclass}_labeled`)
    }

    if (this.$props.outline) {
      classes.push(`${baseclass}_outline`)
    } else if (this.$props.bordered) {
      classes.push(`${baseclass}_bordered`)
    } else {
      classes.push(`${baseclass}_solid`)
    }

    if (this.$props.success) {
      classes.push(`${baseclass}_success`)
    }
    if (this.$props.error) {
      classes.push(`${baseclass}_error`)
    }

    return classes
  }

  get wrapperClass () {
    return this.stateClassed('va-input')
  }

  get containerClass () {
    return this.stateClassed('va-input__container')
  }

  get computedBorderColorStyle () {
    if (this.isFocused) {
      return {
        'border-color': this.colorComputed,
      }
    }

    return {}
  }

  get clearIconColor () {
    if (this.isFocused) {
      return this.colorComputed
    }

    if (this.computedError) {
      return 'danget'
    }

    if (this.success) {
      return 'success'
    }

    return 'grey'
  }

  get computedInputAttributes (): Record<string, any> {
    return {
      ...this.$attrs,
      id: this.id,
      name: this.name,
      type: this.type,
      placeholder: this.placeholder,
      disabled: this.disabled,
      readonly: this.readonly,
      tabindex: this.tabindex,
      style: this.$attrs.inputStyle, // Do not inherit style from $attrs
      class: ['va-input__container__input ', this.$attrs.inputClass || ''], // Do not inherit class from $attrs
      'aria-label': this.label,
      value: this.computedValue,
    }
  }

  /** @public */
  focus (): void {
    if (this.$refs.input) {
      (this as any).$refs.input.focus()
    } else if (this.$refs.textarea) {
      (this as any).$refs.textarea.focus()
    } else {
      throw new Error('There is no DOM element to focus')
    }
  }

  /** @public */
  reset (): void {
    this.$emit('update:modelValue', '')
  }
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';
@import 'variables';

.va-input {
  position: relative;

  &__container {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: var(--va-input-min-height);
    border-color: var(--va-input-color);
    border-style: solid;
    color: var(--va-input-text-color);
    overflow: hidden;
    border-width: var(--va-input-border-width);
    cursor: text;

    /* We have 3 styles and two states for each style separatly */
    &_solid {
      background: var(--va-input-color);
      border-color: var(--va-input-color);
      border-radius: var(--va-input-border-radius);

      &.va-input__container_success {
        background: var(--va-input-success-background);
        border-color: var(--va-input-success-color);
      }

      &.va-input__container_error {
        background: var(--va-input-error-background);
        border-color: var(--va-input-error-color);
      }
    }

    &_outline {
      border-radius: 0;
      border-color: var(--va-input-bordered-color);

      &.va-input__container_success {
        background: var(--va-input-success-background);
        border-color: var(--va-input-success-color);
      }

      &.va-input__container_error {
        background: var(--va-input-error-background);
        border-color: var(--va-input-error-color);
      }
    }

    &_bordered {
      background: var(--va-input-color);
      border-top-left-radius: var(--va-input-border-radius);
      border-top-right-radius: var(--va-input-border-radius);
      border-color: transparent !important;

      &.va-input__container_success {
        background: var(--va-input-success-background);
      }

      &.va-input__container_error {
        background: var(--va-input-error-background);
      }
    }

    /* styles end */

    // Creates gap between prepend, content, validation icons, append
    & > * {
      padding-right: var(--va-input-content-items-gap);
      line-height: 0;

      &:last-child {
        padding-right: var(--va-input-content-horizontal-padding);
      }

      &:first-child {
        padding-left: var(--va-input-content-horizontal-padding);
      }
    }

    &__content-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &__content {
      width: 100%;
    }

    .va-input__container__input {
      transform: translateY(-1px);
    }

    &_labeled {
      .va-input__container__content {
        position: relative;

        &-wrapper {
          height: 100%;
          align-items: flex-end;
        }
      }

      .va-input__container__label {
        height: 12px;
        position: absolute;
        left: 0;
        top: 0;
        max-width: var(--va-input-container-label-max-width);
        color: var(--va-input-container-label-color);
        font-size: var(--va-input-container-label-font-size);
        letter-spacing: var(--va-input-container-label-letter-spacing, var(--va-letter-spacing));
        line-height: var(--va-input-container-label-line-height);
        font-weight: var(--va-input-container-label-font-weight);
        text-transform: var(--va-input-container-label-text-transform);
        transform: translateY(-100%);

        @include va-ellipsis();

        transform-origin: top left;
      }
    }

    &__icons {
      display: flex;
      align-items: center;
      justify-content: center;

      & > * {
        margin-right: calc(var(--va-input-content-items-gap) / 4);

        &:last-child {
          margin-right: 0;
        }
      }
    }

    input,
    textarea {
      width: 100%;
      color: var(--va-input-text-color);
      background-color: transparent;
      border-style: none;
      outline: none;
      line-height: var(--va-input-line-height);
      font-size: var(--va-input-font-size);
      font-family: var(--va-input-font-family, var(--va-font-family));
      font-weight: var(--va-input-font-weight);
      font-style: var(--va-input-font-style);
      font-stretch: var(--va-input-font-stretch);
      letter-spacing: var(--va-input-letter-spacing);

      @include va-scroll(var(--va-input-scroll-color));

      &::placeholder {
        color: var(--va-input-letter-placeholder-color);
      }

      &:disabled {
        opacity: var(--va-input-letter-disabled-opacity);
      }
    }
  }

  &_bordered {
    &__border {
      border-color: var(--va-input-bordered-color);
      position: absolute;
      height: 0;
      border-bottom-width: var(--va-input-border-width);
      border-bottom-style: solid;
      width: 100%;
      bottom: 0;
    }
  }

  &_success {
    .va-input_bordered__border { border-color: var(--va-input-success-color); }
  }

  &_error {
    .va-input_bordered__border { border-color: var(--va-input-error-color); }
  }
}
</style>
