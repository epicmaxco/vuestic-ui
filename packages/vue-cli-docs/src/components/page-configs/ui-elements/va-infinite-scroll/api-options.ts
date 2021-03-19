// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    offset: { local: true },
    reverse: { local: true },
    disabled: { local: true },
    scrollTarget: { local: true },
    debounce: { local: true },
    load: { local: true, types: '() => Promise<any>' },
    tag: { local: true },
  },
  slots: {
    loading: { local: true },
    default: { local: true },
  },
} as ManualApiOptions
