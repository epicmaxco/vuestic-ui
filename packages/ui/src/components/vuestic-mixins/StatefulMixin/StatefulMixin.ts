import { Watch, Component, Prop, Vue } from 'vue-property-decorator'

// TODO Definitions could be done better, but it's too complicated to bother.

type ValueState = {
  value?: string | boolean | number | any[];
}

@Component
export class StatefulMixin extends Vue {
  setup () {
    return {
      hasStatefulMixin: true,
    }
  }

  valueState: ValueState = {
    value: undefined,
  }

  @Prop({
    type: undefined,
    default: undefined,
  }) value?: any

  @Prop({
    type: Boolean,
    default: false,
  }) stateful?: boolean

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
    return this.value
  }

  set valueComputed (value) {
    if (this.stateful) {
      this.valueState.value = value
    }
    this.$emit('input', value)
  }
}
