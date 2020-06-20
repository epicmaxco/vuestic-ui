import { normalizeValue } from '../../../../services/utils'
import { makeContextablePropsMixin } from '../../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const ProgressMixinContextableProps = makeContextablePropsMixin({
  value: { type: Number, default: 0 },
  color: { type: String, default: 'primary' },
  // If 'indeterminate' is 'true' 'value' prop will be ignored.
  indeterminate: { type: Boolean, default: false },
})

@Component
export class ProgressMixin extends Mixins(
  ProgressMixinContextableProps,
) {
  get normalizedValue () {
    return normalizeValue(this.c_value)
  }
}
