import { mixins, Options } from 'vue-class-component'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

export type ValueState = {
  value?: string | boolean | number | any[];
}

const componentProps = {
  modelValue: {
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

@Options({
  emits: ['update:modelValue'],
})
export class StatefulMixin extends mixins(PropsMixin) {
  // emits = ['update:modelValue']
  valueState = {
    modelValue: undefined,
  }

  created () {
    this.hasStatefulMixin = true
  }

  // watch: {
  //   modelValue = () => {
  //     if (this.stateful) {
  //       this.valueState.modelValue = this.modelValue
  //     }
  //   }
  // }

  get valueComputed () {
    if (this.stateful) {
      return this.valueState.modelValue
    }
    return this.modelValue
  }

  set valueComputed (value) {
    if (this.stateful) {
      this.valueState.modelValue = value
    }
    this.$emit('update:modelValue', value)
  }
}
