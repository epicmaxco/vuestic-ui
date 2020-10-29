import { mixins } from 'vue-class-component'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { getProp } from '../../../services/utils'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const componentProps = {
  options: { type: Array, default: () => [] },
  textBy: { type: [String, Function], default: 'text' },
  valueBy: { type: [String, Function] },
  trackBy: { type: [String, Function], default: 'value' },
  disabledBy: { type: [String, Function], default: 'disabled' },
}

const PropsMixin = makeContextablePropsMixin(componentProps)

export class SelectableListMixin extends mixins(
  FormComponentMixin,
  PropsMixin,
) {
  created () {
    this.isSelectableListComponent = true
  }

  getValue (option: any) {
    const value = typeof option === 'string'
      ? option
      : getProp(option, this.valueBy)
    return value
  }

  getText (option: any) {
    return typeof option === 'string'
      ? option
      : getProp(option, this.textBy)
  }

  getDisabled (option: any) {
    return typeof option !== 'string' && getProp(option, this.disabledBy)
  }

  getTrackBy (option: any) {
    return typeof option === 'string'
      ? option
      : getProp(option, this.trackBy)
  }
}
