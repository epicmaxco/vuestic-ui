import { Mixins, Component } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../context-test/context-provide/ContextPlugin'

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
export class AlignMixin extends Mixins(makeContextablePropsMixin({
  align: {
    type: String,
    default: 'left',
    validator: (align: string) => align in alignValues,
  },
})) {
  get alignComputed () {
    return {
      display: 'flex',
      // @ts-ignore
      justifyContent: alignMap[this.align as keyof typeof alignMap],
    }
  }
}
