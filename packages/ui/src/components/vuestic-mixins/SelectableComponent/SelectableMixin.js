import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { StatefulMixin } from '../StatefullMixin/StatefulMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-components/va-checkbox/KeyboardOnlyFocusMixin'
export const SelectableMixin = {
  mixins: [
    FormComponentMixin,
    ColorThemeMixin,
    StatefulMixin,
    KeyboardOnlyFocusMixin,
    makeContextablePropsMixin({
      arrayValue: { type: [String, Object], default: '' },
      label: { type: String, default: '' },
      leftLabel: { type: Boolean, default: false },
      trueValue: { default: true },
      falseValue: { default: false },
    }),
  ],
  created () {
    if (this.falseValue === this.trueValue) {
      throw new Error('Props trueValue and falseValue are the same')
    }
    this.isSelectableComponent = true
  },
  computed: {
    isTrue () {
      if (this.c_stateful) {
        return this.valueComputed
      }
      return this.modelIsArray
        ? this.value && this.value.includes(this.arrayValue)
        : this.value === this.trueValue
    },
    isFalse () {
      return this.modelIsArray
        ? !this.value && !this.value.includes(this.arrayValue)
        : this.value === this.falseValue
    },
    isChecked () {
      return this.modelIsArray
        ? this.value && this.value.includes(this.c_arrayValue)
        : this.value
    },
    modelIsArray () {
      return !!this.c_arrayValue
    },
  },
  methods: {
    /** @public */
    focus () {
      this.$refs.input.focus()
    },
    /** @public */
    reset () {
      this.$emit('input', false)
    },
    onFocus () {
      this.KeyboardOnlyFocusMixin_onFocus()

      this.$emit('focus')
    },
    onBlur (event) {
      if (this.$refs.input === event.target && !this.isElementRelated(event.relatedTarget)) {
        this.ValidateMixin_onBlur()
        this.isKeyboardFocused = false
        this.$emit('blur', event)
      }
    },
    isElementRelated (element) {
      return [this.$refs.label, this.$refs.container].includes(element)
    },
    clickWrapper () {
      if (this.isElementRelated(document.activeElement)) {
        this.$refs.input.focus()
        this.isKeyboardFocused = false
      }
      this.toggleSelection()
    },
    toggleSelection () {
      if (this.c_readonly || this.c_disabled || this.c_loading) {
        return
      }
      if (this.modelIsArray) {
        if (!this.value) {
          this.valueComputed = [this.c_arrayValue]
        } else if (this.value.includes(this.c_arrayValue)) {
          this.valueComputed = this.value.filter(option => option !== this.c_arrayValue)
        } else {
          this.valueComputed = this.value.concat(this.c_arrayValue)
        }
        return
      }
      if (this.isTrue) {
        this.valueComputed = this.falseValue
      } else if (this.isFalse) {
        this.valueComputed = this.trueValue
      } else {
        this.valueComputed = !this.c_value
      }
    },
  },
}
