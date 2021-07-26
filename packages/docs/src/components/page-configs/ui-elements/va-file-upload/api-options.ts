// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

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
