import { ComponentConfig } from '../../component-config/component-config'

export const getComponentsDefaultConfig = (): ComponentConfig => {
  // TODO: Should be handled in size service
  return {
    VaIcon: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 16,
          medium: 24,
          large: 32,
        },
      },
    },
    VaRating: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 16,
          medium: 24,
          large: 32,
        },
      },
    },
  }
}
