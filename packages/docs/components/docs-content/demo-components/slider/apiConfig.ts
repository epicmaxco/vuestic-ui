import { ManualApiOptions } from '../../../../../ui/src/services/api-docs/ManualApiOptions'

export const vaSliderOptions: ManualApiOptions = {
  version: '1.3.0', // Not really, just for test.
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
      version: '1.3.1', // Not really, just for test.
    },
  },
  events: {
    dragStart: {
      local: true,
      types: 'Vue',
    },
    dragEnd: {
      local: true,
      types: 'Vue',
    },
    change: {
      local: true,
      types: 'Number | Number[]',
    },
    input: {
      local: true,
      types: 'Number | Number[]',
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
