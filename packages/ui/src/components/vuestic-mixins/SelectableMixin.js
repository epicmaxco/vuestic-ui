import { makeContextablePropsMixin } from './../context-test/context-provide/ContextPlugin'

export const SelectableMixin = {
  mixins: [
    makeContextablePropsMixin({
      arrayValue: { type: [String, Object], default: '' },
      label: { type: String, default: '' },
      leftLabel: { type: Boolean, default: false },
      trueValue: { type: Boolean, default: true },
      falseValue: { type: Boolean, default: false },
    }),
  ],
}
