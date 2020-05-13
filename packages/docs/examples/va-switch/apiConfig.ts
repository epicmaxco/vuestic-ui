import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaSwitchOptions: ManualApiOptions = {
  props: {
    color: {
      local: true,
    },
    arrayValue: {
      local: true,
    },
    readonly: {
      local: true,
    },
    label: {
      local: true,
    },
    trueLabel: {
      local: true,
    },
    falseLabel: {
      local: true,
    },
    trueInnerLabel: {
      local: true,
    },
    falseInnerLabel: {
      local: true,
    },
    loading: {
      local: true,
    },
  },
  events: {
    blur: {
      local: true,
      types: '-',
    },
    focus: {
      local: true,
      types: '-',
    },
    input: {
      local: true,
      types: '-',
    },
  },
  slots: {
    default: {
      local: true,
    },
    innerLabel: {
      local: true,
    },
  },
}
