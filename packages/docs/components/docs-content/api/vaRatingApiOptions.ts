import { ManualApiOptions } from '../../../../ui/src/services/api-docs/ManualApiOptions'

export const vaRatingApiOptions: ManualApiOptions = {
  props: {
    value: {
      local: true,
    },
    icon: {
      local: true,
    },
    halfIcon: {
      local: true,
    },
    emptyIcon: {
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
    textColor: {
      local: true,
    },
    unselectedColor: {
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
