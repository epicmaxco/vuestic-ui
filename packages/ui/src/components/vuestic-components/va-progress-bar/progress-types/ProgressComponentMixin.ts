import { Component, Prop, Vue } from 'vue-property-decorator'
import { normalizeValue } from '../../../../services/utils'

@Component
export class ProgressComponentMixin extends Vue {
  @Prop({ type: Number, default: 0 }) value?: number
  @Prop({ type: String, default: 'primary' }) color?: string
  // If 'indeterminate' is 'true' 'value' prop will be ignored.
  @Prop({ type: Boolean, default: false }) indeterminate?: boolean

  get normalizedValue (): number {
    return normalizeValue(this.value)
  }
}
