<template>
  <va-input-wrapper
    class="va-input"
    :disabled="c_disabled"
    :success="c_success"
    :messages="messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <slot
      name="prepend"
      slot="prepend"
    />
    <div
      class="va-input__container"
      :class="{'va-input__container--textarea': isTextarea}"
      :style="containerStyles"
    >
      <div
        class="va-input__container__content-wrapper"
        :style="{ paddingTop: c_label ? '' : '0'}"
      >
        <label
          :style="labelStyles"
          aria-hidden="true"
          class="va-input__container__label"
        >
          {{ label }}
        </label>
        <textarea
          :id="id"
          :name="name"
          v-if="isTextarea"
          class="va-input__container__input"
          :style="textareaStyles"
          :aria-label="c_label"
          :placeholder="c_placeholder"
          :disabled="c_disabled"
          :readonly="c_readonly"
          :value="c_value"
          v-on="inputListeners"
          v-bind="$attrs"
          ref="input"
          :tabindex="c_tabindex"
        />
        <input
          v-else
          :id="id"
          :name="name"
          class="va-input__container__input"
          :style="{ paddingBottom: c_label ? '0.125rem' : '0.875rem' }"
          :aria-label="c_label"
          :type="c_type"
          :placeholder="c_placeholder"
          :disabled="c_disabled"
          :readonly="c_readonly"
          :value="c_value"
          v-on="inputListeners"
          v-bind="$attrs"
          ref="input"
          :tabindex="c_tabindex"
        >
      </div>
      <div
        v-if="showIcon"
        class="va-input__container__icon-wrapper"
      >
        <va-icon
          v-if="c_success"
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
        <slot name="append" />
        <va-icon
          v-if="canBeCleared"
          @click.native="reset()"
          class="va-input__container__close-icon"
          :color="computedError ? 'danger': 'gray'"
          name="highlight_off"
        />
      </div>
    </div>
  </va-input-wrapper>
</template>

<script lang="ts">
import VaInputWrapper from '../va-input/VaInputWrapper.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { getHoverColor } from '../../../services/color-functions'
import calculateNodeHeight from './calculateNodeHeight'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'
import { warn } from '../../../services/utils'
import { Component, Mixins, Watch } from 'vue-property-decorator'

const InputPropsMixin = makeContextablePropsMixin({
  color: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  removable: { type: Boolean, default: false },
  tabindex: { type: Number, default: 0 },

  // textarea-specific
  autosize: { type: Boolean, default: false },
  minRows: {
    type: Number,
    default: null,
    validator: (val: number) => {
      if (!(val > 0 && (val | 0) === val)) {
        return warn(`\`minRows\` must be a positive integer greater than 0, but ${val} is provided`)
      }
      return true
    },
  },
  maxRows: {
    type: Number,
    validator: (val: number) => {
      if (!(val > 0 && (val | 0) === val)) {
        return warn(`\`minRows\` must be a positive integer greater than 0, but ${val} is provided`)
      }
      return true
    },
    default: null,
  },
})

@Component({
  name: 'VaInput',
  components: { VaInputWrapper, VaIcon },
})
export default class VaInput extends Mixins(
  ColorThemeMixin,
  FormComponentMixin,
  InputPropsMixin,
) {
  isFocused = false

  mounted (): void {
    this.adjustHeight()
  }

  @Watch('value')
  onValueChanged (): void {
    this.adjustHeight()
  }

  get labelStyles (): any {
    if (this.computedError) {
      return { color: this.computeColor('danger') }
    }

    if (this.c_success) {
      return { color: this.computeColor('success') }
    }

    return { color: this.colorComputed }
  }

  get containerStyles (): any {
    return {
      backgroundColor:
        this.computedError ? (this.computeColor('danger') ? getHoverColor(this.computeColor('danger')) : '')
          : this.c_success ? (this.computeColor('success') ? getHoverColor(this.computeColor('success')) : '') : '#f5f8f9',
      borderColor:
        this.computedError ? this.computeColor('danger')
          : this.c_success ? this.computeColor('success')
            : this.isFocused ? this.computeColor('dark') : this.computeColor('gray'),
    }
  }

  get textareaStyles (): any {
    return {
      paddingBottom: this.label ? '0.125rem' : '',
      marginTop: this.label ? '0.875rem' : '',
      paddingTop: this.label ? 0 : '',
      minHeight: this.label ? '1.5rem' : '2.25rem',
      marginBottom: 0,
    }
  }

  get inputListeners () {
    return {
      ...this.$listeners,
      input: this.onInput,
      click: this.onClick,
      focus: this.onFocus,
      blur: this.onBlur,
      keyup: this.onKeyup,
      keydown: this.onKeydown,
    }
  }

  get showIcon (): boolean {
    return this.c_success || this.computedError || this.$slots.append || this.canBeCleared
  }

  get canBeCleared (): boolean {
    return this.hasContent && this.c_removable
  }

  get hasContent (): boolean {
    return ![null, undefined, ''].includes(this.c_value)
  }

  get isTextarea (): boolean {
    return this.c_type === 'textarea'
  }

  onInput (event: any): void {
    this.$emit('input', event.target.value)
  }

  onClick (event: Event): void {
    this.$emit('click', event)
  }

  onFocus (event: Event): void {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    this.isFocused = true

    this.$emit('focus', event)
  }

  onBlur (event: Event): void {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    this.ValidateMixin_onBlur()

    this.$emit('blur', event)
  }

  onKeyup (event: Event): void {
    this.$emit('keyup', event)
  }

  onKeydown (event: Event): void {
    this.$emit('keydown', event)
  }

  adjustHeight (): void {
    if (!this.autosize || !this.isTextarea) {
      return
    }

    const minRows = this.minRows || 1
    const maxRows = this.maxRows || Number.MAX_SAFE_INTEGER
    const textareaStyles = calculateNodeHeight(this.$refs.input, false, minRows, maxRows)

    // We modify DOM directly instead of using reactivity because the whole adjustHeight method takes place
    // each time the value of textarea is modified, so there's no real need in an additional layer of reactivity.
    // The operation is basically reactive though implicitly.
    Object.assign((this as any).$refs.input.style, textareaStyles)
  }

  /** @public */
  focus (): void {
    (this as any).$refs.input.focus()
  }

  /** @public */
  reset (): void {
    this.$emit('input', '')
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

      /* min-width: 100%; */
    }

    &__icon-wrapper {
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
      bottom: 0.875rem;
      left: 0.5rem;
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
      margin-bottom: 0.125rem;
      padding: 0.25rem 0.5rem;
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
        padding-bottom: 0.875rem;
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
