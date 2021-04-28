import { ManualApiOptions } from './ManualApiOptions'

/**
 * These options will be merged with options for every api component.
 */
export const defaultApiOptions: ManualApiOptions = {
  props: {
    sizesConfig: {
      hidden: true,
    },
    fontSizesConfig: {
      hidden: true,
    },
  },
}
