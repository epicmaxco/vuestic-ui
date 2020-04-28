import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
export const SelectableMixin = {
  mixins: [
    FormComponentMixin,
    ColorThemeMixin,
    StatefulMixin,
    ContextPluginMixin,
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
      return this.modelIsArray ? this.value.includes(this.arrayValue) : this.value === this.trueValue
    },
    isFalse () {
      return this.modelIsArray ? !this.value.includes(this.arrayValue) : this.value === this.falseValue
    },
    isChecked () {
      return this.modelIsArray ? this.value && this.value.includes(this.c_arrayValue) : this.value
    },
    modelIsArray () {
      return Array.isArray(this.value)
    },
  },
}
