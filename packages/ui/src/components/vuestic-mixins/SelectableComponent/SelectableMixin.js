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
    if (this.c_falseValue === this.c_trueValue) {
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
        ? this.c_value && this.c_value.includes(this.c_arrayValue)
        : this.c_value === this.c_trueValue
    },
    isFalse () {
      return this.modelIsArray
        ? !this.c_value && !this.c_value.includes(this.c_arrayValue)
        : this.c_value === this.c_falseValue
    },
    isChecked () {
      return this.modelIsArray
        ? this.c_value && this.value.includes(this.c_arrayValue)
        : this.c_value
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
      // For array access we pretend computedValue does not exist and use c_value + emit input directly.
      if (this.modelIsArray) {
        if (!this.c_value) {
          this.$emit('input', [this.c_arrayValue])
        } else if (this.c_value.includes(this.c_arrayValue)) {
          this.$emit('input', this.c_value.filter(option => option !== this.c_arrayValue))
        } else {
          this.$emit('input', this.c_value.concat(this.c_arrayValue))
        }
        return
      }
      if (this.isTrue) {
        this.valueComputed = this.c_falseValue
      } else if (this.isFalse) {
        this.valueComputed = this.c_trueValue
      } else {
        this.valueComputed = !this.c_value
      }
    },
  },
}
