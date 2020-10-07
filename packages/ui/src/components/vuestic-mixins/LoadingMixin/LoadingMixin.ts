import { Mixins, Component } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../../services/context/makeContextablePropsMixin'

const componentProps = {
  loading: { type: Boolean, default: false },
}

const PropsMixin = makeContextablePropsMixin(componentProps)

@Component
export class LoadingMixin extends Mixins(PropsMixin) {
  created () {
    this.isLoadingMixin = true
  }
}
