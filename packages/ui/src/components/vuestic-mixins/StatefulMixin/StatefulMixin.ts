import { mixins, Options, prop, Vue } from 'vue-class-component'

export type ValueState = {
  modelValue?: any;
}

class Props {
  modelValue: any = prop<undefined>({
    type: undefined,
    default: undefined,
  })

  stateful = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const PropsMixin = Vue.with(Props)

// TODO Definitions could be done better, but it's too complicated to bother.

@Options({
  emits: ['update:modelValue'],
})
export class StatefulMixin extends mixins(PropsMixin) {
  valueState: ValueState = {
    modelValue: this.$props.modelValue,
  }

  hasStatefulMixin!: boolean

  created () {
    this.hasStatefulMixin = true
  }

  get valueComputed () {
    if (this.$props.stateful) {
      return this.valueState.modelValue
    }
    return this.$props.modelValue
  }

  set valueComputed (value) {
    if (this.$props.stateful) {
      this.valueState.modelValue = value
    }
    this.$emit('update:modelValue', value)
  }
}
