import { Mixins, Component } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

@Component
export class LoadingMixin extends Mixins(makeContextablePropsMixin({
  loading: {
    type: Boolean,
    default: false,
  },
})) {
  created () {
    this.isLoadingMixin = true
  }
}
