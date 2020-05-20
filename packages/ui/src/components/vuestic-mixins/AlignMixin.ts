import { Vue, Prop, Component } from 'vue-property-decorator'

const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
}

const alignValues = Object.keys(alignMap) as Array<keyof typeof alignMap>

@Component
export class AlignMixin extends Vue {
  @Prop({
    type: String,
    default: 'left',
    validator: (align: string) => align in alignValues,
  }) readonly align!: string

  get alignComputed () {
    return {
      display: 'flex',
      justifyContent: alignMap[this.align as keyof typeof alignMap],
    }
  }
}
