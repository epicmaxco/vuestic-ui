import { Component, Mixins } from 'vue-property-decorator'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { getProp } from '../../../services/utils'
import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'

const componentProps = {
  options: { type: Array, default: () => [] },
  textBy: { type: [String, Function], default: 'text' },
  valueBy: { type: [String, Function] },
  trackBy: { type: [String, Function], default: 'value' },
  disabledBy: { type: [String, Function], default: 'disabled' },
}

const PropsMixin = makeConfigTransportMixin(componentProps)

@Component
export class SelectableListMixin extends Mixins(
  FormComponentMixin,
  PropsMixin,
) {
  created () {
    this.isSelectableListComponent = true
  }

  getValue (option: any) {
    return typeof option === 'string'
      ? option
      : getProp(option, this.valueBy)
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
