import { normalizeValue } from '../../../../services/utils'
import { makeContextablePropsMixin } from '../../../context-test/context-provide/ContextPlugin'

const ProgressMixinContextableProps = makeContextablePropsMixin({
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
})

export const progressMixin = {
  mixins: [ProgressMixinContextableProps],
  computed: {
    normalizedValue () {
      return normalizeValue(this.c_value)
    },
  },
}
