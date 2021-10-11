import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'
import VaTimePickerAPIOptions from '../va-time-picker/api-options'

export default {
  props: {
    ...VaTimePickerAPIOptions.props,

    format: { types: '(date: Date) => string' },
    parse: { types: '(text: string) => Date' },
  },
  events: {
  },
  methods: {
  },
  slots: {
  },
} as ManualApiOptions
