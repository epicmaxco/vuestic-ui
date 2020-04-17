import { Watch } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const PropsMixin = makeContextablePropsMixin(
  {
    value: {
      type: undefined,
      default: undefined,
    },
    stateful: {
      type: Boolean,
      default: false,
    },
  },
)

// TODO Definitions could be done better, but it's too complicated to bother.

@Component
export class StatefulMixin extends mixins(PropsMixin as any) {
  // @Prop() value: any
  // @Prop({ default: false }) stateful!: Boolean

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
