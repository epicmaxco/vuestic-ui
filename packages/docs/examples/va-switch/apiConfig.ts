import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaSwitchOptions: ManualApiOptions = {
  props: {
    arrayValue: {
      local: true,
    },
    disabled: {
      local: true,
    },
    readonly: {
      local: true,
    },
    success: {
      local: true,
    },
    messages: {
      local: true,
    },
    error: {
      local: true,
    },
    errorMessages: {
      local: true,
    },
    errorCount: {
      local: true,
    },
    max: {
      local: true,
    },
    step: {
      local: true,
    },
    label: {
      local: true,
    },
    invertLabel: {
      local: true,
    },
    pins: {
      local: true,
    },
    iconPrepend: {
      local: true,
    },
    iconAppend: {
      local: true,
    },
    vertical: {
      local: true,
    },
    showTrack: {
      local: true,
    },
  },
  events: {
    dragStart: {
      local: true,
      types: '-',
    },
    dragEnd: {
      local: true,
      types: '-',
    },
    change: {
      local: true,
      types: 'Number | [Number, Number]',
    },
    input: {
      local: true,
      types: 'Number | [Number, Number]',
    },
  },
  slots: {
    append: {
      local: true,
    },
    prepend: {
      local: true,
    },
    label: {
      local: true,
    },
  },
}
