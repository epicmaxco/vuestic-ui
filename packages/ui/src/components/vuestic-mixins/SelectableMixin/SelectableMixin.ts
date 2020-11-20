import { Component, Mixins, Prop } from 'vue-property-decorator'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { StatefulMixin } from '../StatefulMixin/StatefulMixin'
import { ColorThemeMixin } from '../ColorMixin'
import { KeyboardOnlyFocusMixin } from '../KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { LoadingMixin } from '../LoadingMixin/LoadingMixin'

@Component
export class SelectableMixin extends Mixins(
  ColorThemeMixin,
  StatefulMixin,
  FormComponentMixin,
  KeyboardOnlyFocusMixin,
  LoadingMixin,
) {
  @Prop({ type: [String, Object], default: '' }) arrayValue!: string | object
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, default: false }) leftLabel!: boolean
  @Prop({ type: Boolean, default: true }) trueValue!: boolean
  @Prop({ type: Boolean, default: false }) falseValue!: boolean
  @Prop({ type: Boolean, default: false }) indeterminate!: boolean
  @Prop({ type: [Boolean, Array, String, Object], default: null }) indeterminateValue?: boolean | any[] | string | object

  // @ts-ignore
  setup (props) {
    const checkDuplicates = (): void => {
      // Just validating state values.
      const values = [props.falseValue, props.trueValue]
      if (props.indeterminate) {
        values.push(props.indeterminateValue)
      }
      const hasDuplicates = new Set(values).size !== values.length
      if (hasDuplicates) {
        throw new Error('falseValue, trueValue, indeterminateValue props should have strictly different values, which is not the case.')
      }
    }

    checkDuplicates()

    return {
      isSelectableComponent: true,
    }
  }

  get isChecked (): boolean {
    if (this.modelIsArray) {
      return this.value && this.value.includes(this.arrayValue)
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
  focus (): void {
    (this as any).$refs.input.focus()
  }

  /** @public */
  reset (): void {
    this.$emit('input', false)
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
    if (this.readonly || this.disabled || this.loading) {
      return
    }
    // For array access we pretend computedValue does not exist and use value + emit input directly.
    if (this.modelIsArray) {
      if (!this.value) {
        this.$emit('input', [this.arrayValue])
      } else if (this.value.includes(this.arrayValue)) {
        this.$emit('input', this.value.filter((option: any) => option !== this.arrayValue))
      } else {
        this.$emit('input', this.value.concat(this.arrayValue))
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
        // @ts-ignore
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
