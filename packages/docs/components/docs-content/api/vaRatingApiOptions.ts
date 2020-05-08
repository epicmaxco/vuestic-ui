import { ManualApiOptions } from '../../../../ui/src/services/api-docs/ManualApiOptions'

export const vaRatingApiOptions: ManualApiOptions = {
  props: {
    value: {
      local: true,
    },
    icon: {
      local: true,
    },
    'half-icon': {
      local: true,
    },
    'empty-icon': {
      local: true,
    },
    readonly: {
      local: true,
    },
    disabled: {
      local: true,
    },
    numbers: {
      local: true,
    },
    halves: {
      local: true,
    },
    max: {
      local: true,
    },
    clearable: {
      local: true,
    },
    hover: {
      local: true,
    },
    texts: {
      local: true,
    },
    'text-color': {
      local: true,
    },
    'unselected-color': {
      local: true,
    },
  },
  events: {
    input: {
      types: '`(value: number) => void`',
      local: true,
    },
  },
}
