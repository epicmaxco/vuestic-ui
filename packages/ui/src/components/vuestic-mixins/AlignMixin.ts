import { Vue, Component, Prop } from 'vue-property-decorator'

export const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
}

@Component
export class AlignMixin extends Vue {
  @Prop({
    type: String,
    default: 'left',
    validator: (align: string) => align in alignMap,
  }) readonly align!: string

  get alignComputed () {
    return {
      display: 'flex',
      justifyContent: alignMap[this.align as keyof typeof alignMap],
    }
  }
}
