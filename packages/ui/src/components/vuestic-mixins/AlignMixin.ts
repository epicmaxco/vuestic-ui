import { prop, Vue } from 'vue-class-component'

export const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
}

class AlignMixinProps {
  align = prop<string>({
    type: String,
    default: 'left',
    validator: (align: string) => align in alignMap,
  })
}

export class AlignMixin extends Vue.with(AlignMixinProps) {
  get alignComputed () {
    return {
      display: 'flex',
      justifyContent: alignMap[this.align as keyof typeof alignMap],
    }
  }
}
