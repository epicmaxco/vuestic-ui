import { ManualApiOptions } from '../../../../ui/src/services/api-docs/ManualApiOptions'

export const vaRatingApiOptions: ManualApiOptions = {
  props: {
    value: {
      local: true,
    },
    icon: {
      local: true,
      default: 'star',
    },
    'half-icon': {
      local: true,
      default: 'star_half',
    },
    'empty-icon': {
      local: true,
      default: 'star_empty',
    },
    readonly: {
      local: true,
      default: false,
    },
    disabled: {
      local: true,
      default: false,
    },
    numbers: {
      local: true,
      default: false,
    },
    halves: {
      local: true,
      default: false,
    },
    max: {
      local: true,
      default: 5,
    },
    clearable: {
      local: true,
      default: false,
    },
    hover: {
      local: true,
      default: false,
    },
    texts: {
      local: true,
      default: [],
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
