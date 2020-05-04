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
  methods: {
    validate: {
      types: '`() => boolean`',
    },
    focus: {
      types: '`() => void`',
    },
    focusInvalid: {
      types: '`() => void`',
    },
    resetValidation: {
      types: '`() => boolean`',
    },
    reset: {
      types: '`() => boolean`',
    },
  },
  events: {
    validation: {
      types: '`(valid: boolean) => void`',
    },
  },
}
