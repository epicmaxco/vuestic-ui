import { ManualApiOptions } from '../../../../ui/src/services/api-docs/ManualApiOptions'

export const vaPaginationApiOptions: ManualApiOptions = {
  props: {
    value: { local: true },
    'visible-pages': { local: true },
    pages: { local: true },
    'boundary-links': { local: true },
    'boundary-numbers': { local: true },
    'direction-links': { local: true },
    input: { local: true },
    'hide-on-single-page': { local: true },
    flat: { local: true },
    total: { local: true },
    'page-size': { local: true },
    'boundary-icon-left': { local: true },
    'boundary-icon-right': { local: true },
    'direction-icon-left': { local: true },
    'direction-icon-right': { local: true },
  },
  events: {
    input: {
      types: '`(value: number) => void`',
    },
  },
}
