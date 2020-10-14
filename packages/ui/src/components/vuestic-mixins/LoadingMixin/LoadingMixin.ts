import { Mixins, Component } from 'vue-property-decorator'
import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'

const componentProps = {
  loading: { type: Boolean, default: false },
}

const PropsMixin = makeConfigTransportMixin(componentProps)

@Component
export class LoadingMixin extends Mixins(PropsMixin) {
  created () {
    this.isLoadingMixin = true
  }
}
