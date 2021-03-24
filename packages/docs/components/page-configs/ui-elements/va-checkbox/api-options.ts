import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

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
