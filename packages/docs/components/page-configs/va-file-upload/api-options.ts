import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: { local: true },
    type: { local: true },
    fileTypes: { local: true },
    dropzone: { local: true },
  },
  events: {
    input: {
      types: '`(value: number) => void`',
    },
  },
} as ManualApiOptions
