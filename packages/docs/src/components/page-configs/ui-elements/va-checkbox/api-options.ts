// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

const options: ManualApiOptions = {
  props: {
    value: {
      local: true,
    },
    indeterminate: {
      local: true,
    },
    checkedIcon: {
      local: true,
    },
    indeterminateIcon: {
      local: true,
    },
  },
  events: {
    input: {
      types: '(event: Event) => void',
      local: true,
    },
  },
}
export default options
