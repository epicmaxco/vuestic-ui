import { Watch, Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const componentProps = {
  value: {
    type: undefined,
    default: undefined,
  },
  stateful: {
    type: Boolean,
    default: false,
  },
}

const PropsMixin = makeContextablePropsMixin(componentProps)

// TODO Definitions could be done better, but it's too complicated to bother.

@Component
export class StatefulMixin extends Mixins(PropsMixin) {
  valueState = {
    value: undefined,
  }

  created () {
    (this as any).hasStatefulMixin = true
  }

  @Watch('value', { immediate: true })
  onValueChange () {
    if ((this as any).stateful) {
      this.valueState.value = (this as any).value
    }
  }

  get valueComputed () {
    if ((this as any).stateful) {
      return this.valueState.value
    }
    return (this as any).value
  }

  set valueComputed (value) {
    if ((this as any).stateful) {
      this.valueState.value = value
    }
    this.$emit('input', value)
  }
}
