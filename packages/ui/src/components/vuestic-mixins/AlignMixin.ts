import { mixins } from 'vue-class-component'
import { makeContextablePropsMixin } from '../context-test/context-provide/ContextPlugin'

export const alignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
}

export class AlignMixin extends mixins(makeContextablePropsMixin({
  align: {
    type: String,
    default: 'left',
    validator: (align: string) => align in alignMap,
  },
})) {
  get alignComputed () {
    return {
      display: 'flex',
      justifyContent: alignMap[this.c_align as keyof typeof alignMap],
    }
  }
}
