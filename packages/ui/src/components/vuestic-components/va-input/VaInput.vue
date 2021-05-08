<template>
  <va-input-wrapper
    class="va-input"
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
    <template
      v-if="$slots.prepend"
      #prepend
    >
      <slot name="prepend" />
    </template>

    <div
      class="va-input__container"
      :style="computedBorderColorStyle"
    >
      <div
        v-if="$slots.prependInner"
        class="va-input__prepend-inner"
        @click="onPrependInnerClick"
      >
        <slot name="prependInner" />
      </div>

      <div
        class="va-input__content-wrapper"
        @click="focus()"
      >
        <div class="va-input__content">
          <label
            aria-hidden="true"
            class="va-input__label"
            :style="labelStyle"
          >
            {{ label }}
          </label>

          <div
            v-if="$slots.content"
            class="va-input__content__input"
          >
            <slot
              name="content"
              v-bind="{ value: computedValue, focus }"
            />
          </div>
          <textarea
            v-else-if="isTextarea"
            v-bind="computedInputAttributes"
            ref="textarea"
            class="va-input__content__input"
            :tabindex="tabindex"
            v-on="eventListeners"
          />
          <input
            v-else
            v-bind="computedInputAttributes"
            ref="input"
            class="va-input__content__input"
            v-on="eventListeners"
          >
        </div>
      </div>

      <div
        v-if="showIcon"
        class="va-input__icons"
      >
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
          name="highlight_off"
          size="small"
          :color="clearIconColor"
          @click.stop="reset()"
        />
        <va-icon
          v-if="loading"
          name="loop"
          size="small"
          spin="counter-clockwise"
          :color="colorComputed"
        />
      </div>

      <div
        v-if="$slots.appendInner"
        class="va-input__append-inner"
        @click="onAppendInnerClick"
      >
        <slot name="appendInner" />
      </div>
    </div>

    <div
      v-if="bordered"
      class="va-input_bordered__border"
      :style="computedBorderColorStyle"
    />

    <template
      v-if="$slots.append"
      #append
    >
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
    'click-append', 'click-append-inner', 'focus', 'blur', 'keyup', 'keydown', 'click', 'cleared'],
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

  stateClasses (baseclass: string) {
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
    return this.stateClasses('va-input')
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
      return 'danger'
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
      // Do not inherit style from $attrs
      style: this.$attrs.inputStyle,
      // Do not inherit class from $attrs
      class: this.$attrs.inputClass,
      value: this.computedValue,
      'aria-label': this.label,
    }
  }

  /** @public */
  focus (): void {
    if (this.$refs.input) {
      (this as any).$refs.input.focus()
    } else if (this.$refs.textarea) {
      (this as any).$refs.textarea.focus()
    } else if (!this.$slots.content) {
      throw new Error('There is no DOM element to focus')
    }
  }

  /** @public */
  reset (): void {
    this.$emit('update:modelValue', '')
    this.$emit('cleared')
  }
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';
@import 'variables';

.va-input {
  position: relative;
  display: flex;
  align-items: center;

  &__container {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    min-height: var(--va-input-min-height);
    border-color: var(--va-input-color);
    border-style: solid;
    border-width: var(--va-input-border-width);
    color: var(--va-input-text-color);
    overflow: hidden;
    cursor: text;
    padding: 0 var(--va-input-content-horizontal-padding);

    /* Creates gap between prepend, content, validation icons, append */
    & > * {
      padding-right: var(--va-input-content-items-gap);
      line-height: 0;

      &:last-child {
        padding-right: 0;
      }
    }
  }

  &__content-wrapper {
    display: flex;
    align-items: center;
    width: 100%;

    .va-input__content {
      width: 100%;
      position: relative;

      &__input {
        @include va-scroll(var(--va-input-scroll-color));

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
        transform: translateY(-1px);

        &::placeholder {
          color: var(--va-input-placeholder-text-color);
        }

        &:disabled {
          opacity: var(--va-input-disabled-opacity);
        }
      }
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

  &_labeled {
    .va-input__content-wrapper {
      padding-top: 12px;
      height: 100%;
      align-items: flex-end;
    }

    .va-input__label {
      @include va-ellipsis();

      height: 12px;
      transform: translateY(-100%);
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      padding-top: 1px;
      max-width: var(--va-input-container-label-max-width);
      color: var(--va-input-container-label-color);
      font-size: var(--va-input-container-label-font-size);
      letter-spacing: var(--va-input-container-label-letter-spacing, var(--va-letter-spacing));
      line-height: var(--va-input-container-label-line-height);
      font-weight: var(--va-input-container-label-font-weight);
      text-transform: var(--va-input-container-label-text-transform);
      transform-origin: top left;
    }
  }

  /* We have 3 styles and two states for each style separatly */
  &_solid {
    .va-input__container {
      background: var(--va-input-color);
      border-color: var(--va-input-color);
      border-radius: var(--va-input-border-radius);
    }

    &.va-input_success {
      .va-input__container {
        background: var(--va-input-success-background);
        border-color: var(--va-input-success-color);
      }
    }

    &.va-input_error {
      .va-input__container {
        background: var(--va-input-error-background);
        border-color: var(--va-input-error-color);
      }
    }
  }

  &_outline {
    .va-input__container {
      border-radius: 0;
      border-color: var(--va-input-bordered-color);
    }

    &.va-input_success {
      .va-input__container {
        background: var(--va-input-success-background);
        border-color: var(--va-input-success-color);
      }
    }

    &.va-input_error {
      .va-input__container {
        background: var(--va-input-error-background);
        border-color: var(--va-input-error-color);
      }
    }
  }

  &_bordered {
    /*
      We can not just set border-bottom, becouse we also have border on the other sides.
      We also can not use after or before, becouse we need to set border-color according to
      color prop
    */
    &__border {
      border-color: var(--va-input-bordered-color);
      position: absolute;
      height: 0;
      border-bottom-width: var(--va-input-border-width);
      border-bottom-style: solid;
      width: 100%;
      bottom: 0;
    }

    .va-input__container {
      background: var(--va-input-color);
      border-top-left-radius: var(--va-input-border-radius);
      border-top-right-radius: var(--va-input-border-radius);
      border-color: transparent !important;
    }

    &.va-input_success {
      .va-input__container {
        background: var(--va-input-success-background);
      }

      .va-input_bordered__border {
        border-color: var(--va-input-success-color);
      }
    }

    &.va-input_error {
      .va-input__container {
        background: var(--va-input-error-background);
      }

      .va-input_bordered__border {
        border-color: var(--va-input-error-color);
      }
    }
  }
}
</style>
