import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { getProp } from '../../../services/utils'

export const SelectableListMixin = {
  mixins: [FormComponentMixin],
  props: {
    options: { type: Array, default: () => [] },
    textBy: { type: [String, Function], default: 'text' },
    valueBy: { type: [String, Function], default: 'value' },
    trackBy: { type: [String, Function], default: 'value' },
    disabledBy: { type: [String, Function], default: 'disabled' },
    outputObject: { type: Boolean, default: false },
  },
  methods: {
    getValue (option) {
      return getProp(option, this.valueBy)
    },
    getText (option) {
      return getProp(option, this.textBy)
    },
    getDisabled (option) {
      return getProp(option, this.disabledBy)
    },
    getTrackBy (option) {
      return getProp(option, this.trackBy)
    },
  },
  created () {
    this.isSelectableListComponent = true
  },
}
