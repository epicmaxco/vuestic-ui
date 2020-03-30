import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { getProp } from '../../../services/utils'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

export const SelectableListMixin = {
  mixins: [
    FormComponentMixin,
    makeContextablePropsMixin({
      options: { type: Array, default: () => [] },
      textBy: { type: [String, Function], default: 'text' },
      valueBy: { type: [String, Function] },
      trackBy: { type: [String, Function], default: 'value' },
      disabledBy: { type: [String, Function], default: 'disabled' },
    }),
  ],
  methods: {
    getValue (option) {
      const value = typeof option === 'string'
        ? option
        : getProp(option, this.valueBy)
      return value
    },
    getText (option) {
      return typeof option === 'string'
        ? option
        : getProp(option, this.textBy)
    },
    getDisabled (option) {
      return typeof option !== 'string' && getProp(option, this.disabledBy)
    },
    getTrackBy (option) {
      return typeof option === 'string'
        ? option
        : getProp(option, this.trackBy)
    },
  },
  created () {
    this.isSelectableListComponent = true
  },
}
