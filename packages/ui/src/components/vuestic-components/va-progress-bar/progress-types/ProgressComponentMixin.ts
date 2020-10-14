import { normalizeValue } from '../../../../services/utils'
import { makeConfigTransportMixin } from '../../../../services/config-transport/makeConfigTransportMixin'
import { Mixins, Component } from 'vue-property-decorator'

const ProgressMixinContextableProps = makeConfigTransportMixin({
  value: { type: Number, default: 0 },
  color: { type: String, default: 'primary' },
  // If 'indeterminate' is 'true' 'value' prop will be ignored.
  indeterminate: { type: Boolean, default: false },
})

@Component
export class ProgressComponentMixin extends Mixins(
  ProgressMixinContextableProps,
) {
  get normalizedValue (): number {
    return normalizeValue(this.c_value)
  }
}
