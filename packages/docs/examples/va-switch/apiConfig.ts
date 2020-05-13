import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export const vaSwitchOptions: ManualApiOptions = {
  props: {
    value: {
      local: true,
    },
    size: {
      local: true,
    },
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
    trueValue: {
      local: true,
    },
    falseValue: {
      local: true,
    },
    leftLabel: {
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
