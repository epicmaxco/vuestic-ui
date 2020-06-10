import { makeContextablePropsMixin } from '../../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
import { normalizeValue } from '../../../../services/utils'

@Component({
  mixins: [
    makeContextablePropsMixin({
      color: {
        type: String,
      },
    }),
  ] as any,
})
export class ProgressMixin extends Mixins(makeContextablePropsMixin({
  value: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: 'primary',
  },
  // If 'indeterminate' is 'true' 'value' prop will be ignored.
  indeterminate: {
    type: Boolean,
    default: false,
  },
})) {
  get normalizedValue () {
    return normalizeValue(this.c_value)
  }
}
