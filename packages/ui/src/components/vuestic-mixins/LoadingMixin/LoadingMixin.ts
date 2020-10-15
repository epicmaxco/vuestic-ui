import { Mixins, Component } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

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
