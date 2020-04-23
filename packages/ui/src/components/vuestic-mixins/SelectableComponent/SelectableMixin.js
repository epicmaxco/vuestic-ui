import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
export const SelectableMixin = {
  mixins: [
    makeContextablePropsMixin({
      arrayValue: { type: [String, Object], default: '' },
      label: { type: String, default: '' },
      leftLabel: { type: Boolean, default: false },
      trueValue: { default: true },
      falseValue: { default: false },
    }),
  ],
  computed: {
    onValue: function () {
      this.valueValidator()
      return this.trueValue
    },
    offValue: function () {
      this.valueValidator()
      return this.falseValue
    },
  },
  methods: {
    valueValidator () {
      if (this.falseValue === this.trueValue) {
        throw new Error('Props trueValue and falseValue are the same')
      }
    },
  },
}
