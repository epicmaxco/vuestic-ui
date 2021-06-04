import { mixins, Options, prop, setup, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { StatefulMixin } from '../StatefulMixin/StatefulMixin'
import { LoadingMixin } from '../LoadingMixin/LoadingMixin'

class Props {
  arrayValue = prop<string | Record<string, unknown>>({ type: [String, Object], default: '' })
  label = prop<string>({ type: String, default: '' })
  leftLabel = prop<boolean>({ type: Boolean, default: false })
  trueValue = prop({ default: true })
  falseValue = prop({ default: false })
  indeterminate = prop<boolean>({ type: Boolean, default: false })
  indeterminateValue = prop<boolean | any[] | string | Record<string, unknown>>({
    type: [Boolean, Array, String, Object],
    default: null,
  })
}

const PropsMixin = Vue.with(Props)

@Options({
  emits: ['update:modelValue', 'focus', 'blur'],
})
export class SelectableMixin extends mixins(
  ColorMixin,
  StatefulMixin,
  FormComponentMixin,
  LoadingMixin,
  PropsMixin,
) {
  isSelectableComponent!: boolean

  created () {
    this.isSelectableComponent = true
    this.checkDuplicates()
  }

  get isChecked (): boolean {
    if (this.modelIsArray) {
      return this.modelValue && this.modelValue.includes(this.arrayValue)
    }
    return this.valueComputed === this.trueValue
  }

  get isIndeterminate (): boolean {
    return this.valueComputed === this.indeterminateValue
  }

  get modelIsArray (): boolean {
    return !!this.arrayValue
  }

  /** @public */
  reset (): void {
    this.$emit('update:modelValue', false)
  }

  checkDuplicates (): void {
    // Just validating state values.
    const values: any[] = [this.falseValue, this.trueValue]
    if (this.indeterminate) {
      values.push(this.indeterminateValue)
    }
    const hasDuplicates = new Set(values).size !== values.length
    if (hasDuplicates) {
      throw new Error('falseValue, trueValue, indeterminateValue props should have strictly different values, which is not the case.')
    }
  }

  onFocus (event: FocusEvent): void {
    this.$emit('focus', event)
  }

  onBlur (event: FocusEvent): void {
    if (this.$refs.input === event.target && !this.isElementRelated(event.relatedTarget)) {
      this.ValidateMixin_onBlur()
      this.$emit('blur', event)
    }
  }

  isElementRelated (element: any): boolean {
    return [this.$refs.label, this.$refs.container].includes(element)
  }

  onWrapperClick (): void {
    this.toggleSelection()
  }

  toggleSelection (): void {
    if (this.readonly || this.disabled || this.loading) {
      return
    }
    // For array access we pretend computedValue does not exist and use modelValue + emit input directly.
    if (this.modelIsArray) {
      if (!this.modelValue) {
        this.$emit('update:modelValue', [this.arrayValue])
      } else if (this.modelValue.includes(this.arrayValue)) {
        this.$emit('update:modelValue', this.modelValue.filter((option: any) => option !== this.arrayValue))
      } else {
        this.$emit('update:modelValue', this.modelValue.concat(this.arrayValue))
      }
      return
    }

    if (this.indeterminate) {
      if (this.isIndeterminate) {
        this.valueComputed = this.trueValue
      } else if (this.isChecked) {
        this.valueComputed = this.falseValue
      } else {
        // unchecked
        this.valueComputed = this.indeterminateValue
      }
      return
    }

    if (this.isChecked) {
      this.valueComputed = this.falseValue
    } else {
      this.valueComputed = this.trueValue
    }
  }
}
