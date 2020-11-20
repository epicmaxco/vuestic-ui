import { Component, Mixins, Prop } from 'vue-property-decorator'
import { FormComponentMixin } from '../FormComponent/FormComponentMixin'
import { getProp } from '../../../services/utils'

type Function = (...args: any[]) => any

@Component
export class SelectableListMixin extends Mixins(
  FormComponentMixin,
) {
  @Prop({ type: Array, default: () => [] }) options!: any[]
  @Prop({ type: [String, Function], default: 'text' }) textBy!: string | Function
  @Prop({ type: [String, Function] }) valueBy!: string | Function
  @Prop({ type: [String, Function], default: 'value' }) trackBy!: string | Function
  @Prop({ type: [String, Function], default: 'disabled' }) disabledBy!: string | Function

  setup (): any {
    return {
      isSelectableListComponent: true,
    }
  }

  created () {
    (this as any).isSelectableListComponent = true
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
