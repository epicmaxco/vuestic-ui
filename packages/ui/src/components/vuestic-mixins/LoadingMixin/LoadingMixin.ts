import { mixins } from 'vue-class-component'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const componentProps = {
  loading: { type: Boolean, default: false },
}

const PropsMixin = makeContextablePropsMixin(componentProps)

export class LoadingMixin extends mixins(PropsMixin) {
  created () {
    this.isLoadingMixin = true
  }
}
