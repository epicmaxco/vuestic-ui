// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: { local: true },
    disabledBy: { local: true },
    trackBy: { local: true },
    valueBy: { local: true },
    textBy: { local: true },
    options: { local: true },
    type: { local: true },
    defaultValue: { local: true },
    leftLabel: { local: true },
  },
  events: {
    input: { local: true, types: '`(value: String | Object) => void`' },
  },
  methods: {
  },
  slots: {
    default: { local: true },
  },
} as ManualApiOptions
