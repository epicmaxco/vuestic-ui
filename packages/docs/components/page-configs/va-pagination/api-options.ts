import { ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

export default {
  props: {
    value: { local: true },
    visiblePages: { local: true },
    pages: { local: true },
    boundaryLinks: { local: true },
    boundaryNumbers: { local: true },
    directionLinks: { local: true },
    input: { local: true },
    hideOnSinglePage: { local: true },
    flat: { local: true },
    total: { local: true },
    pageSize: { local: true },
    boundaryIconLeft: { local: true },
    boundaryIconRight: { local: true },
    directionIconLeft: { local: true },
    directionIconRight: { local: true },
    size: { local: true },
  },
  events: {
    input: {
      types: '`(value: number) => void`',
    },
  },
} as ManualApiOptions
