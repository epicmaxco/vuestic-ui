import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
export const SelectableMixin = {
  mixins: [
    makeContextablePropsMixin({
      arrayValue: { type: [String, Object], default: '' },
      label: { type: String, default: '' },
      leftLabel: { type: Boolean, default: false },
      trueValue: { default: false },
      falseValue: { default: false },
    }),
  ],
  created () {
    if (this.falseValue === this.trueValue) {
      throw new Error('Props trueValue and falseValue are the same')
    }
  },
}
