import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { StatefulMixin } from '../StatefulMixin/StatefulMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { KeyboardOnlyFocusMixin } from '../KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

const componentProps = {
  arrayValue: { type: [String, Object], default: '' },
  label: { type: String, default: '' },
  leftLabel: { type: Boolean, default: false },
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminate: { type: Boolean, default: false },
  indeterminateValue: { type: [Boolean, Array, String, Object], default: null },
}

const PropsMixin = makeContextablePropsMixin(componentProps)

@Component
export class SelectableMixin extends Mixins(
  PropsMixin,
  ColorThemeMixin,
  StatefulMixin,
  FormComponentMixin,
  KeyboardOnlyFocusMixin,
) {
  created () {
    this.isSelectableComponent = true
    this.checkDuplicates()
  }

  get isChecked (): boolean {
    if (this.modelIsArray) {
      return this.c_value && this.c_value.includes(this.c_arrayValue)
    }
    return this.valueComputed === this.c_trueValue
  }

  get isIndeterminate (): boolean {
    return this.valueComputed === this.c_indeterminateValue
  }

  get modelIsArray (): boolean {
    return !!this.c_arrayValue
  }

  /** @public */
  focus (): void {
    (this as any).$refs.input.focus()
  }

  /** @public */
  reset (): void {
    this.$emit('input', false)
  }

  checkDuplicates (): void {
    // Just validating state values.
    const values = [this.c_falseValue, this.c_trueValue]
    if (this.c_indeterminate) {
      values.push(this.c_indeterminateValue)
    }
    const hasDuplicates = new Set(values).size !== values.length
    if (hasDuplicates) {
      throw new Error('falseValue, trueValue, indeterminateValue props should have strictly different values, which is not the case.')
    }
  }

  onFocus (): void {
    // @ts-ignore
    this.KeyboardOnlyFocusMixin_onFocus()
    this.$emit('focus')
  }

  onBlur (event: any): void {
    if (this.$refs.input === event.target && !this.isElementRelated(event.relatedTarget)) {
      this.ValidateMixin_onBlur()
      this.isKeyboardFocused = false
      this.$emit('blur', event)
    }
  }

  isElementRelated (element: any): boolean {
    return [this.$refs.label, this.$refs.container].includes(element)
  }

  onWrapperClick (): void {
    if (this.isElementRelated(document.activeElement)) {
      (this as any).$refs.input.focus()
      this.isKeyboardFocused = false
    }
    this.toggleSelection()
  }

  toggleSelection (): void {
    if (this.c_readonly || this.c_disabled || this.c_loading) {
      return
    }
    // For array access we pretend computedValue does not exist and use c_value + emit input directly.
    if (this.modelIsArray) {
      if (!this.c_value) {
        this.$emit('input', [this.c_arrayValue])
      } else if (this.c_value.includes(this.c_arrayValue)) {
        this.$emit('input', this.c_value.filter((option: any) => option !== this.c_arrayValue))
      } else {
        this.$emit('input', this.c_value.concat(this.c_arrayValue))
      }
      return
    }

    if (this.c_indeterminate) {
      if (this.isIndeterminate) {
        this.valueComputed = this.c_trueValue
      } else if (this.isChecked) {
        this.valueComputed = this.c_falseValue
      } else {
        // unchecked
        this.valueComputed = this.c_indeterminateValue
      }
      return
    }

    if (this.isChecked) {
      this.valueComputed = this.c_falseValue
    } else {
      this.valueComputed = this.c_trueValue
    }
  }
}
