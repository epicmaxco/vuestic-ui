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

  valueExpand = {
    value: undefined,
  }

  created () {
    this.hasStatefulMixin = true
  }

  @Watch('value', { immediate: true })
  onValueChange () {
    if (this.stateful) {
      this.valueState.value = this.value
    }
  }

  get valueComputed () {
    if (this.stateful) {
      return this.valueState.value
    }
    if (this.$parent?.$options?.name === 'VaExpandGroup') {
      return this.valueExpand.value
    }
    return this.value
  }

  set valueComputed (value) {
    if (this.stateful) {
      this.valueState.value = value
    }
    if (this.$parent?.$options?.name === 'VaExpandGroup') {
      this.valueExpand.value = value
    }
    this.$emit('input', value)
  }
}
