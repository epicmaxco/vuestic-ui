import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
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
      types: 'FocusEvent',
    },
    focus: {
      types: 'FocusEvent',
    },
    input: {
      types: 'any',
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
} as ManualApiOptions
