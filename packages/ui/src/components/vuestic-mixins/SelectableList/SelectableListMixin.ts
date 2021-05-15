import { mixins, prop, Vue } from 'vue-class-component'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { getProp } from '../../../services/utils'

type StringOrFunction = string | Function

class SelectableListProps {
  options = prop<any[]>({ type: Array, default: () => [] })
  textBy = prop<StringOrFunction>({ type: [String, Function], default: 'text' })
  valueBy = prop<StringOrFunction>({ type: [String, Function] })
  trackBy = prop<StringOrFunction>({ type: [String, Function], default: 'value' })
  disabledBy = prop<StringOrFunction>({ type: [String, Function], default: 'disabled' })
}

const SelectableListPropsMixin = Vue.with(SelectableListProps)

export class SelectableListMixin extends mixins(
  FormComponentMixin,
  SelectableListPropsMixin,
) {
  isSelectableListComponent!: boolean

  created () {
    this.isSelectableListComponent = true
  }

  getValue (option: any) {
    return typeof option === 'string'
      ? option
      // @ts-ignore
      : getProp(option, this.valueBy)
  }

  getText (option: any) {
    return typeof option === 'string'
      ? option
      // @ts-ignore
      : getProp(option, this.textBy)
  }

  getDisabled (option: any) {
    // @ts-ignore
    return typeof option !== 'string' && getProp(option, this.disabledBy)
  }

  getTrackBy (option: any) {
    return typeof option === 'string'
      ? option
      // @ts-ignore
      : getProp(option, this.trackBy)
  }
}
