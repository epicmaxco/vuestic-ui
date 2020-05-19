import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    color: {
      local: true,
    },
    range: {
      local: true,
    },
    value: {
      local: true,
    },
    trackLabel: {
      local: true,
    },
    trackColor: {
      local: true,
    },
    labelColor: {
      local: true,
    },
    trackLabelVisible: {
      local: true,
    },
    min: {
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
    readonly: {
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
    disabled: {
      local: true,
    },
  },
  events: {
    dragStart: {
      local: true,
      types: '',
    },
    dragEnd: {
      local: true,
      types: '',
    },
    change: {
      local: true,
      types: '`Number | [Number, Number]`',
    },
    input: {
      local: true,
      types: '`Number | [Number, Number]`',
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
} as ManualApiOptions
